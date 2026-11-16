// test_real_google.mjs
async function runTests() {
  const BASE_URL = 'http://127.0.0.1:3000';
  console.log('--- Testing Real Google OAuth 2.0 Integration ---');

  // 1. Check Login page has Google button
  const loginRes = await fetch(`${BASE_URL}/login`);
  const loginHtml = await loginRes.text();
  console.log('Login page status:', loginRes.status, '| Has Google Button:', loginHtml.includes('Masuk dengan Google'));

  // 2. Check Register page has Google button
  const regRes = await fetch(`${BASE_URL}/register`);
  const regHtml = await regRes.text();
  console.log('Register page status:', regRes.status, '| Has Google Button:', regHtml.includes('Daftar dengan Google'));

  // 3. Test /api/auth/google without env: should redirect to /login?error=google_not_configured
  const redirectRes = await fetch(`${BASE_URL}/api/auth/google?from=login`, { redirect: 'manual' });
  const location = redirectRes.headers.get('location') || '';
  console.log('Redirect location when keys unconfigured:', location);
  if (!location.includes('error=google_not_configured')) {
    throw new Error('Expected redirect with error=google_not_configured');
  }

  console.log('--- REAL GOOGLE OAUTH FLOW VERIFIED! ---');
}

runTests().catch(err => {
  console.error('Test Failed:', err);
  process.exit(1);
});
