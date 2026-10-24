import { createContext, useContext, useMemo } from "react";
import PropTypes from "prop-types";
import { useLocalStorage } from "../hooks/useLocalStorage";

const BookContext = createContext(null);

export function BookProvider({ children }) {
  const [books, setBooks] = useLocalStorage("ruangbaca-books", []);

  function addBook(book) {
    setBooks((current) => [...current, { ...book, id: crypto.randomUUID() }]);
  }

  function updateBook(id, updates) {
    setBooks((current) => current.map((book) => book.id === id ? { ...book, ...updates } : book));
  }

  function deleteBook(id) {
    setBooks((current) => current.filter((book) => book.id !== id));
  }

  const value = useMemo(() => ({ books, addBook, updateBook, deleteBook }), [books]);
  return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
}
BookProvider.propTypes = { children: PropTypes.node.isRequired };

export function useBooks() {
  const context = useContext(BookContext);
  if (!context) throw new Error("useBooks harus digunakan di dalam BookProvider");
  return context;
}