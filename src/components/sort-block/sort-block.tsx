import { useAppDispatch } from "../../hooks";
import { sortOffers } from "../../store/action";
import { sortTypes } from "../const";

function SortBlock() {

  const dispatch = useAppDispatch();

  let currentType = sortTypes.filter((type) => type.isCurrent)[0]?.name ?? 'Default';

  return <form className="places__sorting" action="#" method="get">
          <span className="places__sorting-caption">Sort by</span>
          <span className="places__sorting-type" tabIndex={0} onClick={(evt) => {
            const sortList = document.querySelector('.places__options--custom');
            sortList?.classList.toggle('places__options--opened');
          }}>
            {currentType}
            <svg className="places__sorting-arrow" width="7" height="4">
              <use xlinkHref="#icon-arrow-select"></use>
            </svg>
          </span>
          <ul className="places__options places__options--custom">
            {sortTypes.map((type, index) => <li key={type.name+index} className={"places__option " + (type.isCurrent && "places__option--active")} onClick={(evt) => {
              dispatch(sortOffers({sortHandler: type.sortHandler}));
              const sortList = document.querySelector('.places__options--custom');
              sortList?.classList.toggle('places__options--opened');
            }} tabIndex={0}>{type.name}</li>)}
          </ul>
        </form>
}

export default SortBlock;