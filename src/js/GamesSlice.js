import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const url = process.env.REACT_APP_QUOTES_API_URL_GAMES;
const token = process.env.REACT_APP_QUOTES_API_TOKEN;

export const getGameById = createAsyncThunk(
  //action type string
  "games/getGameById",
  // callback function
  async (id) => {
    console.log("this is id", id);
    console.log("GET BY ID");
    const res = await fetch(`https://api.pandascore.co/videogames/${id}`, {
      headers: {
        Authorization: token,
      },
    }).then((data) => data.json());
    console.log("result", res);
    return res;
  }
);

export const getGames = createAsyncThunk(
  //action type string
  "Games/getGames",
  // callback function
  async () => {
    const res = await fetch(url, {
      headers: {
        Authorization: token,
      },
    }).then((data) => data.json());
    console.log("result", res);
    return res;
  }
);

export const GamesSlice = createSlice({
  name: "Games",
  initialState: {
    games: [],
    loading: false,
  },
  reducers: {},
  extraReducers: {
    [getGames.pending]: (state) => {
      state.loading = true;
    },
    [getGames.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.games = payload;
      console.log("payload", { payload });
    },
    [getGames.rejected]: (state) => {
      state.loading = false;
    },

    [getGameById.pending]: (state) => {
      state.loading = true;
    },
    [getGameById.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.games = payload;
      console.log("payload league", { payload });
    },
    [getGameById.rejected]: (state) => {
      state.loading = false;
    },
  },
});

export default GamesSlice.reducer;
