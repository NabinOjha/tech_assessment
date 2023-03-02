import { configureStore } from "@reduxjs/toolkit";

import repoReducer from "./repos";

const store = configureStore({
  reducer: {
    repo: repoReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export default store;
