import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BookForm from "../components/BookForm/BookForm";

describe("BookForm", () => {
  it("menampilkan error saat judul dan penulis kosong", async () => {
    const user = userEvent.setup();
    render(<BookForm onSubmit={vi.fn()} editingBook={null} onCancel={vi.fn()} />);
    await user.click(screen.getByRole("button", { name: /tambah buku/i }));
    expect(screen.getByText("Judul buku wajib diisi.")).toBeInTheDocument();
    expect(screen.getByText("Nama penulis wajib diisi.")).toBeInTheDocument();
  });

  it("mengirim data buku yang valid", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<BookForm onSubmit={onSubmit} editingBook={null} onCancel={vi.fn()} />);
    await user.type(screen.getByLabelText("Judul buku"), "Laut Bercerita");
    await user.type(screen.getByLabelText("Nama penulis"), "Leila");
    await user.click(screen.getByRole("button", { name: /tambah buku/i }));
    expect(onSubmit).toHaveBeenCalledWith({ title: "Laut Bercerita", author: "Leila", status: "milik" });
  });
});