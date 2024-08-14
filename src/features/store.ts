import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Cookies } from "react-cookie";


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
});


type AuthState = {
  isSignIn: boolean;
};

const cookie = new Cookies();
const initialAuthState: AuthState = {
  isSignIn: cookie.get("token") !== undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    signIn: (state: AuthState) => {
      state.isSignIn = true;
    },
    signOut: (state: AuthState) => {
      state.isSignIn = false;
    }
  }
})

const store = configureStore({
  reducer: {
    bookreviewOffset: bookreviewOffsetSlice.reducer,
    auth: authSlice.reducer,
  },
});


// ストアの型
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
// BookreviewOffset
export const { update } = bookreviewOffsetSlice.actions;
// auth
export const {signIn, signOut} = authSlice.actions;