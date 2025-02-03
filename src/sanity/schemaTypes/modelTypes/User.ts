import { Rule } from '@sanity/types';

const userSchema = {
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
      name: 'zipCode',
      title: 'Zip Code',
      type: 'string',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'country',
      title: 'Country',
      type: 'string',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'countryCode',
      title: 'Country Code',
      type: 'string',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'city',
      title: 'City',
      type: 'string',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'state',
      title: 'State',
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
              type: 'string',
            },
            {
              name: 'productName',
              title: 'Product Name',
              type: 'string',
            },
            {
              name: 'productPrice',
              title: 'Product Price',
              type: 'number',
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
    },
    {
      name: 'updatedAt',
      title: 'Updated At',
      type: 'datetime',
    },
  ],
};

export default userSchema;
