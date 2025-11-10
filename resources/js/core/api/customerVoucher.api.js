import http from "@/core/api/axios"; 
// ⚠️ jika file axios.js dan ini ada di folder yang sama, ubah ke:
// import http from "./axios";

const CustomerVoucherAPI = {
  async getAll() {
    const response = await http.get("/vouchers"); // ✅ ganti dari /customer/vouchers
    return response.data;
  },

  async getUsed() {
    const response = await http.get("/vouchers/used"); // ✅ ganti juga
    return response.data;
  },


  async redeemCode(code) {
    const response = await http.post("/vouchers/redeem", { code });
    return response.data;
  },
  async useVoucher(id) {
  try {
    const response = await http.post(`/vouchers/use/${id}`);
    return response.data;
  } catch (error) {
    console.error(`❌ Failed to use voucher ID ${id}:`, error);
    throw error;
  }
}

};


export default CustomerVoucherAPI;
