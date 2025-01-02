import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const baseQuery = fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL + '/api', credentials: 'include', })

export const formsApi = createApi({
  reducerPath: "formsApi",
  baseQuery,
  endpoints: (builder) => ({
    getForms: builder.query({
      query: () => ({
        url: '/form',
        method: 'GET',
      }),
    }),
    createForm: builder.mutation({
      query: (form) => ({
        url: '/form',
        method: 'POST',
        body: form,
      }),
    }),
    updateForm: builder.mutation({
      query: ({ id, form }) => ({
        url: `/form/${id}`,
        method: 'PUT',
        body: form,
      }),
    }),
    getForm: builder.query({
      query: (id) => ({
        url: `/form/${id}`,
        method: 'GET',
      }),
    }),
  })
})
export const { useGetFormsQuery, useCreateFormMutation, useGetFormQuery, useUpdateFormMutation } = formsApi;