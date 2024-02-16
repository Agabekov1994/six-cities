import { createAction } from "@reduxjs/toolkit";
import { Offer } from "../types/state";
import { AuthorizationStatus } from "../components/const";

export const setActiveCard = createAction<{ id: number, isActive: boolean }>('card/setActiveCard');

export const setCity = createAction<{ city: string }>('card/setCity');

export const setFavoriteCard = createAction<{ id: number, isFavorite: boolean }>('card/setFavorite');

export const sortOffers = createAction<{ sortHandler: any }>('offers/sortOffers');

export const loadOffers = createAction<Offer[]>('data/loadOffers');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');

export const setError = createAction<string | null>('offers/setError');

export const setOffersDataLoadingStatus = createAction<boolean>('data/loadingOffers');