import http from "./axios";

const CartAPI = {
  // 🔹 Ambil semua item cart milik customer login
  getAll: () => {
    const token = localStorage.getItem("token");
    return http.get("/cart", {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
  },

  // 🔹 Tambah produk ke cart
  add: (data) => {
    const token = localStorage.getItem("token");
    return http.post("/cart", data, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
  },

  // 🔹 Update jumlah produk di cart
  update: (id, data) => {
    const token = localStorage.getItem("token");
    return http.put(`/cart/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
  },

  // 🔹 Hapus produk dari cart
  remove: (id) => {
    const token = localStorage.getItem("token");
    return http.delete(`/cart/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
  },
};

export default CartAPI;
