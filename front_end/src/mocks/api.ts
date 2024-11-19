export const mockLogin = async (credentials: { username: string; password: string }) => {
    if (credentials.username === "test" && credentials.password === "1234") {
      return { status: "success", token: "mocked-token" };
    }
    throw new Error("Invalid credentials");
  };
  
  export const mockFetchProfile = async () => {
    return { username: "test", membershipStatus: "active" };
  };
  