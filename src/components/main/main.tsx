import React, { useEffect } from "react";
import CardOffer from "../card-offer/card-offer";
import Header from "../header/header";
import Map from "../map/map";
import Filter from "../filter/filter";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { setCity } from "../../store/action";
import SortBlock from "../sort-block/sort-block";
import { getCity, getOffers } from "../../store/data-process/selectors";



function Main() {
  const offers = useAppSelector(getOffers);
  const city = useAppSelector(getCity);

  const filteredOffers = offers.filter((offer) => offer.city.name === city.name);

  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   dispatch(setCity({ city: city.name }));
  // }, []);

  return <React.Fragment>
    <div style={{ display: "none" }}>
      <svg xmlns="http://www.w3.org/2000/svg"><symbol id="icon-arrow-select" viewBox="0 0 7 4"><path fillRule="evenodd" clipRule="evenodd" d="M0 0l3.5 2.813L7 0v1.084L3.5 4 0 1.084V0z"></path></symbol><symbol id="icon-bookmark" viewBox="0 0 17 18"><path d="M3.993 2.185l.017-.092V2c0-.554.449-1 .99-1h10c.522 0 .957.41.997.923l-2.736 14.59-4.814-2.407-.39-.195-.408.153L1.31 16.44 3.993 2.185z"></path></symbol><symbol id="icon-star" viewBox="0 0 13 12"><path fillRule="evenodd" clipRule="evenodd" d="M6.5 9.644L10.517 12 9.451 7.56 13 4.573l-4.674-.386L6.5 0 4.673 4.187 0 4.573 3.549 7.56 2.483 12 6.5 9.644z"></path></symbol></svg>
    </div>

    <div className="page page--gray page--main">
      <Header />

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>

        <Filter />

        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{filteredOffers.length} places to stay in {city.name}</b>
              <SortBlock />
              <div className="cities__places-list places__list tabs__content">

                {filteredOffers.map((offer, index) => <CardOffer key={index + offer.title} offer={offer} id={offer.id} />)}

              </div>
            </section>
            <div className="cities__right-section">
              <section className="cities__map map">
                <Map key={city.name} city={city} points={filteredOffers} selectedPoint={filteredOffers.filter((offer) => offer?.is_active === true)[0]} />
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  </React.Fragment>
}


export default Main;