import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const baseQuery = fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL + '/api', credentials: 'include', })

export const sfApi = createApi({
  reducerPath: "sfApi",
  baseQuery,
  endpoints: (builder) => ({
    createContact: builder.mutation({
      query: (form) => ({
        url: '/salesforce/contact',
        method: 'POST',
        body: form
      }),
    }),

  })
})
export const { useCreateContactMutation } = sfApi;