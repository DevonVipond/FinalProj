import React from "react";
import "./LoginPage.css"

import "semantic-ui-css/semantic.min.css";

import {
    Button,
    Form,
    Grid,
    Segment,
    Dropdown
} from "semantic-ui-react";

import "../../UseCases/Login/Login"
import { LoginUser } from "../../UseCases/Login/Login"
import { Register } from "../../UseCases/Register/Register";

const registrationFields = [
    ['username', 'usernameForm'],
    ['password', 'passwordForm'],
    ['first name', 'firstNameForm'],
    ['last name', 'firstNameForm'],
    ['phone number', 'phoneNumberForm'],
    ['age', 'ageForm'],
    ['about', 'aboutForm'],
]


let uniqueId: number = 0
let accountType: string = 'Premium'
let gender: string = 'Male'
const login = (uId: string, pId: string) => {

    const uForm: any = document.getElementById(uId)
    const pForm: any = document.getElementById(pId)

    LoginUser(uForm.value, pForm.value)
}

const register = (uId: string, pId: string, dId: string) => {

    try {
        const args: Array<string> = registrationFields.map((idx: any) => {
            const htmlElement: any = document.getElementById(idx[1])
            if (htmlElement) {

                return htmlElement.value
            }

            throw Error('missing field: '+ idx[1])
        })

        Register(args[0], args[1], args[2], args[3], args[4], args[5], args[6], accountType, gender)
            .catch((e: any) => {console.log(e)})

    } catch (e: any) {
        console.log(e)
        return
    }


}


const UIRegisterForm = (name: string) => {
    const uId: string = 'UIRegisterForm' + (++uniqueId).toString()
    const pId: string = 'UIRegisterForm' + (++uniqueId).toString()
    const dId: string = 'UIRegisterForm' + (++uniqueId).toString()

    const makeForms = () => {

        return registrationFields.map((idx: any) => {
            return (<Form.Input
                id={idx[1]}
                fluid
                iconPosition="left"
                placeholder={idx[0]}
            />)
        })

    }

    return (
        <div className="loginContainer" >
            <Grid textAlign="center" verticalAlign="middle">
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Form size="large">
                        <Segment stacked>
                            { makeForms() }
                            <Dropdown id={'accountdropdown'} onChange={(e: any, data: any) => {accountType = e.target.textContent;}} clearable options={accountTypes} selection />
                            <Dropdown id={'genderDropdown'} onChange={(e: any, data: any) => {gender = e.target.textContent;}} clearable options={genderTypes} selection />
                            <Button color="teal" fluid size="large" onClick={(e: any) => register(uId, pId, dId)}>
                                { name }
                            </Button>
                        </Segment>
                    </Form>
                </Grid.Column>
            </Grid>
        </div>
    )
}

const genderTypes = [
  { key: 1, text: 'Male', value: 1 },
  { key: 2, text: 'Female', value: 2 }
]

const accountTypes = [
  { key: 1, text: 'Premium', value: 1 },
  { key: 2, text: 'Regular', value: 2 }
]


const UILoginForm = (name: string) => {
    const uId: string = 'loginForm' + (++uniqueId).toString()
    const pId: string = 'loginForm' + (++uniqueId).toString()

    return (
        <div className="loginContainer" >
            <Grid textAlign="center" verticalAlign="middle">
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Form size="large">
                        <Segment stacked>
                            <Form.Input
                                id={uId}
                                fluid
                                iconPosition="left"
                                placeholder='username'
                            />
                            <Form.Input
                                id={pId}
                                fluid
                                iconPosition="left"
                                placeholder='password'
                            />
                            <Button color="teal" fluid size="large" onClick={(e: any) => login(uId, pId)}>
                                { name }
                            </Button>
                        </Segment>
                    </Form>
                </Grid.Column>
            </Grid>
        </div>
    )
}

const Login = () => {
    return (
        <div >
            { UILoginForm('Login User') }
            { UILoginForm('Login Admin') }
            { UIRegisterForm('Register User') }
        </div>
    )
}

export default Login