// schemas/shipment.ts

export default {
    name: 'shipment',
    type: 'document',
    title: 'Shipment',
    fields: [
      {
        name: 'orderId',
        type: 'reference',
        title: 'Order ID',
        to: [{ type: 'user' }], // Reference to the 'user' schema for the Order ID
      },
      {
        name: 'userId',
        type: 'reference',
        title: 'User ID',
        to: [{ type: 'user' }], // Reference to the 'user' schema for User ID
      },
      {
        name: 'shippingAddress',
        type: 'text',
        title: 'Shipping Address',
      },
      {
        name: 'status',
        type: 'string',
        title: 'Status',
        options: {
          list: ['Pending', 'Shipped', 'Delivered'],
        },
      },
      {
        name: 'trackingNumber',
        type: 'string',
        title: 'Tracking Number',
      },
      {
        name: 'shipmentDate',
        type: 'datetime',
        title: 'Shipment Date',
      },
      {
        name: 'deliveryDate',
        type: 'datetime',
        title: 'Delivery Date',
      },
      {
        name: 'carrier',
        type: 'string',
        title: 'Carrier',
      },
      {
        name: 'createdAt',
        type: 'datetime',
        title: 'Created At',
      },
      {
        name: 'updatedAt',
        type: 'datetime',
        title: 'Updated At',
      },
    ],
  };
  