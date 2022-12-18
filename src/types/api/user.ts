import {validateEmail} from "../../utils/validator"

export type UserRegisterApi = {
    username: string,
    email: string,
    password: string
}

export type UserLoginApi = {
    username: string,
    password: string
}

export type User = {
    username: string,
    email: string,
    phone: string | null,
    wa_sending: boolean,
    notification_on: boolean,
} | null

export type Error<T> = Partial<Record<keyof T, string>>

export const validateUserRegister = (user:UserRegisterApi) => {
    const errors: Error<UserRegisterApi> = {}

    if(user.username.length < 1) {
        errors.username = "Username is Required"
    }
    if(user.email.length < 1) {
        errors.email = "Email is Required"
    }
    if(user.password.length < 6) {
        errors.password = "Password must be atleast 6 characters long"
    }
    if(!validateEmail(user.email)) {
        errors.email = "Please enter correct email"
    }

    return errors;
}

export const validateUserLogin = (user:UserLoginApi) => {
    const errors: Error<UserLoginApi> = {}

    if(user.username.length < 1) {
        errors.username = "Username is Required"
    }
    if(user.password.length < 1) {
        errors.password = "Password is Required"
    }

    return errors;
}