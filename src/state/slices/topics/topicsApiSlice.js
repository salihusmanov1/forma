import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const baseQuery = fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL + '/api', credentials: 'include', })

export const topicsApi = createApi({
  reducerPath: "topicsApi",
  baseQuery,
  endpoints: (builder) => ({
    getTopics: builder.query({
      query: () => ({
        url: '/topics',
        method: 'GET',
      }),
    }),

  })
})
export const { useGetTopicsQuery } = topicsApi;