import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const baseQuery = fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL + '/api', credentials: 'include', })

export const responseApi = createApi({
  reducerPath: "responseApi",
  baseQuery,
  endpoints: (builder) => ({
    getResponse: builder.query({
      query: ({ id, userId }) => ({
        url: `/response/${id}/${userId}`,
        method: 'GET',
      }),
    }),
    createResponse: builder.mutation({
      query: (response) => {
        console.log(response);
        return {
          url: '/response',
          method: 'POST',
          body: response,
        }
      },
    }),
    updateResponse: builder.mutation({
      query: ({ id, answers }) => {
        return {
          url: `/response/${id}`,
          method: 'PUT',
          body: { answers },
        };
      },
    }),
    getResponses: builder.query({
      query: (id) => ({
        url: `/responses/${id}`,
        method: 'GET',
      }),
    }),
  })
})
export const { useCreateResponseMutation, useGetResponseQuery, useUpdateResponseMutation, useGetResponsesQuery } = responseApi;