// schemas/user.ts
import { Rule } from '@sanity/types';

export default {
  name: 'user',
  title: 'User',
  type: 'document',
  fields: [
    {
      name: 'userId',
      title: 'User ID',
      type: 'string',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule: Rule) => Rule.required().email(),
    },
    {
      name: 'phoneNumber',
      title: 'Phone Number',
      type: 'string',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'address',
      title: 'Address',
      type: 'string',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'orders',
      title: 'Orders',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'orderId',
              title: 'Order ID',
              type: 'string',
              validation: (Rule: Rule) => Rule.required(),
            },
            {
              name: 'productId',
              title: 'Product ID',
              type: 'reference',
              to: [{ type: 'product' }], // Reference to the product schema for product ID
              validation: (Rule: Rule) => Rule.required(),
            },
            {
              name: 'quantity',
              title: 'Quantity',
              type: 'number',
              validation: (Rule: Rule) => Rule.required(),
            },
          ],
        },
      ],
    },
    {
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'updatedAt',
      title: 'Updated At',
      type: 'datetime',
      validation: (Rule: Rule) => Rule.required(),
    },
  ],
};