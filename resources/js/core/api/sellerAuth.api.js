import http from "./axios";

const SellerAuthAPI = {
  register: (payload) => http.post("/seller/register", payload),
};

export default SellerAuthAPI;
