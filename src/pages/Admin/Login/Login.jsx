import React from "react";
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";

const Login = () => {
  return (
    <section className="vh-100" style={{ backgroundColor: "#9A616D" }}>
      <Container className="py-5 h-100">
        <Row className="d-flex justify-content-center align-items-center h-100">
          <Col xl={10}>
            <Card style={{ borderRadius: "1rem" }}>
              <Row className="g-0">
                <Col md={6} lg={5} className="d-none d-md-block">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
                    alt="login form"
                    className="img-fluid"
                    style={{ borderRadius: "1rem 0 0 1rem" }}
                  />
                </Col>
                <Col md={6} lg={7} className="d-flex align-items-center">
                  <CardBody className="p-4 p-lg-5 text-black">
                    <Form>
                      <div className="d-flex align-items-center mb-3 pd-1">
                        <span className="h1 fw-bold mb-0">Admin Page</span>
                      </div>
                      <h5 className="fw-normal mb-3 pb-3">
                        Sign into your account
                      </h5>
                      <FormGroup className="form-outline mb-4">
                        <Label for="email">Email</Label>
                        <Input
                          type="email"
                          id="email"
                          name="email"
                          placeholder="Email"
                        />
                      </FormGroup>
                      <FormGroup className="form-outline mb-4">
                        <Label for="password">Password</Label>
                        <Input
                          type="password"
                          id="password"
                          name="password"
                          placeholder="Password"
                        />
                      </FormGroup>
                      <Button color="primary" type="submit" block>
                        Login
                      </Button>
                    </Form>
                  </CardBody>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Login;
