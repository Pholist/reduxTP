import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const url = process.env.REACT_APP_QUOTES_API_URL;
const token = process.env.REACT_APP_QUOTES_API_TOKEN;

const initialState = {
  leagues: [],
  loading: false,
};
export const getLeagueById = createAsyncThunk(
  //action type string
  "leagues/getLeagueById",
  // callback function
  async (id) => {
    console.log("this is id", id);
    const res = await fetch(`https://api.pandascore.co/leagues/${id}`, {
      headers: {
        Authorization: token,
      },
    }).then((data) => data.json());
    console.log("result", res);
    return res;
  }
);

export const getLeagues = createAsyncThunk(
  //action type string
  "leagues/getLeagues",
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
export const selectByGame = createAsyncThunk(
  "leagues/filterLeagues",
  async (name, { getState, dispatch }) => {
    await dispatch(getLeagues(0, 50));
    console.log("this is game id INSIDE", name.name);
    const arr = getState().leagues.leagues;
    console.log("this is game id INSIDE", arr);
    const res = await arr.filter((league) => {
      const some = league.videogame;
      console.log("INSIDE", some);
      return some.name === name.name;
    });
    return res;
  }
);

export const LeaguesSlice = createSlice({
  name: "leagues",
  initialState,
  reducers: {},
  extraReducers: {
    [getLeagues.pending]: (state) => {
      state.loading = true;
    },
    [getLeagues.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.leagues = payload;
      console.log("payload", { payload });
    },
    [getLeagues.rejected]: (state) => {
      state.loading = false;
    },

    [getLeagueById.pending]: (state) => {
      state.loading = true;
    },
    [getLeagueById.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.leagues = payload;
      console.log("payload league", { payload });
    },
    [getLeagueById.rejected]: (state) => {
      state.loading = false;
    },
    [selectByGame.pending]: (state) => {
      state.loading = true;
    },
    [selectByGame.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.leagues = payload;
      console.log("payload league", { payload });
    },
    [selectByGame.rejected]: (state) => {
      state.loading = false;
    },
  },
});

export default LeaguesSlice.reducer;
