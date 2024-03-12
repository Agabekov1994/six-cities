import { useAppDispatch, useAppSelector } from "../../hooks";
import { setCity } from "../../store/action";
import { getCity } from "../../store/data-process/selectors";
import { Cities } from "../const"
import { Link } from "react-router-dom";

const cities = Object.values(Cities);

function Filter() {
  const city = useAppSelector(getCity);
  const dispatch = useAppDispatch();

  return <div className="tabs">
    <section className="locations container">
      <ul className="locations__list tabs__list">

        {cities.map((item, index) => {
          return <li key={index + item} className="locations__item">
            <Link className={"locations__item-link tabs__item" + (city.name === item ? " tabs__item--active" : "")} onClick={(evt) => {
              evt.preventDefault();
              dispatch(setCity({ city: item }));
            }} to="/">
              <span>{item}</span>
            </Link>
          </li>
        })}
      </ul>
    </section>
  </div>
}

export default Filter