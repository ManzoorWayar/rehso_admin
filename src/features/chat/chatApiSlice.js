import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/apiSlice";

const chatAdapter = createEntityAdapter({
    sortComparer: (a, b) =>
        a.completed === b.completed ? 0 : a.completed ? 1 : -1,
});

const initialState = chatAdapter.getInitialState();

export const chatApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getChats: builder.query({
            query: () => ({
                url: "/admin/ticket",
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError;
                },
            }),
            transformResponse: (responseData) => {
                const loadedChats = responseData.map((chat) => {
                    chat.id = chat._id;
                    return chat;
                });
                return chatAdapter.setAll(initialState, loadedChats);
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: "Chat", id: "LIST" },
                        ...result.ids.map((id) => ({ type: "Chat", id })),
                    ];
                } else return [{ type: "Chat", id: "LIST" }];
            },
        }),
        changeChatStatus: builder.mutation({
            query: (payload) => {
                return {
                    url: `/admin/ticket/${payload.id}`,
                    method: "PUT",
                    body: {
                        ...payload
                    },
                };
            },
            invalidatesTags: (result, error, arg) => [{ type: "Chat", id: arg.id }],
        })
    }),
});

export const {
    useGetChatsQuery,
    usechangeChatStatusMutation,
} = chatApiSlice;

// returns the query result object
export const selectChatsResult = chatApiSlice.endpoints.getChats.select();

// creates memoized selector
const selectChatsData = createSelector(
    selectChatsResult,
    (chatsResult) => chatsResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllChats,
    selectById: selectChatById,
    selectIds: selectChatIds,
    // Pass in a selector that returns the chats slice of state
} = chatAdapter.getSelectors((state) => selectChatsData(state) ?? initialState);
