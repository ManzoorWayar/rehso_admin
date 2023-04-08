import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/apiSlice"

const volunteerAdapter = createEntityAdapter()

const initialState = volunteerAdapter.getInitialState()

export const volunteerApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getVolunteers: builder.query({
            query: () => ({
                url: '/volunteer',
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                },
            }),
            transformResponse: responseData => {
                const loadedVolunteer = responseData?.map(volunteer => {
                    volunteer.id = volunteer._id
                    return volunteer
                });
                return volunteerAdapter.setAll(initialState, loadedVolunteer)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'VOLUNTEER', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'VOLUNTEER', id }))
                    ]
                } else return [{ type: 'VOLUNTEER', id: 'LIST' }]
            }
        }),
        changeVolunteerStatus: builder.mutation({
            query: ({ id, ...status }) => {
                return ({
                    url: `/volunteer/status/${id} `,
                    method: 'PUT',
                    body: { ...status }
                })
            },
            invalidatesTags: [
                { type: 'VOLUNTEER', id: "LIST" }
            ]
        }),
    }),
})

export const {
    useGetVolunteersQuery,
    useChangeVolunteerStatusMutation
} = volunteerApiSlice

// returns the query result object
export const selectVolunteerResult = volunteerApiSlice.endpoints.getVolunteers.select()

// creates memoized selector
const selectVolunteerData = createSelector(
    selectVolunteerResult,
    volunteerResult => volunteerResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllVolunteers,
    selectById: selectVolunteerById,
    // Pass in a selector that returns the Volunteer slice of state
} = volunteerAdapter.getSelectors(state => selectVolunteerData(state) ?? initialState)