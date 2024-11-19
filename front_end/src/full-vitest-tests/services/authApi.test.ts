import { login } from "../../../api";
import { expect } from "vitest";

describe("authApi Service", () => {
  it("logs in correctly", async () => {
    const response = await login({ username: "test", password: "1234" });
    expect(response).toEqual({ status: "success", token: "mocked-token" });
  });

  it("throws error on invalid credentials", async () => {
    await expect(login({ username: "invalid", password: "wrong" })).rejects.toThrow(
      "Failed to login"
    );
  });
});
