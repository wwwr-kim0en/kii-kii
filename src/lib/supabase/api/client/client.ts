import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseKey) {
	throw new Error('env missing : Supabase URL,Supabase Anon Key 없습니다.');
}

const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
