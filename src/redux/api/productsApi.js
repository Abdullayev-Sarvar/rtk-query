import { api } from "./index";

const productsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query({
      query: () => ({
        url: "/product/all"
      }),
    }),
    getProductDetails: build.query({
      query: (id) => ({
        url: `/product/single-product/${id}`
      })
    }),
    searchProduct: build.mutation({
      query: (searchQuery) => ({
        url: `/product/search?productName=${searchQuery}`,
        method: "POST"
      })
    }),
    getLikedProducts: build.mutation({
      query: (id) => ({
        url: `/product/66e83f10a469f0e41ad9ab92/like`,
        method: "PATCH",
        body: id
      }),
    }),
  }),
});

export const { useGetProductsQuery, useGetProductDetailsQuery, useSearchProductMutation, useGetLikedProductsMutation } = productsApi;