import React, { useState } from "react";
import Main from "../main/main";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppRoute, AuthorizationStatus } from "../const";
import ErrorRoute from "../error-route/error-route";
import Login from "../login/login";
import Favorites from "../favorites/favorites";
import Property from "../property/property";
import PrivateRoute from "../private-route/private-route";

function App(): JSX.Element {

  return <React.Fragment>
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Main} element={<Main />} />

        <Route path={AppRoute.SignIn} element={<Login />} />

        <Route path={AppRoute.Favorites} element={
          <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
            <Favorites />
          </PrivateRoute>
        } />

        <Route path={AppRoute.Room} element={<Property />} />

        <Route path='*' element={<ErrorRoute />} />
      </Routes>
    </BrowserRouter>
    
  </React.Fragment>
}

export default App;
