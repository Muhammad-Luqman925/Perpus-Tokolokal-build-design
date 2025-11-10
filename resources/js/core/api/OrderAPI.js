import http from "@/core/api/axios"; 
// ⚠️ jika file axios.js dan ini ada di folder yang sama, ubah ke:
// import http from "./axios";
const OrderAPI = {
  getAll: () => api.get("/orders"),
  getDetail: (id) => api.get(`/orders/${id}`),
  addReview: (id, data) => api.post(`/orders/${id}/review`, data),
};

export default OrderAPI;