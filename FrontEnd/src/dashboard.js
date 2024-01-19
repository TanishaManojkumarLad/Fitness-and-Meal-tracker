import {
  Container,
  Nav,
  Navbar,
  Button,
  Image,
  Card,
  ListGroup,
  Row,
  Col,
} from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { username } = useParams();
  const [data, setData] = useState();
  const [response, setResponse] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    fetchdata(`http://localhost:3001/home/${username}`, setData);
  }, []);

  console.log(data);
  const logout = () => {
    fetchdata(`http://localhost:3001/logout`, setResponse);
    console.log(response);
    navigate("/");
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
      <Row>
        <Col xs={6}>
          <div>
            <Card style={{ width: "40rem" }}>
              <Card.Img
                variant="top"
                src={require("./download.jpeg")}
                style={{ padding: 5, margin: 5 }}
              />
              <Card.Body>
                <Card.Title>Welcome, {data && data.username} !!</Card.Title>
                <Card.Text>
                  Your Goals ,
                  <ListGroup>
                    <ListGroup.Item variant="info">
                      {data && data.goal}
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        </Col>
        <Col xs={6}>
          <div>
            <h4> Upcoming Tasks </h4>
            <ListGroup as="ol" style={{ padding: 10, margin: 5 }}>
              {data &&
                data.plan?.map((e, index) => (
                  <ListGroup.Item as="li" variant="info" style={{ margin: 5 }}>
                    {" "}
                    {e.isCompleted === false && <div>{e.title}</div>}{" "}
                  </ListGroup.Item>
                ))}
            </ListGroup>
          </div>
        </Col>
      </Row>
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
