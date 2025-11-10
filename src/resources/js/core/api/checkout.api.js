/**
 * 1. IMPORT DULU 'http' (axios instance) kamu
 */
import http from "src/resources/js/core/api/axios";

const CheckoutAPI = {
    getPreview: () => {
        return http.get("/checkout/preview");
    },
    updateShipping: (payload) => {
        return http.post("/checkout/update-shipping", payload);
    },
    create: (payload) => {
        /**
         * 2. GANTI 'api' JADI 'http'
         * 3. GANTI RUTE '/checkout' JADI '/orders'
         */
        return http.post("/orders", payload); // 👈 Sesuai routes/api.php
    },
};

export default CheckoutAPI;