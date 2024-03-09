import { AuthorizationStatus } from "../components/const"
import { store } from "../store"
import { UserInfo } from "./action"

export type City = {
  location: {
    latitude: number,
    longitude: number,
    zoom: number
  },
  name: string
}

export type User = {
  login: string,
  avatar: string,
}

export type Offer = {
  id_card: number,
  is_active: boolean,
  bedrooms: number,
  city: City,
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
  user: UserInfo | null,
  room: {
    offer: Offer | null,
    comments: Comment[] | [],
    neighOffers: Offer[] | []
  }
}

export type Comment = {
  "comment": string,
  "date": string,
  "id": number,
  "rating": number,
  "user": {
    "avatar_url": string,
    "id": number,
    "is_pro": boolean,
    "name": string
  }
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

