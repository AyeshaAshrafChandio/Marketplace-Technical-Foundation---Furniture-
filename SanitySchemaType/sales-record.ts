// schemas/salesRecord.ts
import { Rule } from '@sanity/types';

export default {
  name: 'salesRecord',
  title: 'Sales Record',
  type: 'document',
  fields: [
    {
      name: 'salesRecordId',
      title: 'Sales Record ID',
      type: 'string',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'productId',
      title: 'Product ID',
      type: 'reference',
      to: [{ type: 'product' }], // Reference to the product schema
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'userId',
      title: 'User ID',
      type: 'reference',
      to: [{ type: 'user' }], // Reference to the user schema
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'salesData',
      title: 'Sales Data',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'saleDate',
              title: 'Sale Date',
              type: 'datetime',
              validation: (Rule: Rule) => Rule.required(),
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
              name: 'profitPerItem',
              title: 'Profit Per Item',
              type: 'number',
              validation: (Rule: Rule) => Rule.required(),
            },
            {
              name: 'originalPrice',
              title: 'Original Price',
              type: 'reference',
      to: [{ type: 'product' }], // Reference to the product schema
      validation: (Rule: Rule) => Rule.required(),
            },
            {
              name: 'costPrice',
              title: 'Cost Price',
              type: 'number',
              validation: (Rule: Rule) => Rule.required(),
            },
            {
              name: 'totalProfit',
              title: 'Total Profit',
              type: 'number',
              validation: (Rule: Rule) => Rule.required(),
            },
          ],
        },
      ],
    },
  ],
};