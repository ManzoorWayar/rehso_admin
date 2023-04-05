import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/apiSlice"

const ContactsAdapter = createEntityAdapter()

const initialState = ContactsAdapter.getInitialState()

export const ContactsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getContacts: builder.query({
            query: () => ({
                url: '/admin/contact-us',
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                },
            }),
            transformResponse: responseData => {
                const loadedContacts = responseData?.map(contact => {
                    contact.id = contact._id
                    return contact
                });
                return ContactsAdapter.setAll(initialState, loadedContacts)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Contact', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Contact', id }))
                    ]
                } else return [{ type: 'Contact', id: 'LIST' }]
            }
        }),
        changeStatus: builder.mutation({
            query: ({ id, ...status }) => {
                return ({
                    url: `/admin/contact-us/${id}/change-status`,
                    method: 'PUT',
                    body: { ...status }
                })
            },
            invalidatesTags: [
                { type: 'Contact', id: "LIST" }
            ]
        }),
    }),
})

export const {
    useGetContactsQuery,
    useChangeStatusMutation
} = ContactsApiSlice

// returns the query result object
export const selectContactResult = ContactsApiSlice.endpoints.getContacts.select()

// creates memoized selector
const selectContactsData = createSelector(
    selectContactResult,
    ContactsResult => ContactsResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllContacts,
    selectById: selectContactById,
    // Pass in a selector that returns the Contacts slice of state
} = ContactsAdapter.getSelectors(state => selectContactsData(state) ?? initialState)