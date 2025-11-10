import http from "@/core/api/axios";

const CustomerSessionAPI = {
  async getAll() {
    const res = await http.get("/sessions");
    return res.data;
  },
  async logout(id) {
    return http.delete(`/sessions/${id}`);
  },
  async logoutAll() {
    return http.delete("/sessions");
  },
};

export default CustomerSessionAPI;
