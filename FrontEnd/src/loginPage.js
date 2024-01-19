import React, { useState } from 'react';
import { Container, Form, Button, Col, Row } from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';


export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('')
    const [errors, setErrors] = useState([]);
    let navigate = useNavigate();
   ;
    const CheckValue = () => {
      var errors = [];
      if (username.trim().length === 0) {
  
        errors.push("User Id is required");
       
      }
      if (password.trim().length === 0 && password.trim().length <8) {
  
        errors.push("Password is required with minimum legth 8");
       
      }
      else{
        login();
      }
      setErrors(errors);
  
    };
    
    const login = async () => {
      
      try {
          const response = await fetch('http://localhost:3001/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
          });
    
          if (response.ok) {
            alert('Logged in successfully');
            setToken(response.body);
            setUsername('');
            setPassword('');
            navigate(`/dashboard/${username}`);
          } else {
            alert('Login failed');
          }
        } catch (error) {
          console.error('Login error:', error);
          alert('Login failed');
        }
      };
    
    return (
     <div>
      
    <Container>
    <Form>
    <Row>
         <Col xs={12}>
            <h2> LOG IN:</h2>
            <h5>Using your User Name and Password:</h5>
            <div>
              <Row>
                <Col xs={3}></Col>
                <Col xs={6}>
                  <Form.Group className="Userid" controlId="Id">
                    <Form.Label> User Name:</Form.Label>
                    <Form.Control type="text" placeholder="User Name" value={username} onChange={(e) => setUsername(e.target.value)} />
                  </Form.Group>
                </Col>
                <Col xs={3}></Col>
              </Row>
            </div>

            <div>
              <Row>
                <Col xs={3}></Col>
                <Col xs={6}>
                  <Form.Group className="password" controlId="Password">
                    <Form.Label> Password:</Form.Label>
                    <Form.Control type="password" placeholder="********" value={password} onChange={(e) => setPassword(e.target.value)} />
                  </Form.Group>
                </Col>
                <Col xs={3}></Col>
              </Row>
            </div>
            <div></div>
            <div style={{ color: "red" }}>
              {errors.map((a) => (
                <div> {a}</div>
              ))}

            </div>
            <hr></hr>
            <div>
             <Button variant="info" onClick={() => {
             CheckValue()}}>Login</Button>
            </div>
          </Col>
          </Row>
          </Form>
          </Container>
     </div>

    );
}
