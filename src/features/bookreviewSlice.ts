import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";


type BookreviewOffsetState = {
  offset: number;
};

const initialState: BookreviewOffsetState = {
  offset: 0
};

// スライスの作成
const bookreviewOffsetSlice = createSlice({
  name: "bookreviewOffset",
  initialState: initialState,
  reducers: {
    update: (state: BookreviewOffsetState, action: PayloadAction<{offset: number}>) => {
      state.offset = action.payload.offset;
    }
  }
})

const store = configureStore({
  reducer: {
    bookreviewOffset: bookreviewOffsetSlice.reducer,
  },
});


// ストアの型
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
export const { update } = bookreviewOffsetSlice.actions;