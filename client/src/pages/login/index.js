import React, { useState } from "react";
import "semantic-ui-css/semantic.min.css";
import {useNavigate} from 'react-router-dom';
import { Form, Button, Grid, Header, Segment } from "semantic-ui-react";
import "./styles.css";
import axios from "axios";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate=useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/userstest/", { username, password });
      console.log(response.data);

      if (response.status === 200) {
        console.log("Redirecting to Add New Books page...");
        navigate('/books/list');//Redirect to AddNewBook Page
       // window.location.href = "/pages/AddNewBook";
      }
    } catch (error) {
      console.error("Login error:", error); // Handle error response
    }
  };

  return (
    <div className="login-container">
      <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="black" textAlign="center">
            Log-in to your account
          </Header>
          <Form size="large" onSubmit={handleSubmit}>
            <Segment stacked>
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <Button color="black" fluid size="large" type="submit">
                Login
              </Button>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default LoginPage;
