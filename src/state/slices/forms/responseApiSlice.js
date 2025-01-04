import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const baseQuery = fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL + '/api', credentials: 'include', })

export const responseApi = createApi({
  reducerPath: "responseApi",
  baseQuery,
  endpoints: (builder) => ({
    // getForms: builder.query({
    //   query: () => ({
    //     url: '/form',
    //     method: 'GET',
    //   }),
    // }),
    createResponse: builder.mutation({
      query: (response) => ({
        url: '/response',
        method: 'POST',
        body: response,
      }),
    }),
    // updateForm: builder.mutation({
    //   query: ({ id, form }) => ({
    //     url: `/form/${id}`,
    //     method: 'PUT',
    //     body: form,
    //   }),
    // }),
    // getForm: builder.query({
    //   query: (id) => ({
    //     url: `/form/${id}`,
    //     method: 'GET',
    //   }),
    // }),
  })
})
export const { useCreateResponseMutation } = responseApi;