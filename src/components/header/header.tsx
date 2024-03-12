import React from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { AppRoute, AuthorizationStatus } from "../const";
import { logoutAction } from "../../store/api-actions";
import { getUser } from "../../store/data-process/selectors";
import { getAuthorizationStatus } from "../../store/user-process/selectors";

function Header() {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const user = useAppSelector(getUser);
  const dispatch = useAppDispatch();

  return <React.Fragment>
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className="header__logo-link" to="/">
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
            </Link>
          </div>
          <nav className="header__nav">
            {authorizationStatus === AuthorizationStatus.Auth ? <ul className="header__nav-list">
              <li className="header__nav-item user">
                <Link className="header__nav-link header__nav-link--profile" to="/favorites/">
                  <div className="header__avatar-wrapper user__avatar-wrapper">
                    <img className="user__avatar" src={String(user?.avatar_url)} />
                  </div>
                  <span className="header__user-name user__name">{user?.email}</span>
                </Link>
              </li>
              <li className="header__nav-item">
                <a className="header__nav-link" href="#" onClick={(evt) => {
                  evt.preventDefault();
                  dispatch(logoutAction());
                }} >
                  <span className="header__signout">Sign out</span>
                </a>
              </li>
            </ul> :
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <Link className="header__nav-link header__nav-link--profile" to={AppRoute.SignIn}>
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__login">Sign in</span>
                  </Link>
                </li>
              </ul>}

          </nav>
        </div>
      </div>
    </header>
  </React.Fragment>
}

export default Header;