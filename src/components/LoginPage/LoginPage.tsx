import React, { Component } from "react";
import "./LoginPage.css"

import "semantic-ui-css/semantic.min.css";

import {
    Button,
    Form,
    Grid,
    Header,
    Message,
    Segment
} from "semantic-ui-react";

const UIForm = (name: string, inputs: Array<string> ) => {
    return (
        <div className="loginContainer" >
            <Grid textAlign="center" verticalAlign="middle">
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Form size="large">
                        <Segment stacked>
                            { inputs.map(inputName => (
                                    <Form.Input
                                        fluid
                                        iconPosition="left"
                                        placeholder={ inputName }
                                    />
                                )
                            )}
                            <Button color="teal" fluid size="large">
                                Login
                            </Button>
                        </Segment>
                    </Form>
                </Grid.Column>
            </Grid>
            <Grid textAlign="center" verticalAlign="middle">
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as="h2" color="teal" textAlign="center">
                    </Header>
                    <Form size="large">
                        <Segment stacked>
                            { inputs.map(inputName => (
                                    <Form.Input
                                        fluid
                                        iconPosition="left"
                                        placeholder={ inputName }
                                    />
                                )
                            )}
                            <Button color="teal" fluid size="large">
                                Register
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
            { UIForm('User Login', ['username', 'password']) }
        </div>
    )
}

export default Login