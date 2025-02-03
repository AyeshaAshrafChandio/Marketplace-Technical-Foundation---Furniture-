
// Function to update stock in Sanity
/*
const updateStock = async (productId, decrementBy) => {
  try {
    const updatedProduct = await client
      .patch(productId) // Specify the product to update
      .dec({ stock: decrementBy }) // Decrement stock by the specified quantity
      .commit(); // Commit the changes

    console.log('Stock updated:', updatedProduct);
    return updatedProduct;
  } catch (error) {
    console.error('Error updating stock:', error);
  }
};  */