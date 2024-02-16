import { TypedUseSelectorHook, useDispatch } from "react-redux";
import { AppDispatch, State } from "../types/state";
import { useSelector } from "react-redux";

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<State> = useSelector