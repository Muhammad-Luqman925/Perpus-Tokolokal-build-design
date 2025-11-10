import http from "./axios";

// 🔹 Register
export async function registerCustomer(data) {
  try {
    const res = await http.post("/customer/register", data);
    return res.data;
  } catch (err) {
    console.error("Register error:", err);
    throw err;
  }
}

// 🔹 Login
export async function loginCustomer(data) {
  try {
    const res = await http.post("/customer/login", data);
    return res.data;
  } catch (err) {
    console.error("Login error:", err);
    throw err;
  }
}

// 🔹 Logout (butuh token)
export async function logoutCustomer(token) {
  try {
    const res = await http.post(
      "/customer/logout",
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data;
  } catch (err) {
    console.error("Logout error:", err);
    throw err;
  }
}
