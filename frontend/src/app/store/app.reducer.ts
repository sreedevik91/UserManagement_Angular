

import { User } from "../constants/CustomJwtPayload";
import { createReducer, on, State } from "@ngrx/store";
import {getUser,getUserSuccess, loadUsers, loadUserFailure, loadUserSuccess } from "./app.action";


export interface UserState{
    loading:boolean;
    users:User[],
    error:string | null
}

export const initialUserState:UserState={
    loading:false,
    users:[],
    error:null
}

export const userReducer=createReducer(
    initialUserState,
    on(loadUsers, (state) =>({
        ...state,
        loading:false,
        users:[],
        error:null
    })),
    on(loadUserSuccess,(state,{users})=>({
        ...state,
        loading:false,
        users:users as User[],
        error:null
    })),
    on(loadUserFailure,(state,{errorMessage})=>({
        ...state,
        loading:false,
        error:errorMessage
    })),
    
)