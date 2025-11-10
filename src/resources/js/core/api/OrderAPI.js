import http from "src/resources/js/core/api/axios"; 
// ⚠️ jika file axios.js dan ini ada di folder yang sama, ubah ke:
// import http from "./axios";
const OrderAPI = {
  getAll: () => http.get("/orders"),
  getDetail: (id) => http.get(`/orders/${id}`),
  addReview: (id, data) => http.post(`/orders/${id}/review`, data),
};

export default OrderAPI;