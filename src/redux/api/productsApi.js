import { api } from "./index";

const productsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query({
      query: () => ({
        url: "/product/all",
      }),
    }),
    getProductDetails: build.query({
      query: (id) => ({
        url: `/product/single-product/${id}`,
      }),
    }),
    searchProduct: build.mutation({
      query: (searchQuery) => ({
        url: `/product/search?productName=${searchQuery}`,
        method: "POST",
      }),
    }),
    likeProduct: build.mutation({
      query: (id) => ({
        url: `/product/${id}/like`,
        method: "PATCH",
      }),
    }),
    unlikeProduct: build.mutation({
      query: (id) => ({
        url: `/product/${id}/unlike`,
        method: "PATCH",
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductDetailsQuery,
  useSearchProductMutation,
  useLikeProductMutation,
  useUnlikeProductMutation,
} = productsApi;

export default productsApi;
