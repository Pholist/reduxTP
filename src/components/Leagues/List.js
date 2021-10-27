import {
  useState,
  useEffect,
  useDispatch,
  useSelector,
} from "../../lib/imported";
import { getLeagues } from "../../js/LeaguesSlice";
import LeagueItem from "./Item";
import ReactPaginate from "react-paginate";
import Loader from "react-loader-spinner";

const List = () => {
  const dispatch = useDispatch();
  const { leagues, loading } = useSelector((state) => state.leagues);
  const [isLoading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 10;
  const pagesVisited = currentPage * pageSize;

  const pageCount = leagues ? Math.ceil(leagues.length / pageSize) : 0;

  useEffect(() => {
    dispatch(getLeagues(currentPage, pageSize));
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    console.log("leagueeeeeeeeeeeeees", leagues);
    if (leagues.length) {
      setPosts(leagues);
      setPosts(leagues.slice(pagesVisited, pagesVisited + pageSize));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    // eslint-disable-next-line
  }, [leagues]);

  const changePage = ({ selected }) => {
    setCurrentPage(selected);
    setPosts(leagues.slice(pagesVisited, pagesVisited + pageSize));
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
        <h3>Leagues List</h3>
        <LeagueItem leagues={posts} />
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
