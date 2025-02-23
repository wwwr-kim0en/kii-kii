import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseKey) {
	throw new Error('env missing : Supabase URL,Supabase Anon Key 없습니다.');
}

const supabase = createClient(supabaseUrl, supabaseKey, {
	// auth: {
	// 	flowType: 'pkce',
	// },
});

supabase.auth.onAuthStateChange((event, session) => {
	if (session && session.provider_token) {
		window.localStorage.setItem('oauth_provider_token', session.provider_token);
	}

	if (session && session.provider_refresh_token) {
		window.localStorage.setItem('oauth_provider_refresh_token', session.provider_refresh_token);
	}

	if (event === 'SIGNED_OUT') {
		window.localStorage.removeItem('oauth_provider_token');
		window.localStorage.removeItem('oauth_provider_refresh_token');
	}
});

export default supabase;
