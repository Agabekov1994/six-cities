import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppDispatch, Offer, State } from "../types/state";
import { AxiosInstance } from "axios";
import { APIRoute, AppRoute, AuthorizationStatus } from "../components/const";
import { loadOffers, redirectToRoute, requireAuthorization, setOffersDataLoadingStatus, setUser } from "./action";
import { AuthData } from "../types/auth-data";
import { UserData } from "../types/user-data";
import { dropToken, saveToken } from "../services/token";
import { UserInfo } from "../types/action";

export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/loadOffers',
  async (_arg, { dispatch, extra: api }) => {
    dispatch(setOffersDataLoadingStatus(true));
    const { data } = await api.get<Offer[]>(APIRoute.Offers);
    data.forEach((offer) => offer.is_active = false);
    dispatch(setOffersDataLoadingStatus(false));
    dispatch(loadOffers(data));
  }
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/checkAuth',
  async (_arg, { dispatch, extra: api }) => {
    try {
      await api.get<UserInfo>(APIRoute.Login)
        .then((response) => {
          dispatch(requireAuthorization(AuthorizationStatus.Auth));
          dispatch(setUser(response.data));
        });
    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth))
    }
  }
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/login',
  async ({ login: email, password }, { dispatch, extra: api }) => {
    const { data } = await api.post<UserData & UserInfo>(APIRoute.Login, { email, password });
    saveToken(data.token);
    dispatch(setUser(data));
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    dispatch(redirectToRoute(AppRoute.Favorites));
  }
);


export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/logout',
  async (_arg, { dispatch, extra: api }) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    dispatch(redirectToRoute(AppRoute.Main));
  }
)