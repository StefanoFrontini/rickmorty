import { Link, useLocation } from "react-router-dom";
import { StarIcon } from "@heroicons/react/24/solid";
const Character = (props) => {
  const { name, image, id } = props;
  const location = useLocation();
  const favorites = () => {
    console.log("id", id);
  };
  return (
    <Link to="modal" state={{ ...props, background: location }}>
      <article className="character">
        <img src={image} alt={name} />
        <div className="character-footer">
          <h3>{name}</h3>
          <button
            className="btn btn-primary"
            onClick={(e) => {
              e.preventDefault();
              favorites();
            }}
          >
            Add to favorites
            <StarIcon style={{ width: "20" }} />
          </button>
        </div>
      </article>
    </Link>
  );
};
export default Character;
