import { useState } from 'react';

export function useList() {
  const [list, setList] = useState([]);

  const createItem = () => {
    const newItem = {
      id: crypto.randomUUID(), // Используем crypto.randomUUID()
      title: '',
      done: false,
    };
    setList((prevList) => [...prevList, newItem]);
  };

  const setItemTitle = (id, title) => {
    setList((prevList) =>
      prevList.map((item) => (item.id === id ? { ...item, title } : item))
    );
  };

  const toggleItem = (id) => {
    setList((prevList) =>
      prevList.map((item) =>
        item.id === id ? { ...item, done: !item.done } : item
      )
    );
  };

  const deleteItem = (id) => {
    setList((prevList) => prevList.filter((item) => item.id !== id));
  };

  return {
    list,
    createItem,
    setItemTitle,
    toggleItem,
    deleteItem,
  };
}