import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const baseQuery = fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL + '/api', credentials: 'include', })

export const tagsApi = createApi({
  reducerPath: "tagsApi",
  baseQuery,
  endpoints: (builder) => ({
    getTags: builder.query({
      query: () => ({
        url: '/tags',
        method: 'GET',
      }),
    }),

  })
})
export const { useGetTagsQuery } = tagsApi;