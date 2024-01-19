import React, { useState } from "react";
import { Container, Form, Button, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
export default function SignupPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [cpasswd, setCpasswd] = useState("");
  const [token, setToken] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [goal, setGoal] = useState("");
  const [errors, setErrors] = useState([]);

  let navigate = useNavigate();

  const CheckValue = () => {
    var errors = [];
    if (username.trim().length === 0) {
      errors.push("User Name is required");
    }
    if (password.trim().length === 0 && password.trim().length < 8) {
      errors.push("Password is required with minimun length 8");
    }
    if (email.trim().length === 0) {
      errors.push("Email Address is required");
    }
    if (cpasswd.trim().length === 0 && cpasswd.trim().length < 8) {
      errors.push("Confirm Password is required with minimum length 8");
    }
    if (password !== cpasswd) {
      errors.push("Password and Confirm Password must match.");
    } else {
      register();
    }

    setErrors(errors);
  };
  const register = async () => {
    try {
      const response = await fetch("http://localhost:3001/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, email, age, gender, goal }),
      });
      if (response.ok) {
        alert("User registered successfully");
        setToken(response.body);
        setUsername("");
        setPassword("");
        setEmail("");
        setCpasswd("");
        setAge("");
        setGender("");
        setGoal("");
        navigate(`/dashboard/${username}`);
      } else {
        alert("Failed to register user");
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert("Registration failed");
    }
  };

  return (
    <div>
      <Container>
        <Form>
          <Row>
            <Col xs={12}>
              <h2>Sign Up:</h2>
              <h5>Please Enter your information:</h5>
              <div>
                <Row>
                  <Col xs={6}>
                    <Form.Group className="username" controlId="name">
                      <Form.Label> User Name:</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="User Id"
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={6}>
                    <Form.Group className="username" controlId="Email">
                      <Form.Label>Email address: </Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="name@example.com"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </div>
              <hr></hr>
              <hr></hr>
              <div>
                <Row>
                  <Col xs={6}>
                    <Form.Group className="password" controlId="Password">
                      <Form.Label> Password:</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="********"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={6}>
                    <Form.Group className="password" controlId="CPassword">
                      <Form.Label> Confirm Password:</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="********"
                        onChange={(e) => setCpasswd(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </div>
              <hr></hr>
              <hr></hr>
              <div>
                <Row>
                  <Col xs={6}>
                    <Form.Group className="other" controlId="age">
                      <Form.Label> Age:</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="0"
                        onChange={(e) => setAge(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={6}>
                    <Form.Group className="other" controlId="gender">
                      <Form.Label> Gender:</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="--"
                        onChange={(e) => setGender(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </div>
              <hr></hr>
              <hr></hr>
              <div>
                <Row>
                  <Col xs={12}>
                    <Form.Group className="goal" controlId="goal">
                      <Form.Label> Goal:</Form.Label>
                      <Form.Control
                        placeholder="--"
                        onChange={(e) => setGoal(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </div>

              <div style={{ color: "red" }}>
                {errors.map((a) => (
                  <div> {a}</div>
                ))}
              </div>
              <hr></hr>
              <div>
                <Button
                  variant="info"
                  onClick={() => {
                    CheckValue();
                  }}
                >
                  Register
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  );
}
