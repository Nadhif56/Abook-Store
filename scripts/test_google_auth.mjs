// test_google_auth.mjs
async function runTests() {
  const BASE_URL = 'http://127.0.0.1:3000';
  console.log('--- Testing Google Auth (Login & Register with Google) ---');

  // 1. Verify /login page has Google button
  console.log('1. Checking /login page for Google button...');
  const loginPageRes = await fetch(`${BASE_URL}/login`);
  const loginHtml = await loginPageRes.text();
  const hasLoginGoogle = loginHtml.includes('Masuk dengan Google');
  console.log('Login page status:', loginPageRes.status, '| Has Google button:', hasLoginGoogle);
  if (!hasLoginGoogle) throw new Error('Google button not found on /login');

  // 2. Verify /register page has Google button
  console.log('2. Checking /register page for Google button...');
  const regPageRes = await fetch(`${BASE_URL}/register`);
  const regHtml = await regPageRes.text();
  const hasRegGoogle = regHtml.includes('Daftar dengan Google');
  console.log('Register page status:', regPageRes.status, '| Has Google button:', hasRegGoogle);
  if (!hasRegGoogle) throw new Error('Google button not found on /register');

  // 3. Test Google redirect endpoint /api/auth/google
  console.log('3. Testing /api/auth/google redirect behavior...');
  const redirectRes = await fetch(`${BASE_URL}/api/auth/google`, { redirect: 'manual' });
  console.log('Redirect status:', redirectRes.status, '| Location:', redirectRes.headers.get('location'));

  // 4. Test Demo Google Sign-In via /api/auth/google/demo-login
  const testGoogleEmail = `pembaca_google_${Date.now()}@gmail.com`;
  console.log(`4. Executing Google Login/Signup for: ${testGoogleEmail}...`);
  const demoRes = await fetch(`${BASE_URL}/api/auth/google/demo-login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Pembaca Google Setia',
      email: testGoogleEmail,
      redirect: '/',
    }),
  });
  const demoData = await demoRes.json();
  console.log('Demo Google login status:', demoRes.status, '| User:', demoData.user);
  if (!demoRes.ok) throw new Error('Demo Google login failed');

  const setCookie = demoRes.headers.get('set-cookie');
  const sessionCookie = setCookie ? setCookie.split(';')[0] : '';
  console.log('Session cookie received:', !!sessionCookie);

  // 5. Verify /api/auth/me session with the received cookie
  console.log('5. Verifying authenticated session via /api/auth/me...');
  const meRes = await fetch(`${BASE_URL}/api/auth/me`, {
    headers: { Cookie: sessionCookie },
  });
  const meData = await meRes.json();
  console.log('/api/auth/me response:', meData);
  if (!meData.authenticated || meData.user?.email !== testGoogleEmail) {
    throw new Error('Authentication verification failed for Google user');
  }

  console.log('\n--- ALL GOOGLE AUTH TESTS PASSED PERFECTLY! ---');
}

runTests().catch(err => {
  console.error('Test Failed:', err);
  process.exit(1);
});
