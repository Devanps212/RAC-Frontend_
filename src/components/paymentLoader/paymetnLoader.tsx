import React, { useState } from 'react';
import './paymentLoader.css';

const PaymentFlow: React.FC = () => {
    const [stage, setStage] = useState<'initiating' | 'processing' | 'success'>('initiating');

    const initiatePayment = () => {
        setStage('processing')
        setTimeout(() => {
            setStage('success');
        }, 2000);
    };

    return (
        <div className="payment-container">
            {stage === 'initiating' && (
                <div className="loader initiating">
                    <p>Payment Initiating...</p>
                </div>
            )}
            {stage === 'processing' && (
                <div className="loader processing">
                    <p>Payment Processing...</p>
                </div>
            )}
            {stage === 'success' && (
                <div className="loader success">
                    <p>Payment Successful!</p>
                </div>
            )}
            {stage === 'initiating' && (
                <button className="initiate-button" onClick={initiatePayment}>Initiate Payment</button>
            )}
        </div>
    );
};

export default PaymentFlow;
