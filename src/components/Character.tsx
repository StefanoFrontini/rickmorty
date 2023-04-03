import { Link, useLocation } from "react-router-dom";
import { StarIcon } from "@heroicons/react/24/solid";
import { useDataContext } from "../context/context";
const Character = (props) => {
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
            // className="btn btn-primary"
            className={
              favoritesDB.has(id) ? "btn btn-favorite" : "btn btn-primary"
            }
            onClick={(e) => {
              e.preventDefault();
              handleChange();
            }}
          >
            <span>
              {favoritesDB.has(id) ? "remove from" : "add to"} favorites
            </span>{" "}
            <StarIcon style={{ width: "30", verticalAlign: "middle" }} />
          </button>
        </div>
      </article>
    </Link>
  );
};
export default Character;
