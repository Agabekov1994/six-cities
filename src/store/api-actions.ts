import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppDispatch, Comment, Offer, State } from "../types/state";
import { AxiosInstance } from "axios";
import { APIRoute, AppRoute, AuthorizationStatus } from "../components/const";
import { loadOffers, redirectToRoute, requireAuthorization, setError, setFavoriteCard, setOffersDataLoadingStatus, setRoom, setRoomComments, setUser } from "./action";
import { AuthData } from "../types/auth-data";
import { UserData } from "../types/user-data";
import { dropToken, saveToken } from "../services/token";
import { UserInfo } from "../types/action";
import { CommentPost } from "../types/comment-post";
import { off } from "process";
import { SetStatusOffer } from "../types/set-status-offer";

export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/loadOffers',
  async (_arg, { dispatch, extra: api }) => {
    dispatch(setOffersDataLoadingStatus(true));
    const { data } = await api.get<Offer[]>(APIRoute.Offers);
    data.forEach((offer) => {
      offer.is_active = false;
      // offer.images = offer.images.map((img) => img.replace('pages.academy', 'htmlacademy.pro'));
      // offer.preview_image = offer.preview_image.replace('pages.academy', 'htmlacademy.pro');
    });
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

export const fetchOfferOnId = createAsyncThunk<void, string | undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/getOfferOnId',
  async (id, { dispatch, extra: api }) => {
    dispatch(setOffersDataLoadingStatus(true));
    const { data: offer } = await api.get<Offer>(APIRoute.Offer + id);
    const { data: comments } = await api.get<Comment[]>(APIRoute.Comments + id);
    const { data: neighOffers } = await api.get<Offer[]>(APIRoute.Nearby.replace(':id', String(id)));
    neighOffers.forEach((offer) => offer.is_active = false);
    dispatch(setOffersDataLoadingStatus(false));
    dispatch(setRoom({ offer, comments, neighOffers }));
  }
)

export const postComment = createAsyncThunk<void, CommentPost, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/postComment',
  async ({ id, comment, rating }, { dispatch, extra: api }) => {
    const { data: comments } = await api.post<Comment[]>(APIRoute.Comments + id, { comment, rating });
    dispatch(setRoomComments({ comments }));
  }
);

export const setStatusOffer = createAsyncThunk<void, SetStatusOffer, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/setStatusOffer',
  async ({ id, status }, { dispatch, extra: api }) => {
    const { data: newOffer } = await api.post<Offer>(APIRoute.Favorite + `/${id}/${Number(status)}`);
    dispatch(setFavoriteCard({ id: newOffer.id, isFavorite: newOffer.is_favorite }));
  }
);