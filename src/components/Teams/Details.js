import {
  useState,
  useEffect,
  useRouteMatch,
  useDispatch,
  useSelector,
} from "../../lib/imported";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import { getTeamById } from "../../js/TeamsSlice";
import Loader from "react-loader-spinner";

const Details = () => {
  const match = useRouteMatch("/teams/:id");

  const { id } = {
    id: match?.params.id,
  };
  const { teams, loading } = useSelector((state) => state.teams);
  const [isLoading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTeamById(id));
    setLoading(false);
  }, []);

  if (loading) return <p>Loading...</p>;
  if (isLoading) {
    return (
      <div className="loadingContainer">
        <Loader
          type="ThreeDots"
          color="#00b22d"
          height={100}
          width={100}
          //3 secs
        />
      </div>
    );
  } else {
    return (
      <div className="details">
        <div className="header">
          <h3>Know more about your favorite Team :</h3>
          <h4>&nbsp; {teams.name}</h4>
        </div>
        <Card
          style={{
            width: "20rem",
            margin: "auto",
            marginTop: "40px",
            backgroundColor: "black",
            color: "white",
          }}
          className="text-center"
        >
          <Card.Img variant="top" src={teams.image_url} />
          <Card.Body>
            <Card.Title>
              {teams.name ? (
                <>
                  <span className="slug">League :</span> {teams.name}
                </>
              ) : (
                "No Name"
              )}
            </Card.Title>
            <Card.Text>
              {teams.name ? (
                <>
                  <span className="slug">Slug :</span> {teams.slug}
                </>
              ) : (
                "No Slug"
              )}
            </Card.Text>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroupItem>
              {teams.acronym ? (
                <h5>Acronym : {teams.acronym} </h5>
              ) : (
                "No Acronym"
              )}
            </ListGroupItem>
            {teams.current_videogame ? (
              <>
                <ListGroupItem>
                  <h5>Videogame</h5>
                </ListGroupItem>
                <ListGroupItem>
                  id :{" "}
                  {teams.current_videogame.id
                    ? teams.current_videogame.id
                    : "unknown"}
                </ListGroupItem>
                <ListGroupItem>
                  Slug :{" "}
                  {teams.current_videogame.slug
                    ? teams.current_videogame.slug
                    : "unknown"}
                </ListGroupItem>
                <ListGroupItem>
                  Name :{" "}
                  {teams.current_videogame.name
                    ? teams.current_videogame.name
                    : "unknown"}
                </ListGroupItem>
              </>
            ) : (
              "No VideoGame"
            )}
            {teams.players.length ? (
              <>
                <ListGroupItem>
                  <h5>Players</h5>
                </ListGroupItem>
                <ListGroupItem>
                  {teams.players.map((player) => (
                    <div
                      style={{ display: "block", padding: "10px" }}
                      key={player.id}
                    >
                      {player.first_name || player.last_name ? (
                        <span>
                          {player.first_name} {player.last_name}
                        </span>
                      ) : (
                        "No player credentials"
                      )}
                    </div>
                  ))}
                </ListGroupItem>
              </>
            ) : (
              "No Players"
            )}
          </ListGroup>
        </Card>
      </div>
    );
  }
};

export default Details;
