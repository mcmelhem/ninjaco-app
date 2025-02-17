import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../../Images/Ninjaco-Logo.png';
import { Form, Button, Container, Row, Col, InputGroup } from 'react-bootstrap';
import { useAuth } from "../../hooks/AuthProvider";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faKey } from '@fortawesome/free-solid-svg-icons';
import './Login.scss';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [validated, setValidated] = useState(false);
  const auth = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      if (username !== "" && password !== "") {
       await auth.logIn({ username, password });
      

      }
    }

  };
  return (
    <div className='wrapper'>
      <Container className="login-container my-4 w-75">
        <Row className="h-100">
          <Col xs={12} sm={12} md={6} lg={6} className='p-0 login-container-img'>
            <div className="dis-flex-cen flex-column h-100 p-4 ">
              <img src={logo} alt="logo" className="img-fluid" />
            </div>
          </Col>
          <Col xs={12} sm={12} md={6} lg={6}>
            <div className="login-container-form-text">
              <div className="login-container-text">
                <h1>Welcome to the House of NinjaCoders!</h1>
              </div>
              <div className="login-container-form">
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="userName">
                    <InputGroup hasValidation>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faUser} />
                      </InputGroup.Text>
                      <Form.Control
                        type="username"
                        placeholder="UserName"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                      />
                    </InputGroup>
                    <Form.Control.Feedback type="invalid">
                      Please choose a username.
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="password">
                    <InputGroup hasValidation>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faKey} />
                      </InputGroup.Text>
                      <Form.Control
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </InputGroup>
                    <Form.Control.Feedback type="invalid">
                      Please choose a password.
                    </Form.Control.Feedback>
                  </Form.Group>
                 
                  <div className="dis-flex-cen flex-column">
                    <Button variant="primary" type="submit" className="btn btn-primary btn-submit">
                      Submit
                    </Button></div>
                </Form>
              </div>
            </div>
          </Col>

        </Row>
      </Container>
    </div>
  );
}

export default Login;