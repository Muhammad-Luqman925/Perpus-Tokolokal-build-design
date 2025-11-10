// src/core/api/customerPassword.api.js
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const CustomerPasswordAPI = {
        changePassword: (data) =>
        axios.post(`${API_URL}/customer/reset-password`, data, {
            headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }),

};

export default CustomerPasswordAPI;
