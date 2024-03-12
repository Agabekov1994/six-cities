import { createAction } from "@reduxjs/toolkit";
import { Comment, Offer } from "../types/state";
import { AppRoute, AuthorizationStatus } from "../components/const";
import { UserInfo } from "../types/action";

export const setActiveCard = createAction<{ id: number, isActive: boolean, isNeigh: boolean }>('DATA/setActiveCard');

export const setCity = createAction<{ city: string }>('DATA/setCity');

export const setFavoriteCard = createAction<{ id: number, isFavorite: boolean }>('DATA/setFavorite');

export const sortOffers = createAction<{ sortHandler: any }>('DATA/sortOffers');

export const loadOffers = createAction<Offer[]>('DATA/loadOffers');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');

export const setError = createAction<string | null>('DATA/setError');

export const setOffersDataLoadingStatus = createAction<boolean>('DATA/loadingOffers');

export const redirectToRoute = createAction<AppRoute>('app/redirectToRoute');

export const setUser = createAction<UserInfo>('user/setUserInfo');

export const setRoom = createAction<{ offer: Offer, comments: Comment[], neighOffers: Offer[] }>('DATA/setRoom');

export const setRoomComments = createAction<{ comments: Comment[] }>('DATA/setRoomComments');