import { apiSlice } from "./apiSlice";

const admin_URL = "/api/admin";



export const adminApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    adminlogin: builder.mutation({
      query: (data) => ({
        url: `${admin_URL}/auth`,
        method: "POST",
        body: data,
      }),
    }),
    adminLogout: builder.mutation({
      query: () => ({
        url: `${admin_URL}/logout`,
        method: "POST",
      }),
    }),
    getUsersData: builder.mutation({
      query: () => ({
        url: `${admin_URL}/get-users`,
        method: "POST",
      }),
    }),
    deleteUser: builder.mutation({
      query: (data) => ({
        url: `${admin_URL}/delete-user`,
        method: "POST",
        body: data,
      }),
    }),
    BlockUser: builder.mutation({
      query: (data) => ({
        url: `${admin_URL}/block-user`,
        method: "POST",
        body: data,
      }),
    }),
    unBlockUser: builder.mutation({
      query: (data) => ({
        url: `${admin_URL}/unblock-user`,
        method: "POST",
        body: data,
      }),
    }),
    updateUserByAdmin: builder.mutation({
      query: (data) => ({
        url: `${admin_URL}/update-user`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const{useAdminloginMutation,useAdminLogoutMutation,useDeleteUserMutation,useGetUsersDataMutation,useUpdateUserByAdminMutation,useBlockUserMutation,useUnBlockUserMutation}= adminApiSlice