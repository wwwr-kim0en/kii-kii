export function extractFromEmail(email: string): { username: string; domain: string } | null {
	if (!email) return { username: '', domain: '' };
	const [username = '', domain = ''] = email.split('@');
	if (!username || !domain) return null;
	return { username, domain };
}
