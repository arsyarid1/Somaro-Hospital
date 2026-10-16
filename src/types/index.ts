export type AdminRole = 'super_admin' | 'editor';

export type InquiryStatus = 'unread' | 'contacted' | 'resolved';

export type ServiceCategory = 'hospital' | 'maklon_farmasi' | 'alat_kesehatan';

export interface AdminUser {
  id: string;
  email: string;
  full_name: string;
  role: AdminRole;
  is_active: boolean;
  created_at: string;
}

export interface SiteContent {
  id: string;
  section_key: string;
  title: string;
  subtitle?: string;
  content_body: string;
  metadata?: Record<string, any>;
  updated_at: string;
}

export interface BusinessService {
  id: string;
  category: ServiceCategory;
  title: string;
  slug: string;
  summary: string;
  description: string;
  image_url: string;
  specifications: Record<string, string>;
  standards: string[];
  is_featured: boolean;
  order_index: number;
  created_at: string;
  updated_at: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string;
  thumbnail_url: string;
  author_name: string;
  is_published: boolean;
  published_at: string;
  created_at: string;
}

export interface PartnerInquiry {
  id: string;
  full_name: string;
  company_name: string;
  email: string;
  phone: string;
  service_interest: string;
  message: string;
  status: InquiryStatus;
  admin_notes?: string;
  created_at: string;
  updated_at: string;
}
