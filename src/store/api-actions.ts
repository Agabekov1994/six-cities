import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppDispatch, Comment, DataResposeProperty, Offer, State } from "../types/state";
import { AxiosInstance } from "axios";
import { APIRoute, AppRoute } from "../components/const";
import { redirectToRoute } from "./action";
import { AuthData } from "../types/auth-data";
import { UserData } from "../types/user-data";
import { UserInfo } from "../types/action";
import { CommentPost } from "../types/comment-post";
import { SetStatusOffer } from "../types/set-status-offer";

export const fetchOffersAction = createAsyncThunk<Offer[], undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/loadOffers',
  async (_arg, { dispatch, extra: api }) => {

    const { data } = await api.get<Offer[]>(APIRoute.Offers);
    data.forEach((offer) => {
      offer.is_active = false;
    });
    return data;
  }
);

export const checkAuthAction = createAsyncThunk<UserInfo, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/checkAuth',
  async (_arg, { dispatch, extra: api }) => {
    const { data } = await api.get<UserInfo>(APIRoute.Login)
    return data;
  }
);

export const loginAction = createAsyncThunk<UserData & UserInfo, AuthData, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/login',
  async ({ login: email, password }, { dispatch, extra: api }) => {
    const { data } = await api.post<UserData & UserInfo>(APIRoute.Login, { email, password });

    dispatch(redirectToRoute(AppRoute.Favorites));
    return data;
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
    dispatch(redirectToRoute(AppRoute.Main));
  }
)

export const fetchOfferOnId = createAsyncThunk<DataResposeProperty, string | undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/getOfferOnId',
  async (id, { dispatch, extra: api }) => {

    const { data: offer } = await api.get<Offer>(APIRoute.Offer + id);
    const { data: comments } = await api.get<Comment[]>(APIRoute.Comments + id);
    const { data: neighOffers } = await api.get<Offer[]>(APIRoute.Nearby.replace(':id', String(id)));
    neighOffers.forEach((offer) => offer.is_active = false);

    return { offer, comments, neighOffers };
  }
)

export const postComment = createAsyncThunk<Comment[], CommentPost, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/postComment',
  async ({ id, comment, rating }, { dispatch, extra: api }) => {
    const { data: comments } = await api.post<Comment[]>(APIRoute.Comments + id, { comment, rating });
    return comments;
  }
);

export const setStatusOffer = createAsyncThunk<SetStatusOffer, SetStatusOffer, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/setStatusOffer',
  async ({ id, status }, { dispatch, extra: api }) => {
    const { data: newOffer } = await api.post<Offer>(APIRoute.Favorite + `/${id}/${Number(status)}`);
    return { id: newOffer.id, status: newOffer.is_favorite };
  }
);