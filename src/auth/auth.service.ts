import { Injectable } from "@nestjs/common";

@Injectable({})

export class AuthService {
    signup() {
        return { msg: 'You have signed up!'}
    }

    signin() {
        return { msg: 'You have signed in!'}
    }
}