import Table from "react-bootstrap/Table";
import { Link, useDispatch } from "../../lib/imported";
import { getLeagueById } from "../../js/LeaguesSlice";

const Item = ({ leagues }) => {
  const dispatch = useDispatch();

  const handleClick = (id) => {
    console.log("IIID", id);
    dispatch(getLeagueById(id));
  };

  return (
    <div className="itemTable">
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>#ID</th>
            <th>Icon</th>
            <th>League Name</th>
          </tr>
        </thead>
        <tbody>
          {leagues.map((league) => (
            <tr key={league.id}>
              <td key={league.id} onClick={() => handleClick(league.id)}>
                <Link to={`/leagues/${league.id}`}>{league.id}</Link>
              </td>
              <td>
                <img alt="sm" src={league.image_url} className="image" />
              </td>
              <td>{league.name}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Item;
