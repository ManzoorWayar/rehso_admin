import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/apiSlice"

const donatorAdapter = createEntityAdapter()

const initialState = donatorAdapter.getInitialState()

export const donatorApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getDonators: builder.query({
            query: () => ({
                url: '/donator',
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                },
            }),
            transformResponse: responseData => {
                const loadedDonator = responseData?.map(donator => {
                    donator.id = donator._id
                    return donator
                });
                return donatorAdapter.setAll(initialState, loadedDonator)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'DONATOR', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'DONATOR', id }))
                    ]
                } else return [{ type: 'DONATOR', id: 'LIST' }]
            }
        }),
        changeDonatorstatus: builder.mutation({
            query: ({ id, ...status }) => {
                return ({
                    url: `/donator/status/${id} `,
                    method: 'PUT',
                    body: { ...status }
                })
            },
            invalidatesTags: [
                { type: 'DONATOR', id: "LIST" }
            ]
        }),
    }),
})

export const {
    useGetDonatorsQuery,
    useChangeDonatorstatusMutation
} = donatorApiSlice

// returns the query result object
export const selectDonatorResult = donatorApiSlice.endpoints.getDonators.select()

// creates memoized selector
const selectDonatorData = createSelector(
    selectDonatorResult,
    donatorResult => donatorResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllDonators,
    selectById: selectDonatorById,
    // Pass in a selector that returns the Donator slice of state
} = donatorAdapter.getSelectors(state => selectDonatorData(state) ?? initialState)