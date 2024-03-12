import React from "react";
import Main from "../main/main";
import { Routes, Route } from "react-router-dom";
import { AppRoute, NameSpace } from "../const";
import ErrorRoute from "../error-route/error-route";
import Login from "../login/login";
import Favorites from "../favorites/favorites";
import Property from "../property/property";
import PrivateRoute from "../private-route/private-route";
import { useAppSelector } from "../../hooks";
import LoadingScreen from "../../pages/loading-screen";
import HistoryRouter from "../history-route/history-route";
import browserHistory from "../../browser-history";
import { getAuthCheckedStatus, getAuthorizationStatus } from "../../store/user-process/selectors";
import { getLoadingStatus } from "../../store/data-process/selectors";

function App(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isAuthChecked = useAppSelector(getAuthCheckedStatus);
  const isOffersDataLoading = useAppSelector(getLoadingStatus);

  if (!isAuthChecked || isOffersDataLoading) {
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
        <Route path={AppRoute.Error} element={<ErrorRoute />} />
      </Routes>
    </HistoryRouter>

  </React.Fragment>
}

export default App;
