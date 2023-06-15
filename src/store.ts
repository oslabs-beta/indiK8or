import { configureStore } from '@reduxjs/toolkit';
import homePageReducer from './slices/homePageSlice';
import sideBarReducer from './slices/sideBarSlice';



export const store = configureStore({
    reducer: {
        homePage: homePageReducer,
        sideBar: sideBarReducer,
    },
});


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
