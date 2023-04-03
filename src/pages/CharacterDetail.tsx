import { useNavigate, useLocation, Navigate } from "react-router-dom";
import Loading from "../components/Loading";
import { useFetchEpisode } from "../hooks/useFetchEpisode";

const CharacterDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);
  if (!location.state) {
    return <Navigate to="/" />;
  }
  const {
    image,
    name,
    species,
    gender,
    location: loc,
    type,
    episode,
  } = location.state;

  const myRegex = /[1-9]+/;

  const getId = (str: string) => {
    return str.match(myRegex)![0];
  };

  const episodeId = episode.map((el: string): string => getId(el));

  const url = `https://rickandmortyapi.com/api/episode/[${episodeId.toString()}]`;

  const { data, isLoading, error: errorData } = useFetchEpisode(url);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section className="modalDiv">
      <div className="modal">
        <h2 className="section-title">{name}</h2>
        <div className="img-container">
          <img src={image} alt={name} />
        </div>
        <div className="drink-info">
          <p>
            <span className="drink-data">name :</span> {name}
          </p>
          <p>
            <span className="drink-data">species :</span> {species}
          </p>
          <p>
            <span className="drink-data">gender :</span> {gender}
          </p>
          <p>
            <span className="drink-data">location :</span> {loc.name}
          </p>
          <p>
            <span className="drink-data">type :</span> {type}
          </p>
          <p>
            <span className="drink-data">episodes :</span>
            {data &&
              data.map((item, index) => {
                return item ? (
                  <span key={index}>
                    {" "}
                    {item.name} {index === data.length - 1 ? "" : " - "}{" "}
                  </span>
                ) : null;
              })}
          </p>
          <button className="btn btn-primary" onClick={() => navigate(-1)}>
            Close
          </button>
        </div>
      </div>
    </section>
  );
};
export default CharacterDetail;
