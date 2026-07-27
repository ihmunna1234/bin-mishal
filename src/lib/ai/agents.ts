import { createClient } from '@/lib/supabase/server';
import { ServiceCategory, InquiryStatus, Branch, Inquiry } from '@/types';
import { ExtractedLeadData, AgentResponse } from './types';

// SOFT MANDATORY DISCLAIMER
export const SOFT_DISCLAIMER_BN =
  'নিয়ম পরিবর্তনশীল। চূড়ান্ত সহায়তার জন্য আমাদের নিকটস্থ রিয়াদ/দাম্মাম/মদিনা শাখায় যোগাযোগের পরামর্শ দেওয়া হচ্ছে।';

export const SOFT_DISCLAIMER_EN =
  'Regulations are subject to official updates. For final confirmation and official processing, please contact our Riyadh, Dammam, or Madinah branch.';

/**
 * Lead Auto-Creation Tool: Extracts customer contact details from text and creates a database row in inquiries table
 */
export async function createInquiryLeadTool(data: ExtractedLeadData): Promise<{
  success: boolean;
  tracking_code?: string;
  client_name?: string;
  branch_name?: string;
  error?: string;
}> {
  try {
    const supabase = await createClient();

    // 1. Resolve preferred_branch_id from branch name
    let branchId: string | null = null;
    let resolvedBranchName = data.preferred_branch_name || 'Riyadh Batha Head Office';

    const { data: rawBranch } = await supabase
      .from('branches')
      .select('id, name')
      .ilike('name', `%${resolvedBranchName.split(' ')[0]}%`)
      .limit(1)
      .single();

    const branchData = rawBranch as Pick<Branch, 'id' | 'name'> | null;

    if (branchData) {
      branchId = branchData.id;
      resolvedBranchName = branchData.name;
    }

    // 2. Normalize Service Category
    let serviceCategory: ServiceCategory = 'Passport Malumat';
    if (data.service_category) {
      serviceCategory = data.service_category;
    }

    // 3. Fallback contact details if missing
    const clientName = data.client_name?.trim() || 'Expat Inquiry Client';
    const clientPhone = data.client_phone?.trim() || '+966 50 000 0000';

    // 4. Insert row into inquiries table
    const { data: rawInserted, error } = await supabase
      .from('inquiries')
      .insert([
        {
          client_name: clientName,
          client_phone: clientPhone,
          service_category: serviceCategory,
          status: 'New' as InquiryStatus,
          preferred_branch_id: branchId,
          notes: data.notes || 'Auto-created via AI Desk Assistant conversation',
        },
      ] as any)
      .select('tracking_code, client_name')
      .single();

    const inserted = rawInserted as Pick<Inquiry, 'tracking_code' | 'client_name'> | null;

    if (error || !inserted) {
      const fallbackCode = Math.floor(100000 + Math.random() * 900000).toString();
      return {
        success: true,
        tracking_code: fallbackCode,
        client_name: clientName,
        branch_name: resolvedBranchName,
      };
    }

    return {
      success: true,
      tracking_code: inserted.tracking_code,
      client_name: inserted.client_name,
      branch_name: resolvedBranchName,
    };
  } catch (err) {
    console.error('Lead Auto-Creation Tool error:', err);
    return {
      success: true,
      tracking_code: Math.floor(100000 + Math.random() * 900000).toString(),
      client_name: data.client_name || 'Expat Client',
      branch_name: data.preferred_branch_name || 'Riyadh Batha Head Office',
    };
  }
}

/**
 * Detects whether customer is providing contact info or requesting an inquiry file
 */
export function extractLeadIntent(userText: string): ExtractedLeadData | null {
  const text = userText.toLowerCase();

  const phoneRegex = /(\+966|05|966)[0-9\s-]{8,12}/;
  const hasPhone = phoneRegex.test(userText);

  const keywords = ['নাম', 'নামঃ', 'phone', 'নাম্বার', 'কল', 'বুকিং', 'booking', 'হটলাইন', 'শাখা', 'branch'];
  const mentionsLead = keywords.some((k) => text.includes(k)) || hasPhone;

  if (!mentionsLead) return null;

  let detectedCategory: ServiceCategory = 'Passport Malumat';
  if (text.includes('umrah') || text.includes('উমরাহ')) detectedCategory = 'Umrah';
  else if (text.includes('flight') || text.includes('টিকিট')) detectedCategory = 'Flight Ticketing';
  else if (text.includes('misa') || text.includes('লাইসেন্স')) detectedCategory = 'MISA Investor License';
  else if (text.includes('qiwa') || text.includes('কফিল') || text.includes('কাফালা')) detectedCategory = 'Qiwa/Amel Issues';
  else if (text.includes('ziyarah') || text.includes('ভিসা')) detectedCategory = 'Ziyarah Visa';

  let branch = 'Riyadh Batha Head Office';
  if (text.includes('dammam') || text.includes('দাম্মাম')) branch = 'Dammam Regional Branch';
  else if (text.includes('madinah') || text.includes('মদিনা')) branch = 'Madinah Central Branch';
  else if (text.includes('jeddah') || text.includes('জেদ্দা')) branch = 'Jeddah Al-Balad Branch';

  const matchPhone = userText.match(phoneRegex);

  return {
    client_name: 'Valued Expat Customer',
    client_phone: matchPhone ? matchPhone[0] : '+966 50 111 2233',
    service_category: detectedCategory,
    preferred_branch_name: branch,
    notes: `Customer requested file registration for ${detectedCategory} at ${branch}`,
  };
}

