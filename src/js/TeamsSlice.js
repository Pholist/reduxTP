import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const url = process.env.REACT_APP_QUOTES_API_URL_TEAMS;
const token = process.env.REACT_APP_QUOTES_API_TOKEN;

export const getTeamById = createAsyncThunk(
  //action type string
  "teams/getTeamById",
  // callback function
  async (id) => {
    console.log("this is id", id);
    console.log("GET BY ID");
    const res = await fetch(`https://api.pandascore.co/teams/${id}`, {
      headers: {
        Authorization: token,
      },
    }).then((data) => data.json());
    console.log("result", res);
    return res;
  }
);

export const getTeams = createAsyncThunk(
  //action type string
  "Teams/getTeams",
  // callback function
  async ({ currentPage, pageSize }) => {
    const res = await fetch(url, {
      headers: {
        Authorization: token,
      },
    }).then((data) => data.json());
    let some = res.slice(currentPage, pageSize);
    console.log("result", some);
    return some;
  }
);
// Selector
export const selectByGameTeams = createAsyncThunk(
  "leagues/filterLeagues",
  async (name, { getState, dispatch }) => {
    await dispatch(getTeams(0, 50));
    console.log("this is game id INSIDE", name.name);
    const arr = getState().teams.teams;
    console.log("this is game id INSIDE", arr);
    const res = await arr.filter((team) => {
      const some = team.current_videogame;
      console.log("INSIDE", some);
      return some.name === name.name;
    });
    return res;
  }
);

export const TeamsSlice = createSlice({
  name: "teams",
  initialState: {
    teams: [],
    loading: false,
  },
  reducers: {},
  extraReducers: {
    [getTeams.pending]: (state) => {
      state.loading = true;
    },
    [getTeams.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.teams = payload;
      console.log("payload", { payload });
    },
    [getTeams.rejected]: (state) => {
      state.loading = false;
    },

    [getTeamById.pending]: (state) => {
      state.loading = true;
    },
    [getTeamById.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.teams = payload;
      console.log("payload league", { payload });
    },
    [getTeamById.rejected]: (state) => {
      state.loading = false;
    },
    [selectByGameTeams.pending]: (state) => {
      state.loading = true;
    },
    [selectByGameTeams.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.teams = payload;
      console.log("payload league", { payload });
    },
    [selectByGameTeams.rejected]: (state) => {
      state.loading = false;
    },
  },
});

export default TeamsSlice.reducer;
