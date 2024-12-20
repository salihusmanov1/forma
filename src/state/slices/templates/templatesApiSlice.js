import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const baseQuery = fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL + '/api', credentials: 'include', })

export const templatesApi = createApi({
  reducerPath: "templatesApi",
  baseQuery,
  endpoints: (builder) => ({
    getTemplates: builder.query({
      query: () => ({
        url: '/templates',
        method: 'GET',
      }),
    }),
    createTemplate: builder.mutation({
      query: (template) => ({
        url: '/templates',
        method: 'POST',
        body: template,
      }),
    }),
  })
})
export const { useGetTemplatesQuery, useCreateTemplateMutation } = templatesApi;