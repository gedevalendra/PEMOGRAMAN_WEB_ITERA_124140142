import "@testing-library/jest-dom";
import { afterEach, beforeEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";

afterEach(() => cleanup());
beforeEach(() => {
  localStorage.clear();
  vi.restoreAllMocks();
});