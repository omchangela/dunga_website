/**
 * Google Tag Manager (GTM) & GA4 / Google Ads E-Commerce DataLayer Utility
 * Compatible with GA4 Enhanced Ecommerce & Google Ads Conversion Tracking
 */

declare global {
  interface Window {
    dataLayer?: any[];
  }
}

export function pushDataLayer(eventData: Record<string, any>) {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(eventData);
}

// 1. View Item (Product Detail Page)
export function trackViewItem(product: {
  id: string;
  slug?: string;
  title: string;
  category?: string;
  priceINR?: number;
  priceUSD?: number;
}, currency: 'INR' | 'USD' = 'INR') {
  const price = currency === 'INR' ? product.priceINR || 0 : product.priceUSD || 0;
  pushDataLayer({ ecommerce: null }); // Clear previous ecommerce object
  pushDataLayer({
    event: 'view_item',
    ecommerce: {
      currency,
      value: price,
      items: [
        {
          item_id: product.id || product.slug,
          item_name: product.title,
          item_category: product.category || 'Source Code',
          price,
          quantity: 1,
        },
      ],
    },
  });
}

// 2. Add to Cart
export function trackAddToCart(item: {
  productId: string;
  productTitle: string;
  category?: string;
  licenseType: string;
  price: number;
  currency: 'INR' | 'USD';
}) {
  pushDataLayer({ ecommerce: null });
  pushDataLayer({
    event: 'add_to_cart',
    ecommerce: {
      currency: item.currency,
      value: item.price,
      items: [
        {
          item_id: item.productId,
          item_name: item.productTitle,
          item_category: item.category || 'Source Code',
          item_variant: item.licenseType,
          price: item.price,
          quantity: 1,
        },
      ],
    },
  });
}

// 3. Begin Checkout
export function trackBeginCheckout(
  items: Array<{
    productId: string;
    productTitle: string;
    category?: string;
    licenseType: string;
    price: number;
  }>,
  totalValue: number,
  currency: 'INR' | 'USD'
) {
  pushDataLayer({ ecommerce: null });
  pushDataLayer({
    event: 'begin_checkout',
    ecommerce: {
      currency,
      value: totalValue,
      items: items.map((i) => ({
        item_id: i.productId,
        item_name: i.productTitle,
        item_category: i.category || 'Source Code',
        item_variant: i.licenseType,
        price: i.price,
        quantity: 1,
      })),
    },
  });
}

// 4. Purchase Event (GA4 & Google Ads Conversion Tracking)
export function trackPurchase(order: {
  orderNumber: string;
  customerEmail?: string;
  customerPhone?: string;
  customerName?: string;
  amount: number;
  currency: 'INR' | 'USD';
  tax?: number;
  items: Array<{
    productId: string;
    productTitle: string;
    category?: string;
    licenseType?: string;
    price: number;
  }>;
}) {
  pushDataLayer({ ecommerce: null });
  pushDataLayer({
    event: 'purchase',
    ecommerce: {
      transaction_id: order.orderNumber,
      value: order.amount,
      currency: order.currency,
      tax: order.tax || 0,
      customer_email: order.customerEmail,
      customer_phone: order.customerPhone,
      customer_name: order.customerName,
      items: order.items.map((i) => ({
        item_id: i.productId,
        item_name: i.productTitle,
        item_category: i.category || 'Source Code',
        item_variant: i.licenseType || 'REGULAR',
        price: i.price,
        quantity: 1,
      })),
    },
  });
}

// 5. Lead Generation / Contact Submission Event
export function trackLeadSubmission(lead: {
  formType: string;
  serviceOrProduct?: string;
  email?: string;
  phone?: string;
  name?: string;
}) {
  pushDataLayer({
    event: 'generate_lead',
    lead_type: lead.formType,
    service_or_product: lead.serviceOrProduct || 'General Inquiry',
    lead_email: lead.email,
    lead_phone: lead.phone,
    lead_name: lead.name,
  });
}
