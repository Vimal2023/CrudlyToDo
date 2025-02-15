import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const createUser = createAsyncThunk(
    "createUser",
    async (data, { rejectWithValue }) => {
        try {
            const response = await fetch(
                "https://6783fa138b6c7a1316f64dfb.mockapi.io/CRUD",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                }
            );
            if (!response.ok) {
                throw new Error("Failed to create user");
            }
            const result = await response.json();
            return result;
        } catch (error) {
            return rejectWithValue(error.message || "Something went wrong");
        }
    }
);

export const showUser = createAsyncThunk(
    "showUser",
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch(
                "https://6783fa138b6c7a1316f64dfb.mockapi.io/CRUD"
            );
            if (!response.ok) {
                throw new Error("Failed to fetch users");
            }
            const result = await response.json();
            return result;
        } catch (error) {
            return rejectWithValue(error.message || "Something went wrong");
        }
    }
);

export const deleteUser = createAsyncThunk(
    "deleteUser",
    async (id, { rejectWithValue }) => {
        try {
            const response = await fetch(
                `https://6783fa138b6c7a1316f64dfb.mockapi.io/CRUD/${id}`,
                { method: "DELETE" }
            );
            if (!response.ok) {
                throw new Error("Failed to delete users");
            }
            const result = await response.json();
            return result;
        } catch (error) {
            return rejectWithValue(error.message || "Something went wrong");
        }
    }
);

export const updateUser = createAsyncThunk(
    "updateUser",
    async (data, { rejectWithValue }) => {
        try {
            const response = await fetch(
                `https://6783fa138b6c7a1316f64dfb.mockapi.io/CRUD/${data.id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                }
            );
            if (!response.ok) {
                throw new Error("Failed to create user");
            }
            const result = await response.json();
            return result;
        } catch (error) {
            return rejectWithValue(error.message || "Something went wrong");
        }
    }
);

export const userDetail = createSlice({
    name: "userDetail",
    initialState: {
        users: [],
        loading: false,
        error: null,
        searchData: [],
    },
    reducers: {
        searchUser: (state, action) => {
            state.searchData = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users.push(action.payload);
            })
            .addCase(createUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(showUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(showUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(showUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.loading = false;

                const {id} = action.payload;

                if (id) {
                    state.users = state.users.filter((ele) => ele.id !== id);
                }
                
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users = state.users.map((ele) =>
                    ele.id === action.payload.id ? action.payload : ele
                );
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
});

export default userDetail.reducer;

export const { searchUser } = userDetail.actions;
