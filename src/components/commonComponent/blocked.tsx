import React from "react";
import { Container, Alert, Button } from "react-bootstrap";
import { BiErrorCircle } from "react-icons/bi";


const BlockedPage = () => {
  return (
    <Container className="blocked-container d-flex justify-content-center align-items-center vh-100">
      <Alert variant="danger" className="blocked-alert">
        <div className="d-flex justify-content-center align-items-center mb-4">
           <BiErrorCircle className="error-icon" style={{fontSize:'3rem'}}/> 
        </div>
        <Alert.Heading className="text-center mb-3">Access Denied</Alert.Heading>
        <p>
          We're sorry, but your access to this page has been blocked. Please
          contact support for further assistance.
        </p>
        <hr />
        <p className="mb-0">Here are some actions you can take:</p>
        <ul>
          <li>Review the terms of service and community guidelines.</li>
          <li>Contact support for assistance.</li>
          <li>Go back to the homepage.</li>
        </ul>
      </Alert>
    </Container>
  );
};

export default BlockedPage;
