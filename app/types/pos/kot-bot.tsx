export interface KotBotFormType {
  unique_id?: string;
  employee_id: string;
  start_page: number;
  end_page: number;
  status: string;
  is_kot: boolean;
  is_bot: boolean;
  table_number?: number;
  kot_bot_type?: 'kot' | 'bot';
  company_id?: number;  // Optional as it might be set server-side
  branch_id?: number;   // Optional as it might be set server-side
}
