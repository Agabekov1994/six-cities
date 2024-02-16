import { InitState, State } from "../types/state";
import { createReducer } from "@reduxjs/toolkit";
import { loadOffers, requireAuthorization, setActiveCard, setCity, setFavoriteCard, sortOffers } from "./action";
import { AuthorizationStatus } from "../components/const";

// const initialState: InitState = {
//   city: {
//     location: {
//       latitude: 52.370216,
//       longitude: 4.895168,
//       zoom: 10
//     },
//     name: 'Amsterdam'
//   },
//   offers: [
//     {
//       id_card: 1,
//       is_active: false,
//       bedrooms: 3,
//       city: {
//         location: {
//           latitude: 52.370216,
//           longitude: 4.895168,
//           zoom: 10
//         },
//         name: 'Amsterdam'
//       },
//       description: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
//       goods: ["Heating", "Kitchen", "Cable TV", "Washing machine", "Coffee machine", "Dishwasher"],
//       host: {
//         avatar_url: "img/avatar-angelina.jpg",
//         id: 3,
//         is_pro: true,
//         name: "Angelina"
//       },
//       id: 0,
//       images: ["img/room.jpg", "img/apartment-01.jpg"],
//       is_favorite: true,
//       is_premium: false,
//       location: {
//         latitude: 52.3909553943508,
//         longitude: 4.85309666406198,
//         zoom: 8
//       },
//       max_adults: 4,
//       preview_image: "img/apartment-01.jpg",
//       price: 110,
//       rating: 2.8,
//       title: "Beautiful & luxurious studio at great location1",
//       type: "apartment"
//     },
//     {
//       id_card: 2,
//       is_active: false,
//       bedrooms: 3,
//       city: {
//         location: {
//           latitude: 52.370216,
//           longitude: 4.895168,
//           zoom: 10
//         },
//         name: 'Cologne'
//       },
//       description: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
//       goods: ["Heating", "Kitchen", "Cable TV", "Washing machine", "Coffee machine", "Dishwasher"],
//       host: {
//         avatar_url: "img/avatar-angelina.jpg",
//         id: 3,
//         is_pro: true,
//         name: "Angelina"
//       },
//       id: 1,
//       images: ["img/room.jpg", "img/apartment-01.jpg"],
//       is_favorite: true,
//       is_premium: false,
//       location: {
//         latitude: 52.15514938496371,
//         longitude: 4.173877537499941,
//         zoom: 8
//       },
//       max_adults: 4,
//       preview_image: "img/apartment-01.jpg",
//       price: 100,
//       rating: 1.8,
//       title: "Beautiful & luxurious studio at great location2",
//       type: "apartment"
//     },
//     {
//       id_card: 3,
//       is_active: false,
//       bedrooms: 3,
//       city: {
//         location: {
//           latitude: 52.370216,
//           longitude: 4.895168,
//           zoom: 10
//         },
//         name: 'Dusseldorf'
//       },
//       description: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
//       goods: ["Heating", "Kitchen", "Cable TV", "Washing machine", "Coffee machine", "Dishwasher"],
//       host: {
//         avatar_url: "img/avatar-angelina.jpg",
//         id: 3,
//         is_pro: true,
//         name: "Angelina"
//       },
//       id: 2,
//       images: ["img/room.jpg", "img/apartment-01.jpg"],
//       is_favorite: true,
//       is_premium: false,
//       location: {
//         latitude: 52.35514938496378,
//         longitude: 4.673877537499948,
//         zoom: 8
//       },
//       max_adults: 4,
//       preview_image: "img/apartment-01.jpg",
//       price: 140,
//       rating: 3.8,
//       title: "Beautiful & luxurious studio at great location3",
//       type: "apartment"
//     },
//     {
//       id_card: 4,
//       is_active: false,
//       bedrooms: 3,
//       city: {
//         location: {
//           latitude: 52.370216,
//           longitude: 4.895168,
//           zoom: 10
//         },
//         name: 'Amsterdam'
//       },
//       description: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
//       goods: ["Heating", "Kitchen", "Cable TV", "Washing machine", "Coffee machine", "Dishwasher"],
//       host: {
//         avatar_url: "img/avatar-angelina.jpg",
//         id: 3,
//         is_pro: true,
//         name: "Angelina"
//       },
//       id: 3,
//       images: ["img/room.jpg", "img/apartment-01.jpg"],
//       is_favorite: true,
//       is_premium: false,
//       location: {
//         latitude: 52.369553943508,
//         longitude: 4.85309666406198,
//         zoom: 8
//       },
//       max_adults: 4,
//       preview_image: "img/apartment-01.jpg",
//       price: 20,
//       rating: 4.0,
//       title: "Beautiful & luxurious studio at great location4",
//       type: "apartment"
//     },
//     {
//       id_card: 5,
//       is_active: false,
//       bedrooms: 3,
//       city: {
//         location: {
//           latitude: 52.370216,
//           longitude: 4.895168,
//           zoom: 10
//         },
//         name: 'Amsterdam'
//       },
//       description: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
//       goods: ["Heating", "Kitchen", "Cable TV", "Washing machine", "Coffee machine", "Dishwasher"],
//       host: {
//         avatar_url: "img/avatar-angelina.jpg",
//         id: 3,
//         is_pro: true,
//         name: "Angelina"
//       },
//       id: 4,
//       images: ["img/room.jpg", "img/apartment-01.jpg"],
//       is_favorite: false,
//       is_premium: true,
//       location: {
//         latitude: 52.3909553943508,
//         longitude: 4.929309666406198,
//         zoom: 8
//       },
//       max_adults: 4,
//       preview_image: "img/apartment-01.jpg",
//       price: 10,
//       rating: 4.2,
//       title: "Beautiful & luxurious studio at great location5",
//       type: "apartment"
//     }
//   ],
//   authorizationStatus: AuthorizationStatus.Unknow,
// }

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
  authorizationStatus: AuthorizationStatus.Unknow
}

const getIndexFromMockArray = (state: State, id: number): number => state.offers.findIndex((offer) => offer.id === id);

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setActiveCard, (state, action) => {
      state.offers[getIndexFromMockArray(state, action.payload.id)] = { ...state.offers[getIndexFromMockArray(state, action.payload.id)], is_active: action.payload.isActive }
    })
    .addCase(setCity, (state, action) => {
      state.city.name = action.payload.city;
    })
    .addCase(setFavoriteCard, (state, action) => {
      state.offers[getIndexFromMockArray(state, action.payload.id)] = { ...state.offers[getIndexFromMockArray(state, action.payload.id)], is_favorite: action.payload.isFavorite }
    })
    .addCase(sortOffers, (state, action) => {
      state.offers = action.payload.sortHandler([...state.offers]);
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
})

export { reducer };