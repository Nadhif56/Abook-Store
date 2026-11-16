// test_step3.mjs
async function runTests() {
  const BASE_URL = 'http://localhost:3000';
  console.log('--- Testing Step 3: Order & QRIS Payment Flow ---');

  // 1. Register a customer
  const regEmail = `pembeli_${Date.now()}@example.com`;
  const regPassword = 'password123';
  console.log(`1. Registering customer: ${regEmail}`);
  const regRes = await fetch(`${BASE_URL}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Budi Pembaca',
      email: regEmail,
      password: regPassword,
    }),
  });
  const regData = await regRes.json();
  console.log('Register response:', regRes.status, regData.message || regData.error);
  if (!regRes.ok) throw new Error('Registration failed');

  // Extract customer auth cookie
  const setCookie = regRes.headers.get('set-cookie');
  const customerCookie = setCookie ? setCookie.split(';')[0] : '';
  console.log('Customer session cookie acquired:', !!customerCookie);

  // 2. Submit Order as customer
  console.log('2. Creating order as customer...');
  const orderRes = await fetch(`${BASE_URL}/api/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Cookie: customerCookie,
    },
    body: JSON.stringify({
      book_id: 'buku-1',
      book_title: 'Filosofi Teras',
      book_price: 98000,
      quantity: 2,
      recipient_name: 'Budi Pembaca',
      phone: '081234567890',
      address: 'Jl. Transyogi No. 45, Cileungsi, Bogor Timur',
      notes: 'Tolong sampul plastik rapi ya min.',
    }),
  });
  const orderData = await orderRes.json();
  console.log('Order created response:', orderRes.status, orderData.message || orderData.error);
  if (!orderRes.ok) throw new Error('Order creation failed');
  const order = orderData.order;
  console.log('Order Details:', {
    id: order.id,
    ticket: order.ticket_code || order.id,
    status: order.status,
    total: order.total_amount,
  });

  // 3. Customer checks their orders (/pesanan-saya API)
  console.log('3. Checking customer orders list...');
  const myOrdersRes = await fetch(`${BASE_URL}/api/orders`, {
    headers: { Cookie: customerCookie },
  });
  const myOrders = await myOrdersRes.json();
  console.log(`Customer has ${myOrders.orders?.length} order(s). Status: ${myOrders.orders?.[0]?.status}`);

  // 4. Admin login
  console.log('4. Admin logging in...');
  const adminLoginRes = await fetch(`${BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'admin@gmail.com',
      password: '123456',
    }),
  });
  const adminData = await adminLoginRes.json();
  console.log('Admin login response:', adminLoginRes.status, adminData.message || adminData.error);
  if (!adminLoginRes.ok) throw new Error('Admin login failed');
  const adminCookie = adminLoginRes.headers.get('set-cookie')?.split(';')[0];

  // 5. Admin lists orders
  console.log('5. Admin fetching incoming orders...');
  const adminOrdersRes = await fetch(`${BASE_URL}/api/admin/orders`, {
    headers: { Cookie: adminCookie },
  });
  const adminOrders = await adminOrdersRes.json();
  console.log(`Admin sees ${adminOrders.orders?.length} incoming order(s)`);

  // 6. Admin confirms the order
  console.log(`6. Admin confirming order ${order.id}...`);
  const confirmRes = await fetch(`${BASE_URL}/api/admin/orders/${order.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Cookie: adminCookie,
    },
    body: JSON.stringify({ status: 'dikonfirmasi' }),
  });
  const confirmData = await confirmRes.json();
  console.log('Confirmation status:', confirmRes.status, confirmData.message || confirmData.error);

  // 7. Customer checks order status again
  console.log('7. Customer re-checking order status...');
  const singleOrderRes = await fetch(`${BASE_URL}/api/orders/${order.id}`, {
    headers: { Cookie: customerCookie },
  });
  const singleOrderData = await singleOrderRes.json();
  console.log(`Order status is now: ${singleOrderData.order?.status}`);
  if (singleOrderData.order?.status !== 'dikonfirmasi') {
    throw new Error('Order status mismatch, expected dikonfirmasi');
  }

  console.log('\n--- ALL STEP 3 TESTS PASSED SUCCESSFULLY! ---');
}

runTests().catch(err => {
  console.error('Test Failed:', err);
  process.exit(1);
});
