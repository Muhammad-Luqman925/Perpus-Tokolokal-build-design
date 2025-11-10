import http from "./axios"; // pastikan kamu udah punya instance axios yang include baseURL & auth header

const CustomerAddressAPI = {
    // 🔹 Ambil semua alamat milik customer
    async getAll() {
        return await http.get("/customer/addresses");
    },

    // 🔹 Tambah alamat baru
    async create(data) {
        return await http.post("/customer/addresses", data);
    },

    // 🔹 Update alamat
    async update(id, data) {
        return await http.put(`/customer/addresses/${id}`, data);
    },

    // 🔹 Hapus alamat
    async delete(id) {
        return await http.delete(`/customer/addresses/${id}`);
    },

    // 🔹 Set alamat utama
    async setPrimary(id) {
        return await http.put(`/customer/addresses/${id}/set-primary`);
    },
    
  async getActive() {
    const res = await http.get("/customer/addresses/active");
    return res.data;
  },
};

export default CustomerAddressAPI;