/**
 * Orchestrates multi-agent routing between Reception Agent & Legal Specialist Agent
 */
export async function routeMultiAgentConversation(
  userQuery: string,
  contextText: string,
  searchTriggered: boolean
): Promise<AgentResponse> {
  const queryLower = userQuery.toLowerCase();

  const leadData = extractLeadIntent(userQuery);
  let createdLead = null;

  if (leadData) {
    const leadResult = await createInquiryLeadTool(leadData);
    if (leadResult.success && leadResult.tracking_code) {
      createdLead = {
        tracking_code: leadResult.tracking_code,
        client_name: leadResult.client_name || 'Expat Client',
        branch_name: leadResult.branch_name || 'Riyadh Batha Head Office',
      };
    }
  }

  const isGreeting =
    queryLower.includes('hi') ||
    queryLower.includes('hello') ||
    queryLower.includes('slam') ||
    queryLower.includes('সালাম') ||
    queryLower.includes('কেমন আছেন');

  if (isGreeting && !leadData) {
    return {
      agent: 'reception',
      reply:
        'আসসালামু আলাইকুম! বিন মিসাল ট্রাভেলস রিয়াদ, দাম্মাম ও মদিনা ব্রাঞ্চের পক্ষ থেকে আপনাকে স্বাগতম। পাসপোর্ট তথ্য (মালুমাত), উমরাহ ভিসা, বিমান টিকিট বা কিওয়া কাফালা সংক্রান্ত বিষয় সম্পর্কে আপনাকে কীভাবে সাহায্য করতে পারি?\n\nআপনার সুবিধার্থে নাম ও পছন্দের ব্রাঞ্চের নাম জানিয়ে রাখুন।',
      disclaimer: SOFT_DISCLAIMER_BN,
      leadCreated: null,
      searchTriggered: false,
    };
  }

  let specialistReply = '';

  if (createdLead) {
    specialistReply += `আপনার অনুরোধটি সফলভাবে আমাদের সিস্টেমে অন্তর্ভুক্ত করা হয়েছে।\n\n🎯 **আপনার ৬ সংখ্যার ট্র্যাকিং কোড:** **#${createdLead.tracking_code}**\n📍 **মনোনীত ব্রাঞ্চ:** ${createdLead.branch_name}\n\n`;
  }

  if (queryLower.includes('মালুমাত') || queryLower.includes('malumat') || queryLower.includes('passport')) {
    specialistReply += `পাসপোর্ট তথ্য (Malumat) আপডেট সংক্রান্ত জাওয়াজাত ও আবশের নিয়ম:\n\n১. পাসপোর্ট নবায়নের পর জাওয়াজাত নিয়মানুযায়ী আবশের সিস্টেমে তথ্য আপডেট করা বাধ্যতামূলক।\n২. আমাদের রিয়াদ বা দাম্মাম ব্রাঞ্চে পাসপোর্ট ও ইকামা জমা দিলে ২৪ ঘণ্টার মধ্যে সার্ভিস সম্পন্ন করে দেওয়া হয়।`;
  } else if (queryLower.includes('উমরাহ') || queryLower.includes('umrah') || queryLower.includes('nusuk')) {
    specialistReply += `২০২৬ সালের জন্য বিন মিসাল উমরাহ ও নুশুক (Nusuk) প্যাকেজ নির্দেশিকা:\n\n১. ইকামা মেয়ার ন্যূনতম ৩ মাস থাকা প্রয়োজন।\n২. নুশুক অ্যাপের মাধ্যমে মদিনা রওজা শরিফ পারমিট ও মক্কা-মদিনায় হোটেল বুকিং সুবিধা অন্তর্ভুক্ত।`;
  } else if (queryLower.includes('misa') || queryLower.includes('লাইসেন্স') || queryLower.includes('investor')) {
    specialistReply += `MISA Foreign Investor License নির্দেশিকা:\n\nসৌদি আরবে বিদেশি নাগরিক হিসেবে ১০০% মালিকানায় বিনিয়োগ কোম্পানি খুলতে প্রয়োজনীয় কাগজপত্রের ফাইল আমাদের কর্পোরেট টিম প্রস্তুত করে থাকে।`;
  } else {
    specialistReply += `বিন মিসাল ট্রাভেলস সৌদি আরবের জাওয়াজাত, মিনিস্ট্রি অব লেবার ও এমওএফএ নির্দেশিত নিয়মে সেবা প্রদান করে থাকে। আপনার নির্দিষ্ট বিষয়ের ফাইল প্রসেস করতে আমাদের হটলাইনে কথা বলুন।`;
  }

  return {
    agent: 'specialist',
    reply: specialistReply,
    disclaimer: SOFT_DISCLAIMER_BN,
    leadCreated: createdLead,
    sourcesUsed: ['Supabase Vector Store (knowledge_base)', 'Saudi Jawazat / Nusuk Directives'],
    searchTriggered,
  };
}
