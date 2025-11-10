import http from "./axios";

const CustomerOrderAPI = {
  /**
   * 🔹 GET /api/orders
   * Ambil semua pesanan milik customer (halaman Orders.jsx)
   */
  getAll: async () => {
    return await http.get("/orders");
  },

  /**
   * 🔹 GET /api/orders/{id}
   * Detail 1 pesanan (halaman ShippingDetails.jsx)
   */
  getDetail: async (orderId) => {
    return await http.get(`/orders/${orderId}`);
  },

  /**
   * 🔹 POST /api/checkout
   * Simpan pesanan baru (Checkout.jsx)
   */
  create: async (payload) => {
    return await http.post("/checkout", payload);
  },

  /**
   * 🔹 POST /api/orders/{id}/review
   * Tambah ulasan (RateProduct.jsx)
   */
  addReview: async (orderId, payload) => {
    return await http.post(`/orders/${orderId}/review`, payload);
  },
};

export default CustomerOrderAPI;
