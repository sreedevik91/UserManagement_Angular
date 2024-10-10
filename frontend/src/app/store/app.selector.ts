import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserState } from "./app.reducer";
import { User } from "../constants/CustomJwtPayload";


export const selectUserFeature=createFeatureSelector<UserState>('users')

export const selectLoading=createSelector(
    selectUserFeature,
    (state:UserState)=> state.loading
)

export const selectUsers=createSelector(
    selectUserFeature,
    (state:UserState)=>state.users
)

export const selectError=createSelector(
    selectUserFeature,
    (state:UserState)=>state.error
)