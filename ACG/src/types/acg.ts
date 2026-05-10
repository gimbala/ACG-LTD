/** Shared shapes for dashboard, portal, and Supabase JSON columns */

export type ClientStatus = 'active' | 'pending' | 'completed';

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  currentLocation: string;
  destination: string;
  packageId: string;
  status: ClientStatus;
  startDate: string;
  progress: number;
}

export type PackageServiceStatus = 'pending' | 'in-progress' | 'completed';

export interface PackageService {
  id: string;
  name: string;
  status: PackageServiceStatus;
  description: string;
}

export type PackageDocumentStatus = 'pending' | 'submitted' | 'approved' | 'rejected';

export interface PackageDocument {
  id: string;
  name: string;
  required: boolean;
  status: PackageDocumentStatus;
}

export interface Package {
  id: string;
  name: string;
  description: string;
  price: number;
  services: PackageService[];
  documents: PackageDocument[];
}

export interface PortalMilestone {
  id: number;
  title: string;
  status: string;
  date: string;
  description: string;
}

export interface PortalDocumentRow {
  id: number;
  name: string;
  uploadedBy: string;
  date: string;
  status: string;
}

export interface ProfileRow {
  id: string;
  email: string | null;
  full_name: string | null;
  role: 'client' | 'admin';
  phone: string | null;
}
