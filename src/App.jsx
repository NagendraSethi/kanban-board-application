import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTickets, setGroupValue, setOrderValue } from './redux/ticketsSlice';
import List from './Components/List/List';
import Navbar from './Components/Navbar/Navbar';
import './App.css';

function App() {
  const dispatch = useDispatch();
  const { ticketDetails, groupValue, orderValue, statusList, userList, priorityList } = useSelector(state => state.tickets);

  useEffect(() => {
    dispatch(fetchTickets());
    const storedGroupValue = localStorage.getItem('groupValue');
    if (storedGroupValue) {
      dispatch(setGroupValue(JSON.parse(storedGroupValue)));
    }
  }, [dispatch]);

  const handleGroupValue = (value) => dispatch(setGroupValue(value));
  const handleOrderValue = (value) => dispatch(setOrderValue(value));

  return (
    <>
      <Navbar
        groupValue={groupValue}
        orderValue={orderValue}
        handleGroupValue={handleGroupValue}
        handleOrderValue={handleOrderValue}
      />
      <section className="board-details">
        <div className="board-details-list">
          {groupValue === 'status' && statusList.map((listItem) => (
            <List key={listItem} groupValue='status' orderValue={orderValue} listTitle={listItem} ticketDetails={ticketDetails} />
          ))}
          {groupValue === 'user' && userList.map((listItem) => (
            <List key={listItem} groupValue='user' orderValue={orderValue} listTitle={listItem} ticketDetails={ticketDetails} />
          ))}
          {groupValue === 'priority' && priorityList.map(({ name, priority }) => (
            <List key={priority} groupValue='priority' orderValue={orderValue} listTitle={priority} ticketDetails={ticketDetails} />
          ))}
        </div>
      </section>
    </>
  );
}

export default App;