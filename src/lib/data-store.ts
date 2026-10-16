import { BusinessService, Article, PartnerInquiry, SiteContent } from '@/types';
import { initialServices, initialArticles, initialInquiries, initialSiteContents } from './mock-data';

// Server-side or client memory state cache
let servicesCache: BusinessService[] = [...initialServices];
let articlesCache: Article[] = [...initialArticles];
let inquiriesCache: PartnerInquiry[] = [...initialInquiries];
let siteContentsCache: Record<string, SiteContent> = { ...initialSiteContents };

export async function getServices(): Promise<BusinessService[]> {
  return servicesCache;
}

export async function getServiceBySlug(slug: string): Promise<BusinessService | undefined> {
  return servicesCache.find((s) => s.slug === slug);
}

export async function createService(data: Omit<BusinessService, 'id' | 'created_at' | 'updated_at'>): Promise<BusinessService> {
  const newService: BusinessService = {
    ...data,
    id: `srv-${Date.now()}`,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  servicesCache.unshift(newService);
  return newService;
}

export async function updateService(id: string, data: Partial<BusinessService>): Promise<BusinessService | null> {
  const index = servicesCache.findIndex((s) => s.id === id);
  if (index === -1) return null;
  servicesCache[index] = {
    ...servicesCache[index],
    ...data,
    updated_at: new Date().toISOString(),
  };
  return servicesCache[index];
}

export async function deleteService(id: string): Promise<boolean> {
  const initialLength = servicesCache.length;
  servicesCache = servicesCache.filter((s) => s.id !== id);
  return servicesCache.length < initialLength;
}

// Articles
export async function getArticles(): Promise<Article[]> {
  return articlesCache;
}

export async function getArticleBySlug(slug: string): Promise<Article | undefined> {
  return articlesCache.find((a) => a.slug === slug);
}

export async function createArticle(data: Omit<Article, 'id' | 'created_at'>): Promise<Article> {
  const newArticle: Article = {
    ...data,
    id: `art-${Date.now()}`,
    created_at: new Date().toISOString(),
  };
  articlesCache.unshift(newArticle);
  return newArticle;
}

export async function updateArticle(id: string, data: Partial<Article>): Promise<Article | null> {
  const index = articlesCache.findIndex((a) => a.id === id);
  if (index === -1) return null;
  articlesCache[index] = {
    ...articlesCache[index],
    ...data,
  };
  return articlesCache[index];
}

export async function deleteArticle(id: string): Promise<boolean> {
  const initialLength = articlesCache.length;
  articlesCache = articlesCache.filter((a) => a.id !== id);
  return articlesCache.length < initialLength;
}

// Inquiries
export async function getInquiries(): Promise<PartnerInquiry[]> {
  return inquiriesCache;
}

export async function createInquiry(data: Omit<PartnerInquiry, 'id' | 'status' | 'created_at' | 'updated_at'>): Promise<PartnerInquiry> {
  const newInquiry: PartnerInquiry = {
    ...data,
    id: `inq-${Date.now()}`,
    status: 'unread',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  inquiriesCache.unshift(newInquiry);
  return newInquiry;
}

export async function updateInquiryStatus(id: string, status: PartnerInquiry['status'], admin_notes?: string): Promise<PartnerInquiry | null> {
  const index = inquiriesCache.findIndex((i) => i.id === id);
  if (index === -1) return null;
  inquiriesCache[index] = {
    ...inquiriesCache[index],
    status,
    ...(admin_notes !== undefined ? { admin_notes } : {}),
    updated_at: new Date().toISOString(),
  };
  return inquiriesCache[index];
}

// Site Contents CMS
export async function getSiteContent(key: string): Promise<SiteContent | null> {
  return siteContentsCache[key] || null;
}

export async function updateSiteContent(key: string, data: Partial<SiteContent>): Promise<SiteContent> {
  if (!siteContentsCache[key]) {
    siteContentsCache[key] = {
      id: `sc-${Date.now()}`,
      section_key: key,
      title: data.title || '',
      subtitle: data.subtitle,
      content_body: data.content_body || '',
      metadata: data.metadata || {},
      updated_at: new Date().toISOString(),
    };
  } else {
    siteContentsCache[key] = {
      ...siteContentsCache[key],
      ...data,
      updated_at: new Date().toISOString(),
    };
  }
  return siteContentsCache[key];
}
