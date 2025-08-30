import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("infoUser")
  ? JSON.parse(localStorage.getItem("infoUser"))
  : {
      isLogged: false,
      name: "unknow",
      rol: "notUser",
      unit: "unknow",
      token: null,
    };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setInfoUser: (state, action) => {
      const newState = { ...state, ...action.payload, isLogged: true };
      localStorage.setItem("infoUser", JSON.stringify(newState));
      return newState;
    },
    logout: () => {
      localStorage.removeItem("infoUser");
      return {
        isLogged: false,
        name: "unknow",
        rol: "notUser",
        unit: "unknow",
        token: null,
      };
    },
  },
});

export const { setInfoUser, logout } = authSlice.actions;
export default authSlice.reducer;
