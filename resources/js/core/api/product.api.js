import http from "./axios";

const ProductAPI = {
  getAll: () => http.get("/products"),
  getById: (id) => http.get(`/products/${id}`),
  getFeatured: () => http.get("/products/featured"), // ✅ tanpa angka atau typo
  getFlashSale: () => http.get("/products/flash-sale"), // ✅ huruf kecil semua, tanpa “1”
  
};

export default ProductAPI;
