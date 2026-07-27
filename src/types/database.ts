export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type AppRole = 'super_admin' | 'branch_manager' | 'agent';

export type ServiceCategory =
  | 'Umrah'
  | 'Flight Ticketing'
  | 'Passport Malumat'
  | 'Ziyarah Visa'
  | 'MISA Investor License'
  | 'Qiwa/Amel Issues'
  | 'Cargo';

export type InquiryStatus =
  | 'New'
  | 'Processing'
  | 'Action Required'
  | 'Completed'
  | 'Cancelled';

export interface Database {
  public: {
    Tables: {
      branches: {
        Row: {
          id: string;
          name: string;
          city: string;
          phone: string | null;
          whatsapp_number: string | null;
          google_maps_url: string | null;
          status: 'active' | 'inactive';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          city: string;
          phone?: string | null;
          whatsapp_number?: string | null;
          google_maps_url?: string | null;
          status?: 'active' | 'inactive';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          city?: string;
          phone?: string | null;
          whatsapp_number?: string | null;
          google_maps_url?: string | null;
          status?: 'active' | 'inactive';
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      users: {
        Row: {
          id: string;
          full_name: string;
          email: string;
          phone: string | null;
          role: AppRole;
          branch_id: string | null;
          avatar_url: string | null;
          active_status: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          full_name: string;
          email: string;
          phone?: string | null;
          role?: AppRole;
          branch_id?: string | null;
          avatar_url?: string | null;
          active_status?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string;
          email?: string;
          phone?: string | null;
          role?: AppRole;
          branch_id?: string | null;
          avatar_url?: string | null;
          active_status?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "users_branch_id_fkey";
            columns: ["branch_id"];
            isOneToOne: false;
            referencedRelation: "branches";
            referencedColumns: ["id"];
          }
        ];
      };
      inquiries: {
        Row: {
          id: string;
          tracking_code: string;
          client_name: string;
          client_phone: string;
          service_category: ServiceCategory;
          status: InquiryStatus;
          preferred_branch_id: string | null;
          assigned_agent_id: string | null;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          tracking_code?: string;
          client_name: string;
          client_phone: string;
          service_category: ServiceCategory;
          status?: InquiryStatus;
          preferred_branch_id?: string | null;
          assigned_agent_id?: string | null;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          tracking_code?: string;
          client_name?: string;
          client_phone?: string;
          service_category?: ServiceCategory;
          status?: InquiryStatus;
          preferred_branch_id?: string | null;
          assigned_agent_id?: string | null;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "inquiries_preferred_branch_id_fkey";
            columns: ["preferred_branch_id"];
            isOneToOne: false;
            referencedRelation: "branches";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "inquiries_assigned_agent_id_fkey";
            columns: ["assigned_agent_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      knowledge_base: {
        Row: {
          id: string;
          category: string;
          title: string;
          content: string;
          tags: string[] | null;
          embedding: number[] | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          category: string;
          title: string;
          content: string;
          tags?: string[] | null;
          embedding?: number[] | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          category?: string;
          title?: string;
          content?: string;
          tags?: string[] | null;
          embedding?: number[] | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      get_auth_user_role: {
        Args: Record<PropertyKey, never>;
        Returns: AppRole;
      };
      get_auth_user_branch_id: {
        Args: Record<PropertyKey, never>;
        Returns: string | null;
      };
      is_super_admin: {
        Args: Record<PropertyKey, never>;
        Returns: boolean;
      };
    };
    Enums: {
      app_role: AppRole;
      service_category: ServiceCategory;
      inquiry_status: InquiryStatus;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
