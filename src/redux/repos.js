import axios from "axios";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_ROOT_URL, ITEMS_PER_PAGE } from "../constants";

const INITIAL_STATE = {
  query: "",
  page: 0,
  sort: "stars",
  order: "asc",
  loading: false,
  totalItems: 0,
  repos: [],
  error: null,
};

export const loadRepos = createAsyncThunk(
  "repos/loadUsers",
  async (searchParams) => {
    const response = await axios.get(
      `${API_ROOT_URL}/search/repositories?q=${searchParams.query}&per_page=${ITEMS_PER_PAGE}&page=${searchParams.page}&sort=${searchParams.sort}&order=${searchParams.order}`
    );
    return {
      data: response.data,
      query: searchParams.query || "",
      page: searchParams.page || 0,
      sort: searchParams.sort || "stars",
      order: searchParams.order || "asc",
    };
  }
);

export const repoSlice = createSlice({
  name: "repos",
  initialState: INITIAL_STATE,
  extraReducers: (builder) => {
    builder.addCase(loadRepos.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loadRepos.fulfilled, (state, action) => {
      state.loading = false;
      state.repos = action?.payload?.data?.items || [];
      state.totalItems = action?.payload?.data?.total_count || 0;
      state.error = null;
      state.query = action?.payload?.query;
      state.page = action?.payload?.page;
      state.sort = action?.payload?.sort;
      state.order = action?.payload?.order;
    });
    builder.addCase(loadRepos.rejected, (state, action) => {
      state.loading = false;
      state.repos = [];
      state.error = action.error.message;
    });
  },
});

export default repoSlice.reducer;
