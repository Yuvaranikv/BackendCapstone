import React from "react";
import "semantic-ui-css/semantic.min.css";
import {
  Form,
  Button,
  Grid,
  Header,
  Segment,
  Container,
  } from "semantic-ui-react";

const AddNewBook = () => {
  return (
    <Container text style={{ marginTop: "5em" }}>
      <Header as="h1" textAlign="center">
        Welcome to add new book
      </Header>
    </Container>
  );
};
export default AddNewBook;
