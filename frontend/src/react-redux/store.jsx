import { configureStore } from '@reduxjs/toolkit';
import { StoreContext } from '../context/StoreContext';

const Store = new configureStore({
    reducer: {
        store: StoreContext,
    },
});

export default Store;
