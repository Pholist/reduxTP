import Table from "react-bootstrap/Table";
import { Link, useDispatch } from "../../lib/imported";
import { getTeamById } from "../../js/TeamsSlice";

const Item = ({ teams }) => {
  const dispatch = useDispatch();

  const handleClick = (id) => {
    console.log("IIID", id);
    dispatch(getTeamById(id));
  };

  return (
    <div className="itemTable">
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>#ID</th>
            <th>Icon</th>
            <th>Team Name</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team) => (
            <tr key={team.id}>
              <td key={team.id} onClick={() => handleClick(team.id)}>
                <Link to={`/teams/${team.id}`}>{team.id}</Link>
              </td>
              <td>
                <img alt="sm" src={team.image_url} className="image" />
              </td>
              <td>{team.name}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Item;
