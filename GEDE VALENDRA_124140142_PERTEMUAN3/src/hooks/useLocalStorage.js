import { useEffect, useState } from "react";

// Menyinkronkan state React dengan localStorage dan menangani data yang tidak valid.
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Data buku gagal disimpan:", error);
    }
  }, [key, value]);

  return [value, setValue];
}