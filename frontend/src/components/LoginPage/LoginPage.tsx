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
import { Redirect } from "react-router";

let uniqueId: number = 0
let dropdownVal: string = 'Premium'
const login = (uId: string, pId: string) => {

    const uForm: any = document.getElementById(uId)
    const pForm: any = document.getElementById(pId)

    LoginUser(uForm.value, pForm.value)
}

const register = (uId: string, pId: string, dId: string) => {

    const uForm: any = document.getElementById(uId)
    const pForm: any = document.getElementById(pId)

    console.log('regiser', dropdownVal)
    Register(uForm.value, pForm.value, dropdownVal)
}


const UIRegisterForm = (name: string) => {
    const uId: string = 'UIRegisterForm' + (++uniqueId).toString()
    const pId: string = 'UIRegisterForm' + (++uniqueId).toString()
    const dId: string = 'UIRegisterForm' + (++uniqueId).toString()

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
                                placeholder="username"
                            />
                            <Form.Input
                                id={pId}
                                fluid
                                iconPosition="left"
                                placeholder="password"
                            />
                            <Dropdown id={dId} onChange={(e: any, data: any) => {dropdownVal = e.target.textContent;}} clearable options={accountTypes} selection />
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
    if (sessionStorage.getItem('auth')) {
        return <Redirect to='/home' />
    }
    return (
        <div >
            { UILoginForm('Login User') }
            { UILoginForm('Login Admin') }
            { UIRegisterForm('Register User') }
        </div>
    )
}

export default Login