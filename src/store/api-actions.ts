import { createAsyncThunk } from "@reduxjs/toolkit";

export fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch
}>