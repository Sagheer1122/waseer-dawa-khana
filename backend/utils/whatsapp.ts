export interface WhatsAppOrderPayload {
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  shippingAddress: string;
  items: {
    productName: string;
    quantity: number;
    price: number;
    size?: string;
  }[];
  totalAmount: number;
  paymentMethod?: string;
}

/**
 * Normalizes WhatsApp phone number to pure digits with country code (e.g. 923001234567)
 */
export function getBusinessWhatsAppNumber(): string {
  const raw = process.env.WHATSAPP_NUMBER || '923390010550';
  return raw.replace(/[^0-9]/g, '');
}

/**
 * Generates pre-filled WhatsApp click-to-chat URL with detailed receipt
 */
export function generateWhatsAppOrderUrl(order: WhatsAppOrderPayload): string {
  const number = getBusinessWhatsAppNumber();

  const itemsList = order.items
    .map(
      (item) =>
        `• ${item.productName}${item.size ? ` (${item.size})` : ''} x ${item.quantity} - Rs. ${(
          item.price * item.quantity
        ).toLocaleString('en-PK')}`
    )
    .join('\n');

  const message = `🌿 *NEW ORDER - WASEER HERBAL HAIR OIL* 🌿
Order #: ${order.orderNumber}
----------------------------------------
👤 *Customer:* ${order.customerName}
📞 *Phone:* ${order.customerPhone}
📍 *Shipping Address:* ${order.shippingAddress}

📦 *Items Ordered:*
${itemsList}

💰 *Total Payable:* Rs. ${order.totalAmount.toLocaleString('en-PK')}
💳 *Payment:* ${order.paymentMethod ? order.paymentMethod.toUpperCase() : 'CASH ON DELIVERY'}
🚚 *Delivery:* Nationwide Dispatch (TCS / Leopards)
----------------------------------------
Assalam-o-Alaikum WASEER Dawa Khana, please confirm and dispatch my order!`;

  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
