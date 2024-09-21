import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchTickets = createAsyncThunk(
  'tickets/fetchTickets',
  async () => {
    const response = await axios.get('https://api.quicksell.co/v1/internal/frontend-assignment');
    return response.data;
  }
);

const ticketSlice = createSlice({
  name: 'tickets',
  initialState: {
    ticketDetails: [],
    groupValue: 'status',
    orderValue: 'title',
    statusList: ['In progress', 'Backlog', 'Todo', 'Done', 'Cancelled'],
    userList: ['Anoop Sharma', 'Yogesh', 'Shankar Kumar', 'Ramesh', 'Suresh'],
    priorityList: [
      { name: 'No priority', priority: 0 },
      { name: 'Low', priority: 1 },
      { name: 'Medium', priority: 2 },
      { name: 'High', priority: 3 },
      { name: 'Urgent', priority: 4 },
    ],
  },
  reducers: {
    setGroupValue(state, action) {
      state.groupValue = action.payload;
      localStorage.setItem('groupValue', JSON.stringify(action.payload));
    },
    setOrderValue(state, action) {
      state.orderValue = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTickets.fulfilled, (state, action) => {
      const { tickets, users } = action.payload;
      state.ticketDetails = tickets.map(ticket => {
        const userObj = users.find(user => user.id === ticket.userId);
        return { ...ticket, userObj };
      });
    });
  },
});

export const { setGroupValue, setOrderValue } = ticketSlice.actions;
export default ticketSlice.reducer;