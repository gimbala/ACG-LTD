/**
 * Sends the submitter a copy of their consultation request via Resend.
 *
 * Deploy: supabase functions deploy send-booking-confirmation --no-verify-jwt
 * (Use --no-verify-jwt only if anonymous invoke fails; default JWT works with anon key.)
 *
 * Secrets (Dashboard → Edge Functions → Secrets):
 *   RESEND_API_KEY      — from https://resend.com/api-keys
 *   RESEND_FROM_EMAIL   — e.g. "ACG Bookings <bookings@yourdomain.com>" (verified domain)
 *
 * SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are provided automatically in hosted functions.
 */

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.2";

const corsHeaders: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

function esc(s: string | null | undefined): string {
  if (s == null || s === "") return "";
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function rowField(label: string, value: string): string {
  return `<tr><td style="padding:8px 16px 8px 0;font-weight:600;color:#1e1b4b;vertical-align:top">${esc(label)}</td><td style="padding:8px 0;color:#334155">${value}</td></tr>`;
}

function buildHtml(row: {
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  current_location: string;
  destination_country: string;
  timeline: string;
  relocation_type: string;
  message: string | null;
  created_at?: string;
}): string {
  const name = `${row.first_name} ${row.last_name}`.trim();
  return `<!DOCTYPE html>
<html>
<body style="font-family:system-ui,sans-serif;line-height:1.6;color:#1e1b4b;max-width:560px;margin:0 auto;padding:24px">
  <h1 style="font-size:22px;margin-bottom:8px">Thank you for contacting ACG</h1>
  <p style="color:#475569;margin-top:0">Below is a copy of your consultation request for your records.</p>
  <table style="border-collapse:collapse;width:100%;margin-top:16px;background:#f8fafc;border-radius:8px;padding:16px">
    ${rowField("Name", esc(name))}
    ${rowField("Email", esc(row.email))}
    ${rowField("Phone", esc(row.phone ?? "—"))}
    ${rowField("Current location", esc(row.current_location))}
    ${rowField("Destination country", esc(row.destination_country))}
    ${rowField("Timeline", esc(row.timeline))}
    ${rowField("Relocation type", esc(row.relocation_type))}
    ${rowField("Message", esc(row.message ?? "—"))}
  </table>
  <p style="margin-top:24px;color:#64748b;font-size:14px">Our team will reach out within <strong>24 hours</strong> to schedule your free consultation.</p>
  <p style="color:#94a3b8;font-size:12px;margin-top:32px">ACG · Ghana</p>
</body>
</html>`;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const body = (await req.json()) as { consultation_id?: string };
    const consultationId = body.consultation_id;

    if (
      !consultationId ||
      typeof consultationId !== "string" ||
      consultationId.length < 10
    ) {
      return new Response(
        JSON.stringify({ error: "consultation_id required" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const url = Deno.env.get("SUPABASE_URL") ?? "";
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
    if (!url || !serviceKey) {
      console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
      return new Response(JSON.stringify({ error: "Server misconfigured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(url, serviceKey);
    const { data: row, error: fetchError } = await supabase
      .from("consultation_requests")
      .select("*")
      .eq("id", consultationId)
      .maybeSingle();

    if (fetchError || !row) {
      return new Response(JSON.stringify({ error: "Request not found" }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const resendKey = Deno.env.get("RESEND_API_KEY");
    const from =
      Deno.env.get("RESEND_FROM_EMAIL") ??
      "ACG Bookings <onboarding@resend.dev>";

    if (!resendKey) {
      console.error("RESEND_API_KEY not set");
      return new Response(JSON.stringify({ error: "Email not configured" }), {
        status: 503,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const html = buildHtml(row as Parameters<typeof buildHtml>[0]);

    const resendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [row.email],
        subject: "Copy of your ACG consultation request",
        html,
      }),
    });

    if (!resendRes.ok) {
      const errText = await resendRes.text();
      console.error("Resend error:", resendRes.status, errText);
      return new Response(JSON.stringify({ error: "Failed to send email" }), {
        status: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ ok: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ error: "Unexpected error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
