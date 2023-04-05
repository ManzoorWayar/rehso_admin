import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/apiSlice"

const messagesAdapter = createEntityAdapter()

const initialState = messagesAdapter.getInitialState()

export const messagesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getMessages: builder.query({
            query: (chatId) => ({
                url: `/admin/ticket/${chatId}`,
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                },
            }),
            transformResponse: responseData => {
                const loadedMessages = responseData?.map(message => {
                    message.id = message._id
                    return message
                });
                return messagesAdapter.setAll(initialState, loadedMessages)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Message', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Message', id }))
                    ]
                } else return [{ type: 'Message', id: 'LIST' }]
            }
        }),
        addMessage: builder.mutation({
            query: payload => {
                return ({
                    url: `/admin/ticket/${payload.chatId}`,
                    method: 'POST',
                    body: payload.formData,
                })
            },
            invalidatesTags: [
                { type: 'Message', id: "LIST" }
            ]
        }),
        editMessage: builder.mutation({
            query: payload => {
                return ({
                    url: `/admin/ticket/${payload.chatId}/message/${payload.msgId}`,
                    method: 'PUT',
                    body: payload.formData
                })
            },
            invalidatesTags: [
                { type: 'Message', id: "LIST" }
            ]
        }),
        replyMessage: builder.mutation({
            query: (payload) => {
                return ({
                    url: `/admin/ticket/${payload.chatId}/message/${payload.msgId}/reply`,
                    method: 'POST',
                    body: {
                        text: payload.text,
                        preText: payload.preText,
                    }
                })
            },
            invalidatesTags: [
                { type: 'Message', id: "LIST" }
            ]
        }),
        deleteMessage: builder.mutation({
            query: (payload) => {
                return ({
                    url: `/admin/ticket/${payload.chatId}/message/${payload.msgId}`,
                    method: 'DELETE'
                })
            },
            invalidatesTags: [
                { type: 'Message', id: "LIST" }
            ]
        })
    }),
})

export const {
    useGetMessagesQuery,
    useAddMessageMutation,
    useEditMessageMutation,
    useReplyMessageMutation,
    useDeleteMessageMutation
} = messagesApiSlice

// returns the query result object
export const selectMessagesResult = messagesApiSlice.endpoints.getMessages.select()

// creates memoized selector
const selectMessagesData = createSelector(
    selectMessagesResult,
    messagesResult => messagesResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAlMessages,
    selectById: selectMessageById,
    selectIds: selectMessageIds
    // Pass in a selector that returns the Messages slice of state
} = messagesAdapter.getSelectors(state => selectMessagesData(state) ?? initialState)