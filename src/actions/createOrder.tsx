import { client } from "../sanity/lib/client";

interface OrderData {
  productId: string;
  productName: string;
  quantity: number;
  totalAmount: number;
  status: string;
  originalPrice: number;
}

interface Order {
  orderId: string;
  userId: string;
  orderDate: string;
  orderData: OrderData[];
}

export const createOrder = async (order: Order) => {
  try {
    // Check if the orderId already exists in the sanity
    const existingOrder = await client.fetch(
      `*[_type == "order" && orderId == $orderId][0]`,
      { orderId: order.orderId }
    );

    if (existingOrder) {
      // Order already exists, return a message or throw an error
      console.log(`Order with orderId ${order.orderId} already exists.`);
      return { message: `Order with orderId ${order.orderId} already exists.` };
    }


    // Proceed to create the order since the orderId is unique, and the user and products exist
    const newOrder = {
      _type: 'order',
      orderId: order.orderId,
      userId: order.userId,
      orderDate: order.orderDate,
      orderData: order.orderData.map((item) => ({
        productId: item.productId,
        productName: item.productName,
        quantity: item.quantity,
        totalAmount: item.totalAmount,
        status: item.status,
        originalPrice: item.originalPrice,
      })),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Create the order in Sanity
    const createdOrder = await client.create(newOrder);

    console.log('Order created:', createdOrder);
    return createdOrder;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};
