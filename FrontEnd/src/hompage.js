import LoginPage from "./loginPage";
import SignupPage from "./signupPage";
import React, { useState } from "react";
import { Button, Col, Row, Card, Image } from "react-bootstrap";

export default function Homepage() {
  const [isNewUser, setIsNewUser] = useState();

  const showItem = () => {
    if (isNewUser === false) {
      return (
        <div>
          <LoginPage />{" "}
        </div>
      );
    } else if (isNewUser === true) {
      return (
        <div>
          {" "}
          <SignupPage />{" "}
        </div>
      );
    } else {
      return (
        <Image
          src={require("./Free Vector _ Self care health concept.jpeg")}
          alt="Image here"
          widht={600}
          height={250}
        />
      );
    }
  };

  return (
    <div>
      <Row>
        <Col xs={12}>
          <div className="d-flex justify-content-around">
            <Card
              style={{
                width: "80%",
                height: "80%",
                padding: 10,
                margin: 25,
                backgroundColor: "#EEF5FF",
              }}
            >
              <Card.Body>
                <Card.Title>Health Tracker and Meal Planner</Card.Title>

                <Card.Text>
                  Start your wellness evolution today! Welcome to our Website,
                  your all-in-one destination for health tracking and customized
                  meal plans, empowering you to thrive on your path to a
                  healthier lifestyle.
                </Card.Text>
                <Button
                  variant="info"
                  style={{ padding: 10, margin: 15 }}
                  onClick={() => {
                    setIsNewUser(false);
                  }}
                >
                  {" "}
                  Login{" "}
                </Button>
                <Button
                  variant="info"
                  style={{ padding: 10, margin: 15 }}
                  onClick={() => {
                    setIsNewUser(true);
                  }}
                >
                  {" "}
                  Signup{" "}
                </Button>
              </Card.Body>
            </Card>
          </div>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>{showItem()}</Col>
      </Row>
    </div>
  );
}
