import { getSession, json, privateStore, requireSameOrigin } from '../lib/security.mjs';

export const config = { path: '/api/orders' };
const ORDER_STATES = ['Order Received', 'Confirmed', 'Processing', 'Preparing', 'Shipped', 'Delivered', 'Cancelled'];

export default async (request) => {
  if (!requireSameOrigin(request)) return json({ error: 'Request origin is not allowed.' }, 403);

  if (request.method === 'POST') {
    const data = await request.json().catch(() => null);
    if (!data?.customerName || !data?.phone || !Array.isArray(data.items) || !data.items.length) return json({ error: 'Order details are incomplete.' }, 400);
    let catalog;
    try {
      const response = await fetch(new URL('/content/site-content.json', request.url), { cache: 'no-store' });
      if (!response.ok) throw new Error('Catalog unavailable');
      catalog = await response.json();
    } catch {
      return json({ error: 'The published catalog is unavailable; this order was not accepted.' }, 503);
    }
    const productsById = new Map(catalog.products.map((product) => [product.id, product]));
    const items = [];
    for (const requested of data.items) {
      const product = productsById.get(requested.productId);
      const quantity = Number(requested.quantity);
      if (!product || product.availability === 'Out of Stock' || !Number.isInteger(quantity) || quantity < 1 || quantity > 20) {
        return json({ error: 'One or more items are unavailable or have an invalid quantity. Please refresh your cart.' }, 409);
      }
      items.push({ productId: product.id, name: product.name, price: Number(product.salePrice), quantity, image: product.imageUrls[0] || '' });
    }
    const payment = catalog.settings?.payment || {};
    const canPay = (method) => items.every((item) => {
      const product = productsById.get(item.productId);
      const availability = product.paymentAvailability || 'Both Available';
      return availability === 'Both Available' ||
        (method === 'Cash on Delivery' && availability === 'COD Available') ||
        (method === 'Online Payment' && availability === 'Online Payment Available');
    });
    if ((data.paymentMethod === 'Cash on Delivery' && (!payment.codEnabled || !canPay(data.paymentMethod))) ||
        (data.paymentMethod === 'Online Payment' && (!payment.onlineEnabled || !canPay(data.paymentMethod))) ||
        !['Cash on Delivery', 'Online Payment'].includes(data.paymentMethod)) {
      return json({ error: 'This payment method is no longer available for the items in your cart.' }, 409);
    }
    const orders = await privateStore.get('orders/list', { type: 'json' }) || [];
    const nextNumber = Math.max(99, ...orders.map((order) => Number(order.orderNumber) || 0)) + 1;
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const delivery = items.length ? Number(catalog.settings?.deliveryCharges) || 0 : 0;
    const order = {
      orderNumber: nextNumber,
      customerName: String(data.customerName).slice(0, 140), phone: String(data.phone).slice(0, 50),
      email: String(data.email || '').slice(0, 180), city: String(data.city || '').slice(0, 100),
      address: String(data.address || '').slice(0, 1000), notes: String(data.notes || '').slice(0, 1500),
      paymentMethod: data.paymentMethod, items, subtotal, delivery, total: subtotal + delivery,
      orderDate: new Date().toISOString(), status: 'Order Received'
    };
    orders.push(order);
    await privateStore.setJSON('orders/list', orders);
    return json({ accepted: true, order });
  }

  if (!await getSession(request)) return json({ error: 'Admin session expired. Log in again.' }, 401);
  if (request.method === 'GET') return json({ orders: await privateStore.get('orders/list', { type: 'json' }) || [] });
  if (request.method === 'PATCH') {
    const { orderNumber, status } = await request.json().catch(() => ({}));
    if (!ORDER_STATES.includes(status)) return json({ error: 'Unknown order status.' }, 400);
    const orders = await privateStore.get('orders/list', { type: 'json' }) || [];
    const order = orders.find((entry) => Number(entry.orderNumber) === Number(orderNumber));
    if (!order) return json({ error: 'Order not found.' }, 404);
    order.status = status;
    order.updatedAt = new Date().toISOString();
    await privateStore.setJSON('orders/list', orders);
    return json({ order });
  }
  return json({ error: 'Method not allowed.' }, 405, { allow: 'GET, POST, PATCH' });
};
