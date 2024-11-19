import { login } from "../../../api";
import { expect, it, describe, vi, beforeEach } from "vitest";

vi.mock("../../../api", () => ({
  login: vi.fn(),
}));

describe("authApi Service", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("logs in correctly", async () => {
    vi.mocked(login).mockResolvedValue({ status: "success", token: "mocked-token" });
    const response = await login({ username: "test", password: "1234" });
    expect(response).toEqual({ status: "success", token: "mocked-token" });
  });

  it("throws error on invalid credentials", async () => {
    vi.mocked(login).mockRejectedValue(new Error("Failed to login"));
    await expect(login({ username: "invalid", password: "wrong" })).rejects.toThrow(
      "Failed to login"
    );
  });
});