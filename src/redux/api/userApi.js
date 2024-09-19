import { api } from "./index";

const userApi = api.injectEndpoints({
  endpoints: (build) => ({
    getProfile: build.query({
      query: () => ({
        url: "/auth/profile"
      }),
    })
  }),
});

export const { useGetProfileQuery } = userApi;