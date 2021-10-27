import {
  useState,
  useEffect,
  useDispatch,
  useSelector,
} from "../../lib/imported";
import { getTeams } from "../../js/TeamsSlice";
import ReactPaginate from "react-paginate";
import Loader from "react-loader-spinner";
import TeamItem from "./Item";

const List = () => {
  const dispatch = useDispatch();
  const { teams, loading } = useSelector((state) => state.teams);
  const [isLoading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 10;
  const pagesVisited = currentPage * pageSize;

  const pageCount = teams ? Math.ceil(teams.length / pageSize) : 0;

  useEffect(() => {
    dispatch(getTeams(currentPage, pageSize));
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (teams.length) {
      setPosts(teams);
      setPosts(teams.slice(pagesVisited, pagesVisited + pageSize));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    // eslint-disable-next-line
  }, [teams]);

  const changePage = ({ selected }) => {
    setCurrentPage(selected);
    setPosts(teams.slice(pagesVisited, pagesVisited + pageSize));
  };

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
      <div className="App">
        <h3>Teams List</h3>
        <TeamItem teams={posts} />
        <ReactPaginate
          previousLabel={"previous"}
          pageCount={pageCount}
          nextLabel={"next"}
          onPageChange={changePage}
          containerClassName={"paginationBttns"}
          previousClassName={"previousBttn"}
          nextClassName={"nextBttn"}
          activeClassName={"paginationActive"}
        />
      </div>
    );
  }
};

export default List;
