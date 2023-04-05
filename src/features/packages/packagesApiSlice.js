import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/apiSlice";

const packagesAdapter = createEntityAdapter();

const initialState = packagesAdapter.getInitialState();

export const packagesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getPackages: builder.query({
            query: () => ({
                url: "/admin/packages",
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError;
                },
            }),
            transformResponse: (responseData) => {
                const loadedPackages = responseData.map((pack) => {
                    pack.id = pack._id;
                    return pack;
                });

                return packagesAdapter.setAll(initialState, loadedPackages);
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: "Package", id: "LIST" },
                        ...result.ids.map((id) => ({ type: "Package", id })),
                    ];
                } else return [{ type: "Package", id: "LIST" }];
            },
        }),
        addPackage: builder.mutation({
            query: payload => ({
                url: '/admin/packages',
                method: 'POST',
                body: {
                    ...payload,
                }
            }),
            invalidatesTags: [
                { type: 'Package', id: "LIST" }
            ]
        }),
        updatePackage: builder.mutation({
            query: ({ id, ...payload }) => {
                return {
                    url: `/admin/packages/${id}`,
                    method: "PUT",
                    body: {
                        ...payload.data,
                    },
                }
            },
            invalidatesTags: (result, error, arg) => [{ type: "Package", id: arg.id }],
        }),
        deletePackage: builder.mutation({
            query: (id) => ({
                url: `/admin/packages/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Package', id: arg.id }
            ]
        }),
        getPackageCategories: builder.query({
            query: () => ({
                url: "/admin/packages/categories",
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError;
                },
            }),
            transformResponse: (responseData) => {
                const loadedCategories = responseData.map((category) => {
                    category.id = category._id;
                    return category;
                });

                return packagesAdapter.setAll(initialState, loadedCategories);
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: "Package", id: "LIST" },
                        ...result.ids.map((id) => ({ type: "Package", id })),
                    ];
                } else return [{ type: "Package", id: "LIST" }];
            },
        }),
    }),
});

export const {
    useGetPackagesQuery,
    useAddPackageMutation,
    useUpdatePackageMutation,
    useDeletePackageMutation,
    useGetPackageCategoriesQuery,
} = packagesApiSlice;

// returns the query result object
export const selectPackagesResult = packagesApiSlice.endpoints.getPackages.select();

// creates memoized selector
const selectPackagesData = createSelector(
    selectPackagesResult,
    (packagesResult) => packagesResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllPackages,
    selectById: selectPackageById,
    selectIds: selectPackageIds,
    // Pass in a selector that returns the notes slice of state
} = packagesAdapter.getSelectors((state) => selectPackagesData(state) ?? initialState);
