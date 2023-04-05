import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/apiSlice"

const businessPackgesAdapter = createEntityAdapter()

const initialState = businessPackgesAdapter.getInitialState()

export const businessPackgesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getBusinessPackages: builder.query({
            query: () => ({
                url: '/admin/request/service',
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                },
            }),
            transformResponse: responseData => {
                const loadedBusinessPackges = responseData?.map(pack => {
                    pack.id = pack._id
                    return pack
                });
                return businessPackgesAdapter.setAll(initialState, loadedBusinessPackges)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'BusinessPackage', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'BusinessPackage', id }))
                    ]
                } else return [{ type: 'BusinessPackage', id: 'LIST' }]
            }
        }),
        changePackageStatus: builder.mutation({
            query: ({ id, ...status }) => {
                return ({
                    url: `/admin/request/service/${id} `,
                    method: 'PUT',
                    body: { ...status }
                })
            },
            invalidatesTags: [
                { type: 'BusinessPackage', id: "LIST" }
            ]
        }),
    }),
})

export const {
    useGetBusinessPackagesQuery,
    useChangePackageStatusMutation
} = businessPackgesApiSlice

// returns the query result object
export const selectBusinessPackgesResult = businessPackgesApiSlice.endpoints.getBusinessPackages.select()

// creates memoized selector
const selectBusinessPackagesData = createSelector(
    selectBusinessPackgesResult,
    BusinessPackagesResult => BusinessPackagesResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllBusinessPackages,
    selectById: selectBusinessPackgesById,
    // Pass in a selector that returns the BusinessPackages slice of state
} = businessPackgesAdapter.getSelectors(state => selectBusinessPackagesData(state) ?? initialState)