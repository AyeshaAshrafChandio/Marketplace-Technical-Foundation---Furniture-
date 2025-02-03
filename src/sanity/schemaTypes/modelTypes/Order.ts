import { Rule } from '@sanity/types';

const orderSchema = {
  name: 'order',
  title: 'Order',
  type: 'document',
  fields: [
    {
      name: 'orderId',
      title: 'Order ID',
      type: 'string',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'userId',
      title: 'User ID',
      type: 'string',
    },
    {
      name: 'orderDate',
      title: 'Order Date',
      type: 'datetime',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'orderData',
      title: 'Order Data',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'productId',
              title: 'Product ID',
              type: 'string',
            },
            {
              name: 'productName',
              title: 'Product Name',
              type: 'string',
            },
            {
              name: 'quantity',
              title: 'Quantity',
              type: 'number',
              validation: (Rule: Rule) => Rule.required(),
            },
            {
              name: 'totalAmount',
              title: 'Total Amount',
              type: 'number',
              validation: (Rule: Rule) => Rule.required(),
            },
            {
              name: 'status',
              title: 'Status',
              type: 'string',
              validation: (Rule: Rule) => Rule.required(),
            },
            {
              name: 'originalPrice',
              title: 'Original Price',
              type: 'number',
            },
          ],
        },
      ],
    },
  ],
};

export default orderSchema;
