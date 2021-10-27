import React from "react";
import { useDispatch, useLocation, useState } from "../../lib/imported";
import Dropdown from "react-bootstrap/Dropdown";
import { selectByGame } from "../../js/LeaguesSlice";
import { selectByGameTeams } from "../../js/TeamsSlice";
const SelectorList = ({ games }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [title, setTitle] = useState();

  const handleFilter = (name) => {
    setTitle(name);
    console.log("this is game id", name);
    console.log("URL ", location);
    localStorage.setItem("GameName", name);

    if (location.pathname === "/teams") {
      dispatch(selectByGameTeams({ name: name }));
    }
    if (location.pathname === "/leagues") {
      dispatch(selectByGame({ name: name }));
    }
  };
  return (
    <div>
      <Dropdown>
        <Dropdown.Toggle variant="secondary" id="dropdown-basic">
          {title ? title : "Video Games"}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {games.map((game) => (
            <Dropdown.Item
              href={`#/${game.id}`}
              key={game.id}
              onClick={() => handleFilter(game.name)}
            >
              {game.name}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default SelectorList;
