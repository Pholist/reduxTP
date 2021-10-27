import leaguesReducer from "../LeaguesSlice";
import teamsReducer from "../TeamsSlice";
import gamesReducer from "../GamesSlice";
import { configureStore } from "@reduxjs/toolkit";

export default configureStore({
  reducer: {
    leagues: leaguesReducer,
    teams: teamsReducer,
    games: gamesReducer,
  },
});
