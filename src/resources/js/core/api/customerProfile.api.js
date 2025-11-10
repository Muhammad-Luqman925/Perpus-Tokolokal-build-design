import axios from "axios";

// Ambil base URL dari .env atau fallback ke localhost
const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api";

// Helper untuk ambil header otentikasi otomatis
const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    return {
        headers: {
            Authorization: token ? `Bearer ${token}` : "",
            Accept: "application/json",
        },
    };
};

const CustomerProfileAPI = {
    /**
     * 🔹 Ambil data profil user yang sedang login
     */
    async getProfile() {
        return await axios.get(`${API_BASE_URL}/customer/profile`, getAuthHeader());
    },

    /**
     * 🔹 Update data profil user
     * @param {Object} data
     */
    async updateProfile(data) {
        return await axios.put(`${API_BASE_URL}/customer/profile`, data, getAuthHeader());
    },

    /**
     * 🔹 Upload avatar (foto profil)
     * @param {File} file
     */
    async uploadAvatar(file) {
        const formData = new FormData();
        formData.append("avatar", file);

        const headers = getAuthHeader();
        headers.headers["Content-Type"] = "multipart/form-data";

        return await axios.post(`${API_BASE_URL}/customer/profile/avatar`, formData, headers);
    },
};

export default CustomerProfileAPI;
