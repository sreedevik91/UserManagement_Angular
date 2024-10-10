import { inject, Injectable } from "@angular/core";
import { UserServiceService } from "../service/user-service.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { loadUsers, loadUserFailure, loadUserSuccess } from "./app.action";
// import { catchError, map, of, switchMap } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";
import { User } from "../constants/CustomJwtPayload";
import { of } from "rxjs";


@Injectable()

export class UserEffects {
    userService = inject(UserServiceService)
    actions$ = inject(Actions)

    loadUsers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadUsers),
            switchMap(() =>
                this.userService.getAllUsers().pipe(
                    map((res: User[]) => loadUserSuccess({ users: res })),
                    catchError((error: { message: string }) =>
                        of(loadUserFailure({ errorMessage: 'Fail to load users' }))
                    )
                )
            )

        )

    )

}

