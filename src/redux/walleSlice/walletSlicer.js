import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

const initialState = {
  billsMoney: 100000000000,
  items: [
    {
      id: nanoid(),
      title: 'Year of Netflix',
      price: 100,
      img: 'https://neal.fun/spend/images/year-of-netflix.jpg',
      quantity: 0,
      anyBuyed: false,
      canBuyMore: true,
    },
    {
      id: nanoid(),
      title: 'Smartphone',
      price: 700,
      img: 'https://neal.fun/spend/images/smartphone.jpg',
      quantity: 0,
      anyBuyed: false,
      canBuyMore: true,
    },
    {
      id: nanoid(),
      title: 'Acre of Farmland',
      price: 2500,
      img: 'https://neal.fun/spend/images/acre-of-farmland.jpg',
      quantity: 0,
      anyBuyed: false,
      canBuyMore: true,
    },
    {
      id: nanoid(),
      title: 'Luxury Wine',
      price: 5000,
      img: 'https://neal.fun/spend/images/luxury-wine.jpg',
      quantity: 0,
      anyBuyed: false,
      canBuyMore: true,
    },
    {
      id: nanoid(),
      title: 'Jet Ski',
      price: 11000,
      img: 'https://neal.fun/spend/images/jet-ski.jpg',
      quantity: 0,
      anyBuyed: false,
      canBuyMore: true,
    },
    {
      id: nanoid(),
      title: 'House',
      price: 260000,
      img: 'https://neal.fun/spend/images/single-family-home.jpg',
      quantity: 0,
      anyBuyed: false,
      canBuyMore: true,
    },
    {
      id: nanoid(),
      title: 'Factory',
      price: 11000000,
      img: 'https://www.freepngimg.com/thumb/machine/55396-5-factory-free-download-image.png',
      quantity: 0,
      anyBuyed: false,
      canBuyMore: true,
    },
    {
      id: nanoid(),
      title: 'Boeing 747',
      price: 150000000,
      img: 'https://neal.fun/spend/images/boeing-747.jpg',
      quantity: 0,
      anyBuyed: false,
      canBuyMore: true,
    },
    {
      id: nanoid(),
      title: 'Skyscraper',
      price: 750000000,
      img: 'https://neal.fun/spend/images/skyscraper.jpg',
      quantity: 0,
      anyBuyed: false,
      canBuyMore: true,
    },
    {
      id: nanoid(),
      title: 'Cruise Ship',
      price: 950000000,
      img: 'https://neal.fun/spend/images/cruise-ship.jpg',
      quantity: 0,
      anyBuyed: false,
      canBuyMore: true,
    },
    {
      id: nanoid(),
      title: 'NBA Team',
      price: 2250000000,
      img: 'https://neal.fun/spend/images/nba-team.jpg',
      quantity: 0,
      anyBuyed: false,
      canBuyMore: true,
    },
  ],
  receiptItems: [],
  totalReceipt: 0,
  moneyValueArr: [100000000000, 100000000000],
};

const reducers = {
  changeOrder: (state, action) => {
    const { id, price, targetvalue } = action.payload;

    const oldQuantity = state.items.find((item) => item.id === id).quantity;
    const fark = oldQuantity - targetvalue;
    const buy = fark < 0 ? true : false;

    if ((buy && state.billsMoney - price * Math.abs(fark) >= 0) || !buy) {
      //change item's quantity and anybuyed property
      if (targetvalue > 0) {
        const updatedItems = state.items.map((item) =>
          item.id === id ? { ...item, anyBuyed: true, quantity: targetvalue } : item
        );
        state.items = updatedItems;
      } else {
        const updatedItems = state.items.map((item) =>
          item.id === id ? { ...item, anyBuyed: false, quantity: targetvalue } : item
        );
        state.items = updatedItems;
      }

      const itemForReceipt = state.items.find((item) => item.id === id);
      const itemInReceipt = state.receiptItems.find((item) => item.id === id);

      // subtract from money if that item is not in the receipt or same quantity before
      if (itemInReceipt === undefined) {
        state.billsMoney -= price * targetvalue;
      } else if (itemForReceipt.quantity > itemInReceipt.quantity) {
        state.billsMoney -= price * Math.abs(fark);
      } else if (itemForReceipt.quantity < itemInReceipt.quantity) {
        state.billsMoney += price * Math.abs(fark);
      }

      //array for counter
      state.moneyValueArr.push(state.billsMoney);
      state.moneyValueArr.shift();

      //if item buyed before, only update the quantity
      const itemDahaOnceAlindiMi = state.receiptItems.find((item) => item.id === id);
      if (itemDahaOnceAlindiMi === undefined) {
        state.receiptItems.push(itemForReceipt);
      } else {
        const updatedReceipt = state.receiptItems.map((item) =>
          item.id === id ? { ...item, quantity: targetvalue } : item
        );
        state.receiptItems = updatedReceipt;
      }

      // total receipt amount calculation
      let total = 0;
      state.receiptItems.map((item) => {
        total += item.quantity * item.price;
      });
      state.totalReceipt = total;

      //can buy more for ternary logic in component
      const updateBuyMore = state.items.map(
        (item) =>
          item && {
            ...item,
            canBuyMore: item.price > state.billsMoney ? false : true,
          }
      );
      state.items = updateBuyMore;
    }
  },
};

const walletSlicer = createSlice({
  name: 'wallet',
  initialState,
  reducers,
});

export const { changeOrder } = walletSlicer.actions;
export default walletSlicer.reducer;
