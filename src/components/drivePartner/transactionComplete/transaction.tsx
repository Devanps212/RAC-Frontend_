import React from "react";
import { Link, useParams } from "react-router-dom";
import './transaction.css'

const TransactionPage = () => {
  const {transactionId, userId} = useParams()

  console.log(transactionId, userId)
  return (
    <div className="Container d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '100vh', backgroundColor: '#eee', paddingTop: '2rem' }}>
      <div className="wrapping">
        <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
          <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none"/>
          <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
        </svg>
      </div>
      <h3 className="text-center mb-3">Partner Creation Successful</h3>
      <p className="text-center mb-2">Partner created successfully</p>
      <p className="text-center mb-2">Transaction completed with ID: <strong>{transactionId}</strong></p>
      <p className="text-center mb-2">Your account has been credited with ₹250 as a successful partner creation bonus.</p>
      <p className="text-center mb-5">You can now access all partner features and benefits.</p>
      <strong className="text-center mb-2">Login to access the partner Account</strong>
      <Link className="btn btn-light login-success-button" to={"/partner/login"}>Login</Link>
    </div>
  );
};

export default TransactionPage;