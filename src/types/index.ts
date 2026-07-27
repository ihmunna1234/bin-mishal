import { Database, AppRole, ServiceCategory, InquiryStatus } from './database';

// Re-export core Database type and Enums
export type { Database, AppRole, ServiceCategory, InquiryStatus };

// Entity Row Types
export type Branch = Database['public']['Tables']['branches']['Row'];
export type BranchInsert = Database['public']['Tables']['branches']['Insert'];
export type BranchUpdate = Database['public']['Tables']['branches']['Update'];

export type UserProfile = Database['public']['Tables']['users']['Row'];
export type UserProfileInsert = Database['public']['Tables']['users']['Insert'];
export type UserProfileUpdate = Database['public']['Tables']['users']['Update'];

export type Inquiry = Database['public']['Tables']['inquiries']['Row'];
export type InquiryInsert = Database['public']['Tables']['inquiries']['Insert'];
export type InquiryUpdate = Database['public']['Tables']['inquiries']['Update'];

export type KnowledgeBaseArticle = Database['public']['Tables']['knowledge_base']['Row'];
export type KnowledgeBaseArticleInsert = Database['public']['Tables']['knowledge_base']['Insert'];
export type KnowledgeBaseArticleUpdate = Database['public']['Tables']['knowledge_base']['Update'];

// Extended / Hydrated Models with Foreign Key Relations
export interface InquiryWithRelations extends Inquiry {
  preferred_branch?: Branch | null;
  assigned_agent?: UserProfile | null;
}

export interface UserProfileWithBranch extends UserProfile {
  branch?: Branch | null;
}

// User Session Context for RBAC Middleware & Security Layer
export interface AuthUserContext {
  id: string;
  email: string;
  role: AppRole;
  branch_id: string | null;
  full_name: string;
  avatar_url?: string | null;
}

// API Response Wrappers
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// Inquiry Filter Parameters for RBAC-scoped queries
export interface InquiryFilterParams {
  search?: string;
  status?: InquiryStatus;
  category?: ServiceCategory;
  branchId?: string;
  agentId?: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}
