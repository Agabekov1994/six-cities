import { createSlice } from "@reduxjs/toolkit";
import { AuthorizationStatus, NameSpace } from "../../components/const";
import { UserProcess } from "../../types/state";
import { checkAuthAction, loginAction, logoutAction } from "../api-actions";
import { dropToken, saveToken } from "../../services/token";

const initialState: UserProcess = {
    authorizationStatus: AuthorizationStatus.Unknow,
    user: null,
}

export const userProcess = createSlice({
    name: NameSpace.User,
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(checkAuthAction.fulfilled, (state, action) => {
                state.authorizationStatus = AuthorizationStatus.Auth;
                state.user = action.payload;
            })
            .addCase(checkAuthAction.rejected, (state) => {
                state.authorizationStatus = AuthorizationStatus.NoAuth;
            })
            .addCase(loginAction.fulfilled, (state, action) => {
                state.authorizationStatus = AuthorizationStatus.Auth;
                saveToken(action.payload.token);
                state.user = action.payload;
            })
            .addCase(loginAction.rejected, (state) => {
                state.authorizationStatus = AuthorizationStatus.NoAuth;
            })
            .addCase(logoutAction.fulfilled, (state) => {
                state.authorizationStatus = AuthorizationStatus.NoAuth;
                dropToken();
            })
    },
});