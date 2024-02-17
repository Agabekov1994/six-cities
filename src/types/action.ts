export enum ActionType {
  ClickToFavorite = 'cart/clickToFavorite',
  InitialisationState = 'cart/init',
  SetActiveCard = 'cart/setActiveCard',
  SetCity = 'filter/setCity',
  GetOffersOnCity = 'filter/getOffersOnCity'
}

export type ClickToFavoriteAction = {
  type: ActionType.ClickToFavorite;
  payload: {
    id: number,
    isFavorite: boolean,
  };
}

export type InitialisationState = {
  type: ActionType.InitialisationState;
}

export type SetActiveCard = {
  type: ActionType.SetActiveCard;
  payload: {
    id: number,
    isActive: boolean,
  }
}

export type SetCity = {
  type: ActionType.SetCity;
  payload: {
    city: string,
  }
}

export type GetOffersOnCity = {
  type: ActionType.GetOffersOnCity;
  payload: {
    city: string,
  }
}

export type UserInfo = {
  id: number,
  email: string,
  name: string,
  avatar_url: string,
  is_pro: boolean,
}

export type Actions = ClickToFavoriteAction | InitialisationState | SetActiveCard | SetCity | GetOffersOnCity;