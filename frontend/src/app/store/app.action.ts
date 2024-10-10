import { createAction, props } from "@ngrx/store";
import { User } from "../constants/CustomJwtPayload";

export const loadUsers=createAction('[Users] loadUsers')
export const loadUserSuccess=createAction(
    '[User] loadUserSuccess',
    props<{users:User[]}>()
)
export const loadUserFailure=createAction(
    '[User] loadUserFailure',
    props<{errorMessage:string}>()
)

export const getUser=createAction('[User] getUser')

export const getUserSuccess=createAction(
    '[User] getUserSuccess',
    props<{users:User}>()
)