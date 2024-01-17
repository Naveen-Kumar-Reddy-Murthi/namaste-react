import { createSlice } from "@reduxjs/toolkit";
import produce from 'immer';

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addItem: (state, action) => {
      return produce(state, (draftState) => {
        const newItem = action.payload;
    
        const id = newItem.card.info.id;
        const existingItemIndex = draftState.items.findIndex(item => item.id === id);
        console.log('id =', id);
    
        if (existingItemIndex !== -1) {
          console.log('existing item', newItem);
          draftState.items[existingItemIndex].count += 1;
        } else {
          const price = newItem.card.info.price
            ? newItem.card.info.price / 100
            : newItem.card.info.defaultPrice / 100;
    
          draftState.items.push({
            item: newItem,
            id : id,
            count: 1,
            price: price,
          });
        }
      });
    },
    removeItem: (state) => {
      state.items.pop();
    },
    clearCart: (state) => {
      // state.items.length = [];
      // above will not work
      state.items.length = 0;
    },
  },
});

const updateOrAddItem = (array, newItem) => {
  // Check if the new item's ID exists in the array
  const id = newItem.card.info.id;
  const existingItemIndex = array.findIndex((item) => item.id === id);

  if (existingItemIndex !== -1) {
    // If the item exists, update the count
    array[existingItemIndex].count += 1;
  } else {
    const price = newItem.card.info.price
      ? newItem.card.info.price / 100
      : newItem.card.info.defaultPrice / 100;
    // If the item doesn't exist, add a new entry
    const newItemEntry = {
      id: id, // You can set the ID as per your requirements
      count: 1,
      item: newItem,
      price: price,
    };

    array.push(newItemEntry);
  }

  return array;
};

export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
