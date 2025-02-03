// Inventory stock schema 

export default {
    name: 'inventory',
    type: 'document',
    title: 'Inventory',
    fields: [
      { name: 'productId', type: 'reference', to: [{ type: 'product' }], title: 'Product' },
      { name: 'stock', type: 'number', title: 'Current Stock' },
      {
        name: 'restockHistory',
        type: 'array',
        title: 'Restock History',
        of: [
          {
            type: 'object',
            fields: [
              { name: 'date', type: 'datetime', title: 'Restock Date' },
              { name: 'quantity', type: 'number', title: 'Quantity Restocked' }
            ]
          }
        ]
      },
      {
        name: 'salesHistory',
        type: 'array',
        title: 'Sales History',
        of: [
          {
            type: 'object',
            fields: [
              { name: 'month', type: 'string', title: 'Month' },
              { name: 'sold', type: 'number', title: 'Sold Quantity' }
            ]
          }
        ]
      },
      { name: 'warehouseLocation', type: 'string', title: 'Warehouse Location'}
    ]
  };
  