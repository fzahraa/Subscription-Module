import { customFetch, customFetchProfile } from '../../utils/axios';
import { checkStatus, checkError } from '../../utils/helpers';

export const subscriptionCreationThunkEn = async (subscription, thunkAPI) => {
    try {
        const resp = await customFetchProfile.post('/subscription/createSubscriptionEn', subscription);
        if (checkStatus(resp)) { return thunkAPI.rejectWithValue(resp.data.message); }
        return resp.data;
    } catch (error) {
        const message = checkError(error);
        return thunkAPI.rejectWithValue(message);
    }
};

export const showSubscriptionThunkEn = async (thunkAPI) => {
    try {
        const resp = await customFetch.get('/subscription/getAllSubscriptionsEn');
        if (checkStatus(resp)) { return thunkAPI.rejectWithValue(resp.data.message); }
        return resp.data;
    } catch (error) {
        const message = checkError(error);
        return thunkAPI.rejectWithValue(message);
    }
};