import { JwtPayload } from 'jsonwebtoken';

export interface CustomJwtPayload extends JwtPayload {
    id: string;
    username: string;
    isAdmin: boolean;
}

export interface User{
    _id:string;
    username:string;
    email:string;
    mobile:Number;
    password:string;
    isAdmin:Boolean;
    // _v:number;
}