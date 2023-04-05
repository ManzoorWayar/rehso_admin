import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/apiSlice"

const jobAdapter = createEntityAdapter()

const initialState = jobAdapter.getInitialState()

export const jobApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getJobs: builder.query({
            query: () => ({
                url: '/admin/request/job',
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                },
            }),
            transformResponse: responseData => {
                const loadedJob = responseData?.map(job => {
                    job.id = job._id
                    return job
                });
                return jobAdapter.setAll(initialState, loadedJob)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Job', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Job', id }))
                    ]
                } else return [{ type: 'Job', id: 'LIST' }]
            }
        }),
        changeJobStatus: builder.mutation({
            query: ({ id, ...status }) => {
                return ({
                    url: `/admin/request/job/${id} `,
                    method: 'PUT',
                    body: { ...status }
                })
            },
            invalidatesTags: [
                { type: 'Job', id: "LIST" }
            ]
        }),
    }),
})

export const {
    useGetJobsQuery,
    useChangeJobStatusMutation
} = jobApiSlice

// returns the query result object
export const selectJobResult = jobApiSlice.endpoints.getJobs.select()

// creates memoized selector
const selectJobData = createSelector(
    selectJobResult,
    jobResult => jobResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllJobs,
    selectById: selectJobById,
    // Pass in a selector that returns the Job slice of state
} = jobAdapter.getSelectors(state => selectJobData(state) ?? initialState)