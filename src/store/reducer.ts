import { InitState, Offer, State } from "../types/state";
import { createReducer } from "@reduxjs/toolkit";
import { loadOffers, requireAuthorization, setActiveCard, setCity, setError, setFavoriteCard, setOffersDataLoadingStatus, setRoom, setRoomComments, setUser, sortOffers } from "./action";
import { AuthorizationStatus } from "../components/const";

const initialState: InitState = {
  city: {
    location: {
      latitude: 52.370216,
      longitude: 4.895168,
      zoom: 10
    },
    name: 'Amsterdam'
  },
  offers: [],
  authorizationStatus: AuthorizationStatus.Unknow,
  error: null,
  isOffersDataLoading: false,
  user: null,
  room: {
    offer: null,
    comments: [],
    neighOffers: []
  },
}

let defaultOffers: Offer[] = [];

const getIndexFromArray = (offers: typeof initialState.offers, id: number): number => offers.findIndex((offer) => offer.id === id);

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setActiveCard, (state, action) => {
      if (action.payload.isNeigh) {
        state.room.neighOffers[getIndexFromArray(state.room.neighOffers, action.payload.id)] = { ...state.room.neighOffers[getIndexFromArray(state.room.neighOffers, action.payload.id)], is_active: action.payload.isActive }
      } else {
        state.offers[getIndexFromArray(state.offers, action.payload.id)] = { ...state.offers[getIndexFromArray(state.offers, action.payload.id)], is_active: action.payload.isActive }
      }
    })
    .addCase(setCity, (state, action) => {
      const newCity = state.offers.find((offer) => offer.city.name === action.payload.city);
      state.city = newCity?.city || initialState.city;
    })
    .addCase(setFavoriteCard, (state, action) => {
      state.offers[getIndexFromArray(state.offers, action.payload.id)] = { ...state.offers[getIndexFromArray(state.offers, action.payload.id)], is_favorite: action.payload.isFavorite }
      if (state.room.offer) {
        state.room.offer = { ...state.room.offer, is_favorite: action.payload.isFavorite };
      }
    })
    .addCase(sortOffers, (state, action) => {
      state.offers = action.payload.sortHandler([...defaultOffers]);
    })
    .addCase(loadOffers, (state, action) => {
      defaultOffers = [...action.payload];
      state.offers = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    })
    .addCase(setOffersDataLoadingStatus, (state, action) => {
      state.isOffersDataLoading = action.payload;
    })
    .addCase(setUser, (state, action) => {
      state.user = action.payload;
    })
    .addCase(setRoom, (state, action) => {
      state.room.offer = { ...action.payload.offer };
      state.room.comments = [...action.payload.comments];
      state.room.neighOffers = [...action.payload.neighOffers];
    })
    .addCase(setRoomComments, (state, action) => {
      state.room.comments = [...action.payload.comments]
    })
})


export { reducer };