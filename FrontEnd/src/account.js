import React, { useState, useEffect } from "react";
import {
  Container,
  Form,
  Button,
  Col,
  Row,
  Nav,
  Navbar,
  Image,
} from "react-bootstrap";
import { useParams , useNavigate} from "react-router-dom";


export default function Account() {
  const [email, setEmail] = useState();
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState("");
  const [goal, setGoal] = useState("");
  const { username } = useParams();
  const [data, setData] = useState({});
  const [response, setResponse] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    fetchdata(`http://localhost:3001/home/${username}`, setData);
    setEmail(data.email);
    setAge(data.age);
    setGender(data.gender);
    setGoal(data.goal);
  }, []);

  const logout = () => {
    fetchdata(`http://localhost:3001/logout`, setResponse);
    console.log(response);
    navigate("/");
  };

  const updateInfo = async () => {
    try {
      const response = await fetch("http://localhost:3001/updateInfo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, age, gender, goal }),
      });
      console.log(response);
      alert('Updated Successfully')
    } catch (error) {
      console.error("Updatation error:", error);
      alert("Update failed");
    }
  };

  return (
    <div>
      <div>
        <Navbar bg="dark" data-bs-theme="dark">
          <Container>
            <Navbar.Brand href={`/dashboard/${username}`}>
              <Image
                src={require("./icon.png")}
                alt="icon"
                width={40}
                height={40}
              />
            </Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href={`/dashboard/${username}`}>DashBoard</Nav.Link>
              <Nav.Link href={`/plan/${username}`}>Plan</Nav.Link>
              <Nav.Link href={`/account/${username}`}>Account</Nav.Link>
            </Nav>
            <Button variant="outline-info" onClick={logout}>
              Log Out
            </Button>
          </Container>
        </Navbar>
      </div>
      <Container>
        <Form>
          <Row>
            <Col xs={12}>
              <h2>Hello, {data.username}</h2>
              <div>
                <Row>
                  <Col xs={6}>
                    <Form.Group className="username" controlId="name">
                      <Form.Label> User Name:</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder={data.username}
                        disabled
                        readOnly
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={6}>
                    <Form.Group className="username" controlId="Email">
                      <Form.Label>Email address: </Form.Label>
                      <Form.Control
                        type="email"
                        placeholder={data.email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
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
                        placeholder={data.age}
                        onChange={(e) => {
                          setAge(e.target.value);
                        }}
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={6}>
                    <Form.Group className="other" controlId="gender">
                      <Form.Label> Gender:</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder={data.gender}
                        onChange={(e) => {
                          setGender(e.target.value);
                        }}
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
                        placeholder={data.goal}
                        onChange={(e) => {
                          setGoal(e.target.value);
                        }}
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </div>
              <hr></hr>
              <div>
                <Button
                  variant="info"
                  onClick={() => {
                    updateInfo();
                  }}
                >
                  Update Info
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  );
}

const fetchdata = async (url, setItem) => {
  try {
    const respond = await fetch(url);
    const data = await respond.json();
    setItem(data);
  } catch (err) {
    console.log("error:", err);
  }
};
