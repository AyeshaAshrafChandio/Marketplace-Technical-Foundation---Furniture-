export default {
    name: 'product',
    type: 'document',
    title: 'Product',
    fields: [
      { name: 'id', type: 'string', title: 'Product ID' },
      { name: 'name', type: 'string', title: 'Product Name' },
      { name: 'description', type: 'text', title: 'Description' },
      { name: 'price', type: 'number', title: 'Price' },
      { name: 'category', type: 'string', title: 'Category' },
      {
        name: 'dimensions', 
        type: 'object',
        title: 'Dimensions',
        fields: [
          { name: 'length', type: 'number', title: 'Length' },
          { name: 'height', type: 'number', title: 'Height' },
          { name: 'width', type: 'number', title: 'Width' },
          { name: 'weight', type: 'number', title: 'Weight' },
          {
            name: 'mass_unit',
            type: 'string',
            title: 'Mass Unit',
            options: { list: ['cm', 'kg', 'in', 'lbs'] },
          },
          {
            name: 'distance_unit',
            type: 'string',
            title: 'Distance Unit',
            options: { list: ['cm', 'm', 'in', 'ft'] },
          },
        ],
      },
      { name: 'material', type: 'string', title: 'Material' },
      { name: 'color', type: 'string', title: 'Color' },
      { name: 'stock', title: 'Stock',  type: 'reference',
        to: [{ type: 'inventory' }], // Reference to the inventory schema 
        },
      { name: 'image', type: 'image', title: 'Image' , options: {
        hotspot: true
      }},
      { name: 'rating', type: 'number', title: 'Rating' },
      {
        name: 'rating_counts',
        type: 'number',
        title: 'Rating Count',
        description: 'Number of ratings'
      },
      {
        name: 'comments',
        type: 'object',
        title: 'Comments',
        fields: [
          { name: 'user', type: 'string', title: 'User Name' },
          { name: 'comment', type: 'string', title: 'Comment' },
        ],
      },
      { name: 'added_on', type: 'datetime', title: 'Added On' },
    ],
  };