import { configureStore } from '@reduxjs/toolkit';
import ticketReducer from './ticketsSlice';

const store = configureStore({
  reducer: {
    tickets: ticketReducer,
  },
});

export default store;