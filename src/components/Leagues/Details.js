import {
  useState,
  useEffect,
  useRouteMatch,
  Link,
  useDispatch,
  useSelector,
} from "../../lib/imported";
import { getLeagueById } from "../../js/LeaguesSlice";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import Loader from "react-loader-spinner";

const Details = () => {
  const match = useRouteMatch("/leagues/:id");

  const { id } = {
    id: match?.params.id,
  };
  const { leagues, loading } = useSelector((state) => state.leagues);
  const [isLoading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLeagueById(id));
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
      <div>
        <div className="header">
          <h3>Know more about your favorite League :</h3>
          <h4> {leagues.name}</h4>
        </div>
        <hr />
        <Card
          style={{ width: "20rem", backgroundColor: "black", color: "white" }}
          className="text-center"
        >
          <Card.Img variant="top" src={leagues.image_url} />
          <Card.Body>
            <Card.Title>
              {leagues.name ? (
                <>
                  <span className="slug">League :</span> {leagues.name}
                </>
              ) : (
                "No Name"
              )}
            </Card.Title>
            <Card.Text>
              <div className="slug">Slug :</div>{" "}
              {leagues.slug ? leagues.slug : "No Slug"}
            </Card.Text>
          </Card.Body>
          <ListGroup className="list-group-flush">
            {leagues.series.length ? (
              <>
                <ListGroupItem>
                  <h5>Series</h5>
                </ListGroupItem>
                {leagues.series.map((sl) => (
                  <div key={sl.id}>
                    <ListGroupItem>
                      Name :{sl.full_name ? sl.full_name : "unknown"}
                    </ListGroupItem>
                    <ListGroupItem>
                      Slug :{sl.slug ? sl.slug : "unknown"}
                    </ListGroupItem>
                    <ListGroupItem>
                      Year :{sl.year ? sl.year : "unknown"}
                    </ListGroupItem>
                    <ListGroupItem>
                      Description : {sl.description ? sl.description : "noDesc"}
                    </ListGroupItem>
                    <ListGroupItem>
                      Begin at :{sl.begin_at ? sl.begin_at : "unknown"}
                    </ListGroupItem>
                    <ListGroupItem>
                      End at : {sl.end_at ? sl.end_at : "unknown"}
                    </ListGroupItem>
                    <ListGroupItem>
                      Player :{" "}
                      {sl.winner_id ? (
                        <Link to={`/teams/${sl.winner_id}`}>
                          {" "}
                          {sl.winner_id}
                        </Link>
                      ) : (
                        "unknown"
                      )}
                    </ListGroupItem>

                    <ListGroupItem style={{ borderBottom: "1px solid " }}>
                      Season : {sl.season ? sl.season : "unknown"}
                    </ListGroupItem>
                  </div>
                ))}
              </>
            ) : (
              "No Series"
            )}
            <ListGroupItem>
              <h5>Video</h5>
            </ListGroupItem>

            <ListGroupItem>
              Name :{" "}
              {leagues.videogame.name ? leagues.videogame.name : "unknown"}
            </ListGroupItem>
            <ListGroupItem>
              Slug :{" "}
              {leagues.videogame.slug ? leagues.videogame.slug : "unknown"}
            </ListGroupItem>
            <ListGroupItem>
              Year :{" "}
              {leagues.videogame.year ? leagues.videogame.year : "unknown"}
            </ListGroupItem>
            <ListGroupItem>
              Version :{" "}
              {leagues.videogame.current_version
                ? leagues.videogame.current_version
                : "unknown"}
            </ListGroupItem>
          </ListGroup>
        </Card>
      </div>
    );
  }
};

export default Details;
