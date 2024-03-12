import { createSlice } from "@reduxjs/toolkit";
import { DataProcess, Offer } from "../../types/state";
import { NameSpace } from "../../components/const";
import { fetchOfferOnId, fetchOffersAction, postComment, setStatusOffer } from "../api-actions";

export const initialState: DataProcess = {
    city: {
        location: {
            latitude: 52.370216,
            longitude: 4.895168,
            zoom: 10
        },
        name: 'Amsterdam'
    },
    offers: [],
    error: null,
    isOffersDataLoading: false,
    room: {
        offer: null,
        comments: [],
        neighOffers: []
    },
}

const getIndexFromArray = (offers: typeof initialState.offers, id: number): number => offers.findIndex((offer) => offer.id === id);
let defaultOffers: Offer[] = [];

export const dataProcess = createSlice({
    name: NameSpace.Data,
    initialState,
    reducers: {
        setActiveCard: (state, action) => {
            if (action.payload.isNeigh) {
                state.room.neighOffers[getIndexFromArray(state.room.neighOffers, action.payload.id)] = { ...state.room.neighOffers[getIndexFromArray(state.room.neighOffers, action.payload.id)], is_active: action.payload.isActive }
            } else {
                state.offers[getIndexFromArray(state.offers, action.payload.id)] = { ...state.offers[getIndexFromArray(state.offers, action.payload.id)], is_active: action.payload.isActive }
            }
        },
        setCity: (state, action) => {
            console.log('setCity');
            console.log('action.payload' + action.payload);
            const newCity = state.offers.find((offer) => offer.city.name === action.payload.city);
            state.city = newCity?.city || initialState.city;
        },
        sortOffers: (state, action) => {
            state.offers = action.payload.sortHandler([...defaultOffers]);
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchOffersAction.pending, (state) => {
                state.isOffersDataLoading = true;
            })
            .addCase(fetchOffersAction.fulfilled, (state, action) => {
                state.isOffersDataLoading = false;
                defaultOffers = [...action.payload];
                state.offers = action.payload;
            })
            .addCase(fetchOfferOnId.pending, (state) => {
                state.isOffersDataLoading = true;
            })
            .addCase(fetchOfferOnId.fulfilled, (state, action) => {
                state.isOffersDataLoading = false;
                state.room.offer = { ...action.payload.offer };
                state.room.comments = [...action.payload.comments];
                state.room.neighOffers = [...action.payload.neighOffers];
            })
            .addCase(postComment.fulfilled, (state, action) => {
                state.room.comments = [...action.payload];
            })
            .addCase(setStatusOffer.fulfilled, (state, action) => {
                state.offers[getIndexFromArray(state.offers, action.payload.id)] = { ...state.offers[getIndexFromArray(state.offers, action.payload.id)], is_favorite: action.payload.status }
                if (state.room.offer) {
                    state.room.offer = { ...state.room.offer, is_favorite: action.payload.status };
                }
            })
    },
});