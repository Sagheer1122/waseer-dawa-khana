import connectDB from '../config/db';
import Order, { IOrder, OrderStatus } from '../models/Order';
import Product from '../models/Product';
import { generateWhatsAppOrderUrl } from '../utils/whatsapp';

/**
 * Creates a new order in MongoDB Atlas and returns the order record along with pre-filled WhatsApp click-to-chat URL.
 */
export async function createOrder(data: Partial<IOrder>): Promise<{ order: IOrder; whatsappUrl: string }> {
  await connectDB();

  if (!data.customerName || !data.customerPhone || !data.shippingAddress) {
    throw new Error('Customer name, phone, and delivery address are required');
  }

  if (!data.items || data.items.length === 0) {
    throw new Error('Order must have at least one product item');
  }

  const orderNumber = `PK-${Math.floor(100000 + Math.random() * 900000)}`;

  const totalAmount = data.totalAmount || data.items.reduce((sum, it) => sum + it.price * it.quantity, 0);

  const newOrder = new Order({
    orderNumber,
    customerName: data.customerName,
    customerPhone: data.customerPhone,
    shippingAddress: data.shippingAddress,
    customerEmail: data.customerEmail || '',
    items: data.items.map((it: any) => ({
      ...it,
      productId: (it.productId || it.id || 'waseer-herbal-product').toString(),
    })),
    totalAmount,
    status: 'pending',
    paymentMethod: data.paymentMethod || 'cod',
    notes: data.notes || '',
    whatsappMessageSent: true,
  });

  await newOrder.save();

  // Deduct stock if possible
  for (const item of data.items) {
    try {
      if (item.productId) {
        await Product.findByIdAndUpdate(item.productId, {
          $inc: { stock: -item.quantity },
        });
      }
    } catch (err) {
      console.warn(`[OrderService] Could not decrement stock for product ${item.productId}`);
    }
  }

  const whatsappUrl = generateWhatsAppOrderUrl({
    orderNumber,
    customerName: data.customerName,
    customerPhone: data.customerPhone,
    shippingAddress: data.shippingAddress,
    items: data.items,
    totalAmount,
    paymentMethod: data.paymentMethod,
  });

  return {
    order: newOrder,
    whatsappUrl,
  };
}

/**
 * Retrieves all orders for the admin dashboard.
 */
export async function getAllOrders(): Promise<IOrder[]> {
  await connectDB();
  return Order.find().sort({ createdAt: -1 }).lean();
}

/**
 * Updates order status.
 */
export async function updateOrderStatus(orderId: string, status: OrderStatus): Promise<IOrder | null> {
  await connectDB();
  const order = await Order.findByIdAndUpdate(
    orderId,
    { status },
    { new: true }
  );
  if (!order) {
    throw new Error('Order not found');
  }
  return order;
}

/**
 * Computes dashboard statistics for products & orders.
 */
export async function getDashboardStats() {
  await connectDB();

  const [
    totalProducts,
    activeProducts,
    outOfStock,
    lowStock,
    totalOrders,
    pendingOrders,
    deliveredOrders,
  ] = await Promise.all([
    Product.countDocuments(),
    Product.countDocuments({ isActive: true }),
    Product.countDocuments({ stock: 0 }),
    Product.countDocuments({ stock: { $gt: 0, $lte: 5 } }),
    Order.countDocuments(),
    Order.countDocuments({ status: 'pending' }),
    Order.countDocuments({ status: 'delivered' }),
  ]);

  // Aggregate total revenue from non-cancelled orders
  const revenueAgg = await Order.aggregate([
    { $match: { status: { $ne: 'cancelled' } } },
    { $group: { _id: null, total: { $sum: '$totalAmount' } } },
  ]);

  const totalRevenue = revenueAgg.length > 0 ? revenueAgg[0].total : 0;

  return {
    totalProducts,
    activeProducts,
    outOfStock,
    lowStock,
    totalOrders,
    pendingOrders,
    deliveredOrders,
    totalRevenue,
  };
}
