import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../../app/store";
import { ILoginInput, ILoginResponse } from "../../../../Interfaces/ILoginServices";
import { LoginAsync } from "../../../../Services/AuthServices";

export interface IAuthState {
  isLogin: boolean;
  token: string | null;
  name: string | null;
  role: string | null;
}

export const login = createAsyncThunk(
  'auth/login',
  async (data: ILoginInput, { rejectWithValue }) => {
    try {
      const response = await LoginAsync(data);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState: IAuthState = {
  isLogin: !!localStorage.getItem('token'),
  token: localStorage.getItem('token') || null,
  name: null,
  role: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.isLogin = false;
      state.token = null;
      state.name = null;
      state.role = null;
      localStorage.removeItem('token');
    },
    getMe: (state, action: PayloadAction<any>) => {
      state.name = action.payload.name;
      state.role = action.payload.role;
    },
    refreshToken: (state, action: PayloadAction<ILoginResponse>) => {
      state.token = action.payload.token;
      localStorage.setItem('token', action.payload.token);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      login.fulfilled,
      (state, action: PayloadAction<ILoginResponse>) => {
        localStorage.setItem('token', action.payload.token);
        state.isLogin = true;
        state.token = action.payload.token;
      }
    );
    builder.addCase(login.rejected, (state) => {
      localStorage.removeItem('token');
      state.isLogin = false;
      state.token = null;
    });
  },
});

export const { logout, getMe, refreshToken } = authSlice.actions;
export const isLogin = (state: RootState) => state.authSlice.isLogin;
export const getToken = (state: RootState) => state.authSlice.token;
export const getName = (state: RootState) => state.authSlice.name;
export const getRole = (state: RootState)=> state.authSlice.role;

export default authSlice;
