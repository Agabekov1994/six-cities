import { Offer } from "../types/state";

export enum AppRoute {
  Main = '/',
  SignIn = '/login',
  Favorites = '/favorites',
  Room = '/offer/:id',
  Error = '/error'
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknow = 'UNKNOW'
}

export enum Cities {
  PARIS = 'Paris',
  COLONGE = 'Cologne',
  BRUSSELS = 'Brussels',
  AMSTERDAM = 'Amsterdam',
  HAMBURG = 'Hamburg',
  DUSSELDORF = 'Dusseldorf'
}

export enum APIRoute {
  Offers = '/hotels',
  Offer = '/hotels/',
  Comments = '/comments/',
  Login = '/login',
  Logout = '/logout',
  Nearby = '/hotels/:id/nearby',
  Favorite = '/favorite'
}

export const sortTypes = [
  {
    name: 'Popular',
    isCurrent: true,
    sortHandler: function (offers: Offer[]) {
      return offers
    }
  },
  {
    name: 'Price: low to high',
    isCurrent: false,
    sortHandler: function (offers: Offer[]) {
      return offers.sort((a, b) => a.price - b.price);
    }
  },
  {
    name: 'Price: high to low',
    isCurrent: false,
    sortHandler: function (offers: Offer[]) {
      return offers.sort((a, b) => b.price - a.price);
    }
  },
  {
    name: 'Top rated first',
    isCurrent: false,
    sortHandler: function (offers: Offer[]) {
      return offers.sort((a, b) => b.rating - a.rating);
    }
  }
]

export const offersCount: number = 5;

export const URL_MARKER_DEFAULT: string = 'img/pin.svg';

export const URL_MARKER_CURRENT: string = 'img/pin-active.svg';

// export const TIMEOUT_SHOW_ERROR = 2000;