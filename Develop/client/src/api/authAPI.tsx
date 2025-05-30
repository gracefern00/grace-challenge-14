import { UserLogin } from "../interfaces/UserLogin";

const login = async (userInfo: UserLogin) => {
  // TODO: make a POST request to the login route
  try {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Login failed");
    }

    const data = await response.json();

    // Store the JWT token in localStorage for subsequent requests
    localStorage.setItem("jwt", data.token);

    return data; // Return any necessary user data
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};

export { login };
