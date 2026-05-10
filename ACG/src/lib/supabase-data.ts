import type {
  Client,
  Package,
  PackageDocument,
  PackageService,
  PortalDocumentRow,
  PortalMilestone,
  ProfileRow,
} from '@/types/acg';
import { getSupabase } from './supabase';

function parseJsonArray<T>(raw: unknown, fallback: T[]): T[] {
  if (Array.isArray(raw)) return raw as T[];
  return fallback;
}

export async function fetchProfile(userId: string): Promise<ProfileRow | null> {
  const sb = getSupabase();
  if (!sb) return null;
  const { data, error } = await sb
    .from('profiles')
    .select('id,email,full_name,role,phone')
    .eq('id', userId)
    .maybeSingle();
  if (error || !data) return null;
  return data as ProfileRow;
}

export async function fetchPackagesForAdmin(): Promise<Package[]> {
  const sb = getSupabase();
  if (!sb) return [];
  const { data, error } = await sb
    .from('service_packages')
    .select('id,name,description,price_usd,services,documents')
    .order('created_at', { ascending: true });
  if (error || !data) return [];
  return data.map(rowToPackage);
}

export async function fetchClientsForAdmin(): Promise<Client[]> {
  const sb = getSupabase();
  if (!sb) return [];
  const { data, error } = await sb
    .from('client_cases')
    .select(
      'id,user_id,package_id,name,email,phone,current_location,destination,status,start_date,progress'
    )
    .order('created_at', { ascending: false });
  if (error || !data) return [];
  return data.map(rowToClient);
}

export function rowToPackage(row: {
  id: string;
  name: string;
  description: string | null;
  price_usd: number;
  services: unknown;
  documents: unknown;
}): Package {
  return {
    id: row.id,
    name: row.name,
    description: row.description ?? '',
    price: Number(row.price_usd),
    services: parseJsonArray<PackageService>(row.services, []),
    documents: parseJsonArray<PackageDocument>(row.documents, []),
  };
}

export function rowToClient(row: {
  id: string;
  package_id: string | null;
  name: string;
  email: string;
  phone: string | null;
  current_location: string | null;
  destination: string | null;
  status: string;
  start_date: string | null;
  progress: number | null;
}): Client {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    phone: row.phone ?? '',
    currentLocation: row.current_location ?? '',
    destination: row.destination ?? '',
    packageId: row.package_id ?? '',
    status: row.status as Client['status'],
    startDate: row.start_date ?? '',
    progress: row.progress ?? 0,
  };
}

export function packageToRow(pkg: Package): {
  id: string;
  name: string;
  description: string;
  price_usd: number;
  services: unknown;
  documents: unknown;
} {
  return {
    id: pkg.id,
    name: pkg.name,
    description: pkg.description,
    price_usd: pkg.price,
    services: pkg.services,
    documents: pkg.documents,
  };
}

export function clientToRow(
  c: Client,
  opts: { user_id?: string | null } = {}
): {
  id: string;
  user_id: string | null;
  package_id: string | null;
  name: string;
  email: string;
  phone: string | null;
  current_location: string | null;
  destination: string | null;
  status: Client['status'];
  start_date: string | null;
  progress: number;
} {
  return {
    id: c.id,
    user_id: opts.user_id ?? null,
    package_id: c.packageId || null,
    name: c.name,
    email: c.email,
    phone: c.phone || null,
    current_location: c.currentLocation || null,
    destination: c.destination || null,
    status: c.status,
    start_date: c.startDate || null,
    progress: c.progress,
  };
}

export async function upsertPackage(pkg: Package): Promise<{ error: Error | null }> {
  const sb = getSupabase();
  if (!sb) return { error: new Error('Supabase not configured') };
  const row = packageToRow(pkg);
  const { error } = await sb.from('service_packages').upsert(
    {
      ...row,
      updated_at: new Date().toISOString(),
    },
    { onConflict: 'id' }
  );
  return { error: error ? new Error(error.message) : null };
}

export async function deletePackage(id: string): Promise<{ error: Error | null }> {
  const sb = getSupabase();
  if (!sb) return { error: new Error('Supabase not configured') };
  const { error } = await sb.from('service_packages').delete().eq('id', id);
  return { error: error ? new Error(error.message) : null };
}

export async function upsertClient(
  c: Client,
  extras?: {
    user_id?: string | null;
    milestones?: PortalMilestone[];
    documents?: PortalDocumentRow[];
  }
): Promise<{ error: Error | null }> {
  const sb = getSupabase();
  if (!sb) return { error: new Error('Supabase not configured') };
  const base = clientToRow(c, { user_id: extras?.user_id });
  const payload: Record<string, unknown> = {
    ...base,
    updated_at: new Date().toISOString(),
  };
  if (extras?.milestones) payload.milestones = extras.milestones;
  if (extras?.documents) payload.documents = extras.documents;
  const { error } = await sb.from('client_cases').upsert(payload, { onConflict: 'id' });
  return { error: error ? new Error(error.message) : null };
}

export async function deleteClientCase(id: string): Promise<{ error: Error | null }> {
  const sb = getSupabase();
  if (!sb) return { error: new Error('Supabase not configured') };
  const { error } = await sb.from('client_cases').delete().eq('id', id);
  return { error: error ? new Error(error.message) : null };
}

export async function loadPortalCase(userId: string): Promise<{
  clientData: {
    name: string;
    email: string;
    phone: string;
    currentLocation: string;
    destination: string;
    service: string;
    startDate: string;
    caseManager: string;
  };
  milestones: PortalMilestone[];
  documents: PortalDocumentRow[];
  caseId: string;
  packageId: string;
} | null> {
  const sb = getSupabase();
  if (!sb) return null;
  const { data: row, error } = await sb
    .from('client_cases')
    .select(
      'id,package_id,name,email,phone,current_location,destination,start_date,case_manager,milestones,documents'
    )
    .eq('user_id', userId)
    .maybeSingle();

  if (error || !row) return null;

  let pkgName = '';
  if (row.package_id) {
    const { data: pkg } = await sb
      .from('service_packages')
      .select('name')
      .eq('id', row.package_id)
      .maybeSingle();
    pkgName = pkg?.name ?? '';
  }

  const milestones = parseJsonArray<PortalMilestone>(row.milestones, []);
  const documents = parseJsonArray<PortalDocumentRow>(row.documents, []);

  return {
    caseId: row.id,
    packageId: row.package_id ?? '',
    clientData: {
      name: row.name,
      email: row.email,
      phone: row.phone ?? '',
      currentLocation: row.current_location ?? '',
      destination: row.destination ?? '',
      service: pkgName || 'Assigned package',
      startDate: row.start_date ?? '',
      caseManager: row.case_manager ?? 'ACG Team',
    },
    milestones,
    documents,
  };
}

/** Persists progress % and package checklist updates from the admin Progress modal. */
export async function persistAdminProgressUpdate(
  clientRow: Client,
  pkg: Package
): Promise<{ error: Error | null }> {
  const sb = getSupabase();
  if (!sb) return { error: new Error('Supabase not configured') };
  const { error: e1 } = await sb
    .from('client_cases')
    .update({
      progress: clientRow.progress,
      updated_at: new Date().toISOString(),
    })
    .eq('id', clientRow.id);
  if (e1) return { error: new Error(e1.message) };

  const { error: e2 } = await sb
    .from('service_packages')
    .update({
      services: pkg.services,
      documents: pkg.documents,
      updated_at: new Date().toISOString(),
    })
    .eq('id', pkg.id);
  return { error: e2 ? new Error(e2.message) : null };
}
