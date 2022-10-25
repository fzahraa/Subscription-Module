import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import {
    subscriptionCreationThunkEn,
    showSubscriptionThunkEn
} from './subscriptionPackageThunk';

const initialState = {
    subs: null,
    blogpost: null,
    messages: null,
    likes: null,
    isLoading: false,
    isLoadingMessages: false,
    isLoadingLikes: false,
    isSuccess: false,
    isSuccessMessages: false,
    isSuccessLikes: false,
};

export const subscriptionCreationEn = createAsyncThunk('subscription/createSubscriptionEn', subscriptionCreationThunkEn);
export const getAllSubscriptionsEn = createAsyncThunk('subscription/getAllSubscriptionsEn', showSubscriptionThunkEn);

const subscriptionSlice = createSlice({
    name: 'subscription',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
        }
    },
    extraReducers: {

        [subscriptionCreationEn.pending]: (state) => {
            state.isLoading = true;
        },
        [subscriptionCreationEn.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.isSuccess = true;

        },
        [subscriptionCreationEn.rejected]: (state, { payload }) => {
            state.isLoading = false;
            toast.error(payload);
        },

        [getAllSubscriptionsEn.pending]: (state) => {
            state.isLoading = true;
        },
        [getAllSubscriptionsEn.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.subs = payload;
        },
        [getAllSubscriptionsEn.rejected]: (state, { payload }) => {
            state.isLoading = false;
            toast.error(payload);
        },

    }
});
export const { reset } = subscriptionSlice.actions;
export default subscriptionSlice.reducer;