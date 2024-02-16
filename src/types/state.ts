import { AuthorizationStatus } from "../components/const"
import { store } from "../store"

export type Offer = {
  id_card: number,
  is_active: boolean,
  bedrooms: number,
  city: {
    location: {
      latitude: number,
      longitude: number,
      zoom: number
    },
    name: string
  },
  description: string,
  goods: string[],
  host: {
    avatar_url: string,
    id: number,
    is_pro: true,
    name: string
  },
  id: number,
  images: string[],
  is_favorite: boolean,
  is_premium: boolean,
  location: {
    latitude: number,
    longitude: number,
    zoom: number
  },
  max_adults: number,
  preview_image: string,
  price: number,
  rating: number,
  title: string,
  type: string
}

export type InitState = {
  city: {
    location: {
      latitude: number,
      longitude: number,
      zoom: number
    },
    name: string
  },
  offers: Offer[],
  authorizationStatus: AuthorizationStatus,
  error: string | null,
  isOffersDataLoading: boolean,
}

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

