import { Link, useLocation } from "react-router-dom";
import { StarIcon } from "@heroicons/react/24/solid";
import { useDataContext } from "../context/context";
import type { Character } from "rickmortyapi";

const Character: React.FC<Character> = (props) => {
  const { toggleFavorites, favoritesDB } = useDataContext();
  const { name, image, id } = props;
  const location = useLocation();
  const handleChange = () => {
    toggleFavorites(props);
  };
  return (
    <Link to="character-detail" state={{ ...props, background: location }}>
      <article className="character">
        <img src={image} alt={name} />
        <div className="character-footer">
          <h3>{name}</h3>
          <button
            className={
              favoritesDB.has(id) ? "btn btn-favorite" : "btn btn-primary"
            }
            onClick={(e) => {
              e.preventDefault();
              handleChange();
            }}
          >
            <span>like</span> <StarIcon className="star-icon" />
          </button>
        </div>
      </article>
    </Link>
  );
};
export default Character;
