import http from "./axios"; // pastikan sudah ada konfigurasi axios utama (baseURL + token)

// Base URL
const BASE_URL = "/customer/payment-methods";
const CHANNEL_URL = "/payment-channels";

const CustomerPaymentAPI = {
    /**
     * 🔹 Ambil semua channel aktif (Bank & E-Wallet)
     */
    async getChannels() {
        return await http.get(CHANNEL_URL);
    },

    /**
     * 🔹 Ambil semua metode pembayaran milik customer
     */
    async getAll() {
        return await http.get(BASE_URL);
    },

    /**
     * 🔹 Tambah metode pembayaran baru
     * @param {Object} data - { payment_channel_id, account_number, account_name, is_primary }
     */
    async create(data) {
        return await http.post(BASE_URL, data);
    },

    /**
     * 🔹 Update metode pembayaran
     * @param {Number} id
     * @param {Object} data
     */
    async update(id, data) {
        return await http.put(`${BASE_URL}/${id}`, data);
    },

    /**
     * 🔹 Hapus metode pembayaran
     * @param {Number} id
     */
    async delete(id) {
        return await http.delete(`${BASE_URL}/${id}`);
    },
};

export default CustomerPaymentAPI;
