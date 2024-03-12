import { NameSpace } from "../../components/const";
import { UserInfo } from "../../types/action";
import { City, Offer, Room, State } from "../../types/state";

export const getLoadingStatus = (state: State): boolean => state[NameSpace.Data].isOffersDataLoading;
export const getOffers = (state: State): Offer[] => state[NameSpace.Data].offers;
export const getCity = (state: State): City => state[NameSpace.Data].city;
export const getUser = (state: State): UserInfo | null => state[NameSpace.User].user;
export const getRoom = (state: State): Room => state[NameSpace.Data].room;