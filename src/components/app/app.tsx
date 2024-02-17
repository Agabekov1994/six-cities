import React, { useState } from "react";
import Main from "../main/main";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppRoute, AuthorizationStatus } from "../const";
import ErrorRoute from "../error-route/error-route";
import Login from "../login/login";
import Favorites from "../favorites/favorites";
import Property from "../property/property";
import PrivateRoute from "../private-route/private-route";
import { useAppSelector } from "../../hooks";
import LoadingScreen from "../../pages/loading-screen";
import HistoryRouter from "../history-route/history-route";
import browserHistory from "../../browser-history";

function App(): JSX.Element {
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const isOffersDataLoading = useAppSelector((state) => state.isOffersDataLoading);

  if (authorizationStatus === AuthorizationStatus.Unknow || isOffersDataLoading) {
    return <LoadingScreen />
  }

  return <React.Fragment>
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route path={AppRoute.Main} element={<Main />} />

        <Route path={AppRoute.SignIn} element={<Login />} />

        <Route path={AppRoute.Favorites} element={
          <PrivateRoute authorizationStatus={authorizationStatus}>
            <Favorites />
          </PrivateRoute>
        } />

        <Route path={AppRoute.Room} element={<Property />} />

        <Route path='*' element={<ErrorRoute />} />
      </Routes>
    </HistoryRouter>

  </React.Fragment>
}

export default App;
