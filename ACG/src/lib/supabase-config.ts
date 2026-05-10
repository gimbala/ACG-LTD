export function isSupabaseConfigured(): boolean {
  const url = import.meta.env.VITE_SUPABASE_URL;
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
  return Boolean(
    url &&
      key &&
      !String(url).includes('YOUR_PROJECT') &&
      String(url).startsWith('http')
  );
}
