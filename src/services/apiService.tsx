import { read, create } from "./httpService";

export async function apiGetAllProducts(page: number = 1, limit: number = 10) {
  const start = (page - 1) * limit;
  const allProducts = await read(
    `/products?populate=*&pagination[start]=${start}&pagination[limit]=${limit}`
  );

  return allProducts;
}

export async function apiFilterProductsByCategory(
  categoryId: any,
  page: number = 1,
  limit: number = 10
) {
  const start = (page - 1) * limit;
  const categoryFilterProducts = await read(
    `/products?filters[category][id][$eq]=${categoryId}&populate=*&pagination[start]=${start}&pagination[limit]=${limit}`
  );

  return categoryFilterProducts;
}

export async function apiGetSingleProduct(productId: any) {
  const singleProduct = await read(`/products/${productId}?populate=*`);
  return singleProduct;
}

export async function apiSeachProds(query: any) {
  const searchProducts = await read(`/products?_q=${query}&populate=*`);
  return searchProducts;
}

export async function apiGetAllCategories() {
  const allCategories = await read("/categories?populate=*");
  return allCategories;
}

export async function apiGetSingleCategory(catId: any) {
  const singleCategory = await read(`/categories/${catId}/?populate=*`);
  return singleCategory;
}

export async function apiGetSingleType(typeId: any) {
  const singleTypeContent = await read(`/${typeId}?populate=*`);
  return singleTypeContent;
}

export async function apiGetHome() {
  const singleHome = await read(
    `/home?populate[small_banners][populate]=*&populate[produtos][populate]=*&populate[home_slider][populate]=*`
  );
  return singleHome;
}

export async function apiCreateQuotation(dataQuotation: any) {
  // A estrutura correta do payload com o objeto "data"
  const payload = {
    data: {
      nome: dataQuotation.nome,
      cotacao_info: dataQuotation.cotacao_info,
      email: dataQuotation.email,
    },
  };
  const newQuotation = await create("/cotacoes", payload);
  return newQuotation;
}
