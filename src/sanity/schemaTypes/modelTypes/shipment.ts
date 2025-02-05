const shipmentSchema = {
  name: 'shipment',
  type: 'document',
  title: 'Shipment',
  fields: [
    {
      name: 'orderId',
      type: 'string',
      title: 'Order ID',
    },
    {
      name: 'userName',
      type: 'string',
      title: 'User Name',
    },
    {
      name: 'userEmail',
      type: 'string',
      title: 'User Email',
    },
    {
      name: 'countryCode',
      title: 'Country Code',
      type: 'string',
    },
    {
      name: 'userPhone',
      type: 'number',
      title: 'User Phone',
    },
    {
      name: 'shippingAddress',
      type: 'string',
      title: 'Shipping Address',
    },
    {
      name: 'status',
      type: 'string',
      title: 'Status',
      options: {
        list: ['Pending', 'Shipped', 'Delivered', 'Transit'],
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
      name: 'deliveryDate', // ETA
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

export default shipmentSchema;
