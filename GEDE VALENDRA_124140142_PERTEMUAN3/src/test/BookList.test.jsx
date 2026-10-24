import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BookList from "../components/BookList/BookList";

const books = [{ id: "1", title: "Laut Bercerita", author: "Leila", status: "baca" }];

describe("BookList", () => {
  it("menampilkan judul, penulis, dan status buku", () => {
    render(<BookList books={books} onEdit={vi.fn()} onDelete={vi.fn()} />);
    expect(screen.getByRole("heading", { name: "Laut Bercerita" })).toBeInTheDocument();
    expect(screen.getByText("Leila")).toBeInTheDocument();
    expect(screen.getByText("Sedang dibaca")).toBeInTheDocument();
  });

  it("memanggil aksi edit saat tombol Edit dipilih", async () => {
    const user = userEvent.setup();
    const onEdit = vi.fn();
    render(<BookList books={books} onEdit={onEdit} onDelete={vi.fn()} />);
    await user.click(screen.getByRole("button", { name: "Edit" }));
    expect(onEdit).toHaveBeenCalledWith(books[0]);
  });

  it("menampilkan keadaan kosong saat tidak ada buku", () => {
    render(<BookList books={[]} onEdit={vi.fn()} onDelete={vi.fn()} />);
    expect(screen.getByText("Belum ada buku di sini")).toBeInTheDocument();
  });
});