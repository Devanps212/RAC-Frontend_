import React, { useEffect, useState } from 'react';
import './paymentLoader.css';
import { FaCheckCircle, FaCreditCard, FaSpinner } from 'react-icons/fa';

const PaymentFlow: React.FC = () => {
    const [stage, setStage] = useState<'initiating' | 'processing' | 'success'>('initiating');

    useEffect(() => {
        initiatePayment();
    }, []);

    const initiatePayment = () => {
        console.log("starting process");
        setTimeout(() => {
            setStage('processing');
            console.log("Payment processing");
            setTimeout(() => {
                setStage('success');
                console.log("Payment success");

                setTimeout(() => {
                    console.log("Payment process completed");
                }, 2000);
            }, 3000);
        }, 1000);
    };

    return (
        <div className={`payment-container ${stage !== 'initiating' ? 'blur-background' : ''}`}>
        {stage === 'initiating' && (
            <div className="loader initiating">
            <FaCreditCard className="payment-icon" />
            <p>Payment Initiating...</p>
            </div>
        )}
        {stage === 'processing' && (
            <div className="loader processing">
            <FaSpinner className="payment-icon spinning" />
            <p>Payment Processing...</p>
            </div>
        )}
        {stage === 'success' && (
            <div className="loader success">
            <FaCheckCircle className="payment-icon" />
            <p>Payment Successful!</p>
            </div>
        )}
        </div>
    );
};

export default PaymentFlow;
