import { ServiceCategory } from '@/types';

export type AgentRole = 'reception' | 'specialist';

export interface ChatMessagePayload {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface ExtractedLeadData {
  client_name?: string;
  client_phone?: string;
  service_category?: ServiceCategory;
  preferred_branch_name?: string;
  notes?: string;
}

export interface AgentResponse {
  agent: AgentRole;
  reply: string;
  disclaimer?: string;
  leadCreated?: {
    tracking_code: string;
    client_name: string;
    branch_name: string;
  } | null;
  sourcesUsed?: string[];
  searchTriggered?: boolean;
}
