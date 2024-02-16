import React from "react";
import { Link } from "react-router-dom";
import { setActiveCard } from "../../store/action";
import { useAppDispatch} from "../../hooks";

type props = {
  offer: {
    bedrooms: number,
    city: {
      location: {
        latitude: number,
        longitude: number,
        zoom: number
      },
      name: string
    },
    description: string,
    goods: string[],
    host: {
      avatar_url: string,
      id: number,
      is_pro: true,
      name: string
    },
    id: number,
    images: string[],
    is_favorite: boolean,
    is_premium: boolean,
    location: {
      latitude: number,
      longitude: number,
      zoom: number
    },
    max_adults: number,
    preview_image: string,
    price: number,
    rating: number,
    title: string,
    type: string
  },
  id:number,
}

function CardOffer(props: props) {
  const {offer, id} = props;

  const dispatch = useAppDispatch();

  return <React.Fragment>
    <article className="cities__place-card place-card" 
    onMouseEnter={() => {
      dispatch(setActiveCard({id: id, isActive: true}));
    }}
    
    onMouseLeave={() => {
      dispatch(setActiveCard({id: id, isActive: false}));
    }}>
      <div className="place-card__mark">
        <span>{offer.city.name}</span>
      </div>
      <div className="cities__image-wrapper place-card__image-wrapper">
        <a href="#">
          <img className="place-card__image" src={offer.preview_image} width="260" height="200" alt="Place image" />
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={"place-card__bookmark-button button" + (offer.is_favorite ? " place-card__bookmark-button--active" : "")} type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: (offer.rating / 5 * 100)+"%" }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={"/offer/"+offer.id}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  </React.Fragment>
}

export default CardOffer