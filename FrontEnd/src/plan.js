import { useState, useEffect } from "react";
import {
  Card,
  Row,
  Col,
  Button,
  Form,
  Container,
  Nav,
  Navbar,
  Image,
} from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";

export default function Plan() {
  const { username } = useParams();
  const [data, setData] = useState({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [response, setResponse] = useState();
  const [updateValue, setUpdateValue] = useState("");
  const [showUpdateInput, setShowUpdateInput] = useState(false);
  const [updateValue2, setUpdateValue2] = useState("");
  const [showUpdateInput2, setShowUpdateInput2] = useState(false);
  const [showCreateInput, setShowCreateUnput] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [showCreateInput2, setShowCreateUnput2] = useState(false);
  const [newTitle2, setNewTitle2] = useState("");
  const [newDescription2, setNewDescription2] = useState("");
  const [Title, SetTitle] = useState("");
  const [mealTitle, SetMealTitle] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    fetchdata(`http://localhost:3001/home/${username}`, setData);
  }, []);

  const logout = () => {
    fetchdata(`http://localhost:3001/logout`, setResponse);
    console.log(response);
    navigate("/");
  };

  const onUpdatePlan = (prop) => {
    fetchdata(
      `http://localhost:3001/updatePlan/${username}/${prop}/${updateValue}/${isCompleted}`,
      setResponse
    );
    console.log(response);
    setUpdateValue("");
    setIsCompleted(false);
    setShowUpdateInput(false);
    fetchdata(`http://localhost:3001/home/${username}`, setData);
  };
  const onUpdateMealPlan = (prop) => {
    fetchdata(
      `http://localhost:3001/updateMeal/${username}/${prop}/${updateValue2}`,
      setResponse
    );
    console.log(response);
    setUpdateValue2("");
    setIsCompleted(false);
    setShowUpdateInput2(false);
    fetchdata(`http://localhost:3001/home/${username}`, setData);
  };

  const onDeletePlan = (prop) => {
    fetchdata(
      `http://localhost:3001/deletePlan/${username}/${prop}`,
      setResponse
    );
    console.log(response);
    fetchdata(`http://localhost:3001/home/${username}`, setData);
  };

  const onDeleteMealPlan = (prop) => {
    fetchdata(
      `http://localhost:3001/deleteMealPlan/${username}/${prop}`,
      setResponse
    );
    console.log(response);
    fetchdata(`http://localhost:3001/home/${username}`, setData);
  };

  const onCreatePlan = () => {
    fetchdata(
      `http://localhost:3001/createPlan/${username}/${newTitle}/${newDescription}`,
      setResponse
    );
    console.log(response);
    setNewTitle("");
    setNewDescription("");
    setShowCreateUnput(false);
    fetchdata(`http://localhost:3001/home/${username}`, setData);
  };
  const onCreateMealPlan = () => {
    fetchdata(
      `http://localhost:3001/createMealPlan/${username}/${newTitle2}/${newDescription2}`,
      setResponse
    );
    console.log(response);
    setNewTitle2("");
    setNewDescription2("");
    setShowCreateUnput2(false);
    fetchdata(`http://localhost:3001/home/${username}`, setData);
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

      <div>
        <Card style={{ margin: 5, padding: 10 }} border="info">
          <Card.Header>
            <Row>
              <Col xs={10}>
                <h4>Plans </h4>
              </Col>
              <Col xs={2}>
                <Button variant="info" onClick={() => setShowCreateUnput(true)}>
                  + Create
                </Button>
              </Col>
            </Row>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col>
                {showCreateInput && (
                  <>
                    <Form.Control
                      style={{ margin: 5 }}
                      type="text"
                      placeholder="New Title"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                    />
                    <Form.Control
                      style={{ margin: 5 }}
                      as="textarea"
                      placeholder="New Description"
                      value={newDescription}
                      onChange={(e) => setNewDescription(e.target.value)}
                    />
                    <Button
                      variant="info"
                      onClick={onCreatePlan}
                      style={{ margin: 5 }}
                    >
                      Save Creation
                    </Button>
                  </>
                )}
              </Col>
            </Row>
            <Row>
              <Col>
                {showUpdateInput && (
                  <Form.Control
                    style={{ margin: 5 }}
                    type="text"
                    value={updateValue}
                    onChange={(e) => setUpdateValue(e.target.value)}
                  />
                )}
                {showUpdateInput && (
                  <Form.Check
                    type="checkbox"
                    label="Completed"
                    checked={isCompleted}
                    onChange={(e) => setIsCompleted(e.target.checked)}
                  />
                )}
                {showUpdateInput && (
                  <Button
                    variant="info"
                    onClick={() => onUpdatePlan(Title)}
                    style={{ margin: 5 }}
                  >
                    Save Update
                  </Button>
                )}
              </Col>
            </Row>
            <Row className="g-4">
              {data &&
                data.plan?.map((e, index) => (
                  <Col key={index}>
                    <Card style={{ width: "20rem" }}>
                      <Card.Header>{e.title}</Card.Header>
                      <Card.Body>
                        <Row xs={8}>
                          <Col>{e.plan}</Col>
                        </Row>
                        <Row>
                          <Col>
                            {e.isCompleted === true ? (
                              <div>Completed</div>
                            ) : (
                              <div>Not Completed</div>
                            )}
                          </Col>
                        </Row>
                        <Row xs={2}>
                          <Col xs={6}>
                            {" "}
                            <Button
                              variant="outline-info"
                              style={{ margin: 5 }}
                              onClick={() => {
                                setShowUpdateInput(true);
                                setUpdateValue(e.plan);
                                SetTitle(e.title);
                              }}
                            >
                              Update
                            </Button>
                          </Col>
                          <Col xs={6}>
                            {" "}
                            <Button
                              variant="outline-info"
                              style={{ margin: 5 }}
                              onClick={() => {
                                onDeletePlan(e.title);
                              }}
                            >
                              Delete
                            </Button>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
            </Row>
          </Card.Body>
        </Card>
      </div>

      <div>
        <Card style={{ margin: 5, padding: 10 }} border="info">
          <Card.Header>
            <Row>
              <Col xs={10}>
                <h4> Meals Plans </h4>
              </Col>
              <Col xs={2}>
                <Button
                  variant="info"
                  onClick={() => setShowCreateUnput2(true)}
                >
                  + Create
                </Button>
              </Col>
            </Row>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col>
                {showCreateInput2 && (
                  <>
                    <Form.Control
                      style={{ margin: 5 }}
                      type="text"
                      placeholder="New Title"
                      value={newTitle2}
                      onChange={(e) => setNewTitle2(e.target.value)}
                    />
                    <Form.Control
                      style={{ margin: 5 }}
                      as="textarea"
                      placeholder="New Description"
                      value={newDescription2}
                      onChange={(e) => setNewDescription2(e.target.value)}
                    />
                    <Button
                      variant="info"
                      onClick={onCreateMealPlan}
                      style={{ margin: 5 }}
                    >
                      Save Creation
                    </Button>
                  </>
                )}
              </Col>
            </Row>
            <Row>
              <Col>
                {showUpdateInput2 && (
                  <Form.Control
                    style={{ margin: 5 }}
                    type="text"
                    value={updateValue2}
                    onChange={(e) => setUpdateValue2(e.target.value)}
                  />
                )}
                {showUpdateInput2 && (
                  <Button
                    variant="info"
                    onClick={() => onUpdateMealPlan(mealTitle)}
                    style={{ margin: 5 }}
                  >
                    Save Update
                  </Button>
                )}
              </Col>
            </Row>
            <Row className="g-4">
              {data &&
                data.mealplan?.map((e, index) => (
                  <Col key={index}>
                    <Card style={{ width: "20rem" }}>
                      <Card.Header>{e.title}</Card.Header>
                      <Card.Body>
                        <Row xs={8}>
                          <Col>{e.plan}</Col>
                        </Row>
                        <Row xs={2}>
                          <Col xs={6}>
                            {" "}
                            <Button
                              variant="outline-info"
                              style={{ margin: 5 }}
                              onClick={() => {
                                setShowUpdateInput2(true);
                                setUpdateValue2(e.plan);
                                SetMealTitle(e.title);
                              }}
                            >
                              Update
                            </Button>
                          </Col>
                          <Col xs={6}>
                            {" "}
                            <Button
                              variant="outline-info"
                              style={{ margin: 5 }}
                              onClick={() => {
                                onDeleteMealPlan(e.title);
                              }}
                            >
                              Delete
                            </Button>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
            </Row>
          </Card.Body>
        </Card>
      </div>
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
