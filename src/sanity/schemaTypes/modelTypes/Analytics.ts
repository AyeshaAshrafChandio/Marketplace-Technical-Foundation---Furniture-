const analyticsSchema = {
  name: 'analytics',
  type: 'document',
  title: 'Analytics',
  fields: [
    { name: 'month', type: 'string', title: 'Month' },
    { name: 'totalSales', type: 'number', title: 'Total Items Sold' },
    { name: 'totalRevenue', type: 'number', title: 'Total Revenue' },
    { name: 'totalProfit', type: 'number', title: 'Total Profit' },
    {
      name: 'productsSold',
      type: 'array',
      title: 'Products Sold',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'productId', type: 'reference', to: [{ type: 'product' }] },
            { name: 'quantity', type: 'number', title: 'Quantity Sold' }
          ]
        }
      ]
    },
    {
      name: 'remainingStock',
      type: 'array',
      title: 'Remaining Stock',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'productId', type: 'reference', to: [{ type: 'product' }] },
            { name: 'stock', type: 'number', title: 'Remaining Stock' }
          ]
        }
      ]
    },
    { 
      name: 'expenses', 
      type: 'object', 
      title: 'Expenses', 
      fields: [
        { name: 'marketing', type: 'number', title: 'Marketing Expense' },
        { name: 'restocking', type: 'number', title: 'Restocking Expense' }
      ] 
    },
    { name: 'createdAt', type: 'datetime', title: 'Report Created At' }
  ]
};

export default analyticsSchema;
