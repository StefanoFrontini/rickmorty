import { useNavigate, useLocation, Navigate } from "react-router-dom";
import Loading from "../components/Loading";
import Error from "../components/Error";
import { useFetchEpisode } from "../hooks/useFetchEpisode";

const CharacterDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();

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

  const getId = (str: string) => str.match(myRegex)![0];

  const episodeId = episode.map((el: string): string => getId(el));

  const url = `https://rickandmortyapi.com/api/episode/[${episodeId.toString()}]`;

  const { data, isLoading, error } = useFetchEpisode(url);

  if (isLoading) {
    return <Loading />;
  }

  if (error.msg) {
    return (
      <section className="modalDiv">
        <div className="modal">
          <div className="character-content">
            <Error {...error} />
            <div className="character-button">
              <button className="btn btn-primary" onClick={() => navigate(-1)}>
                Close
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="modalDiv">
      <div className="modal">
        <div className="character-content">
          <h2 className="section-title">{name}</h2>
          <img src={image} alt={name} />
          <div className="character-info">
            <p>
              <span className="character-data">name :</span> {name}
            </p>
            <p>
              <span className="character-data">species :</span> {species}
            </p>
            <p>
              <span className="character-data">gender :</span> {gender}
            </p>
            <p>
              <span className="character-data">location :</span> {loc.name}
            </p>
            <p>
              <span className="character-data">type :</span> {type}
            </p>
            <p>
              <span className="character-data">episodes :</span>
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
            <div className="character-button">
              <button className="btn btn-primary" onClick={() => navigate(-1)}>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default CharacterDetail;
