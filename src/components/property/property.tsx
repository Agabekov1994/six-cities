import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../header/header";
import ErrorRoute from "../error-route/error-route";
import { AuthorizationStatus } from "../const";
import Map from "../map/map";
import { useAppDispatch, useAppSelector } from "../../hooks";
import CardOffer from "../card-offer/card-offer";
import { setFavoriteCard } from "../../store/action";
import LoadingScreen from "../../pages/loading-screen";
import { fetchOfferOnId, postComment, setStatusOffer } from "../../store/api-actions";
import NearPlacesCard from "./near-places-card";

function Property() {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const { offers, authorizationStatus, isOffersDataLoading, room } = useAppSelector((state) => state);
  const offer = room.offer;
  const commentsOnRoom = room.comments;
  const offersNeigh = room.neighOffers;
  // const offersNeigh = offers.filter((offerItem) => offerItem.city.name === offer?.city.name);

  if (!id) {
    return <ErrorRoute />
  }

  if (!offer || offer.id !== Number(id)) {
    dispatch(fetchOfferOnId(id));
  }

  const [reviewForm, setReviewForm] = useState({
    comment: "",
    rating: 0
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);



  if (authorizationStatus === AuthorizationStatus.Unknow || isOffersDataLoading) {
    return <LoadingScreen />
  }

  if (!offer) {
    return <LoadingScreen />
  }

  return <React.Fragment>
    <div style={{ display: "none" }}>
      <svg xmlns="http://www.w3.org/2000/svg"><symbol id="icon-arrow-select" viewBox="0 0 7 4"><path fillRule="evenodd" clipRule="evenodd" d="M0 0l3.5 2.813L7 0v1.084L3.5 4 0 1.084V0z"></path></symbol><symbol id="icon-bookmark" viewBox="0 0 17 18"><path d="M3.993 2.185l.017-.092V2c0-.554.449-1 .99-1h10c.522 0 .957.41.997.923l-2.736 14.59-4.814-2.407-.39-.195-.408.153L1.31 16.44 3.993 2.185z"></path></symbol><symbol id="icon-star" viewBox="0 0 13 12"><path fillRule="evenodd" clipRule="evenodd" d="M6.5 9.644L10.517 12 9.451 7.56 13 4.573l-4.674-.386L6.5 0 4.673 4.187 0 4.573 3.549 7.56 2.483 12 6.5 9.644z"></path></symbol></svg>
    </div>

    <div className="page">
      <Header />

      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {offer.images.map((img) =>
                <div className="property__image-wrapper">
                  <img className="property__image" src={img} alt="Photo studio" />
                </div>)}
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              {offer.is_premium ? <div className="property__mark">
                <span>Premium</span>
              </div> : null}
              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {offer.title}
                </h1>
                <button onClick={() => {
                  dispatch(setStatusOffer({ id: offer.id, status: !offer.is_favorite }));
                }} className={"property__bookmark-button button" + (offer.is_favorite ? " property__bookmark-button--active" : "")} type="button">
                  <svg className="property__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{ width: (offer.rating / 5 * 100) + "%" }}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{offer.rating}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {offer.type}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {offer.bedrooms} Bedrooms
                </li>
                <li className="property__feature property__feature--adults">
                  Max {offer.max_adults} adults
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{offer.price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {offer.goods.map((good, index) => <li key={index} className="property__inside-item">
                    {good}
                  </li>)}
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                    <img className="property__avatar user__avatar" src={offer.host.avatar_url} width="74" height="74" alt="Host avatar" />
                  </div>
                  <span className="property__user-name">
                    {offer.host.name}
                  </span>
                  {offer.host.is_pro ? <span className="property__user-status">
                    Pro
                  </span> : null}
                </div>
                <div className="property__description">
                  <p className="property__text">
                    {offer.description}
                  </p>
                </div>
              </div>

              {commentsOnRoom.length ?
                <section className="property__reviews reviews">
                  <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{commentsOnRoom.length}</span></h2>
                  <ul className="reviews__list">
                    {commentsOnRoom.map((comment) => <li className="reviews__item">
                      <div className="reviews__user user">
                        <div className="reviews__avatar-wrapper user__avatar-wrapper">
                          <img className="reviews__avatar user__avatar" src={comment.user.avatar_url} width="54" height="54" alt="Reviews avatar" />
                        </div>
                        <span className="reviews__user-name">
                          {comment.user.name}
                        </span>
                      </div>
                      <div className="reviews__info">
                        <div className="reviews__rating rating">
                          <div className="reviews__stars rating__stars">
                            <span style={{ width: (comment.rating / 5 * 100) }}></span>
                            <span className="visually-hidden">Rating</span>
                          </div>
                        </div>
                        <p className="reviews__text">
                          {comment.comment}
                        </p>
                        <time className="reviews__time" dateTime={(new Date(comment.date).toISOString().split('T')[0])}>{(new Date(comment.date).toLocaleString('en-US', { month: 'short', year: 'numeric' }))}</time>
                      </div>
                    </li>)}
                  </ul>

                  {authorizationStatus === AuthorizationStatus.Auth ? <form className="reviews__form form" onSubmit={(evt) => {
                    evt.preventDefault();
                    dispatch(postComment({ id, ...reviewForm }));
                  }}>
                    <label className="reviews__label form__label" htmlFor="review">Your review</label>
                    <div className="reviews__rating-form form__rating" onChange={(evt) => {
                      setReviewForm({ ...reviewForm, rating: Number((evt.target as HTMLInputElement).value) });
                    }}>
                      <input className="form__rating-input visually-hidden" name="rating" value="5" id="5-stars" type="radio" />
                      <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
                        <svg className="form__star-image" width="37" height="33">
                          <use xlinkHref="#icon-star"></use>
                        </svg>
                      </label>

                      <input className="form__rating-input visually-hidden" name="rating" value="4" id="4-stars" type="radio" />
                      <label htmlFor="4-stars" className="reviews__rating-label form__rating-label" title="good">
                        <svg className="form__star-image" width="37" height="33">
                          <use xlinkHref="#icon-star"></use>
                        </svg>
                      </label>

                      <input className="form__rating-input visually-hidden" name="rating" value="3" id="3-stars" type="radio" />
                      <label htmlFor="3-stars" className="reviews__rating-label form__rating-label" title="not bad">
                        <svg className="form__star-image" width="37" height="33">
                          <use xlinkHref="#icon-star"></use>
                        </svg>
                      </label>

                      <input className="form__rating-input visually-hidden" name="rating" value="2" id="2-stars" type="radio" />
                      <label htmlFor="2-stars" className="reviews__rating-label form__rating-label" title="badly">
                        <svg className="form__star-image" width="37" height="33">
                          <use xlinkHref="#icon-star"></use>
                        </svg>
                      </label>

                      <input className="form__rating-input visually-hidden" name="rating" value="1" id="1-star" type="radio" />
                      <label htmlFor="1-star" className="reviews__rating-label form__rating-label" title="terribly">
                        <svg className="form__star-image" width="37" height="33">
                          <use xlinkHref="#icon-star"></use>
                        </svg>
                      </label>
                    </div>
                    <textarea className="reviews__textarea form__textarea" id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved" defaultValue={reviewForm.comment} onChange={(evt) => {
                      setReviewForm({ ...reviewForm, comment: (evt.target as HTMLTextAreaElement).value });
                    }}></textarea>
                    <div className="reviews__button-wrapper">
                      <p className="reviews__help">
                        To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
                      </p>
                      <button className="reviews__submit form__submit button" type="submit">Submit</button>
                    </div>
                  </form> : null}

                </section> : null}

            </div>
          </div>

          <section className="property__map map">
            <Map key={offer.city.name} city={offer.city} points={offersNeigh} selectedPoint={offersNeigh.filter((offer) => offer.is_active === true)[0]} />
          </section>

        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">

              {offersNeigh.map((offer, index) => <NearPlacesCard key={index + offer.title} offer={offer} id={offer.id} />)}

            </div>
          </section>
        </div>
      </main>
    </div>
  </React.Fragment>
}

export default Property;