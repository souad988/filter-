import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchUsers = createAsyncThunk('github/fetchUsers', async (query) => {
  const numOfResults = 10; // Define the numOfResults variable
  const response = await axios.get(`https://api.github.com/search/users?q=${query}&per_page=${numOfResults}`); // Use template literal for string interpolation
  return response.data;
});

const githubSlice = createSlice({
  name: 'github',
  initialState: { users: '', loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default githubSlice.reducer;
