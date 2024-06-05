import React from "react";
import './coupons.css'
import { Button } from "react-bootstrap";
import { FaCopy, FaExclamationCircle, FaPercentage } from "react-icons/fa";
import { couponInterface } from "../../../types/couponInterface";
import { toast } from "react-toastify";

const CouponComponent: React.FC<{coupons : couponInterface[] | null}> = ({coupons})=>{

    const handleCopy = (couponCode: string) => {
        navigator.clipboard.writeText(couponCode)
            .then(() => {
                toast.success("Coupon code copied to clipboard!");
            })
            .catch(() => {
                toast.error("Failed to copy coupon code.");
            });
    };

    return(
        <>
        <div className="coupon-codes mt-5">
            <h4>Coupons</h4>
            <div className="d-flex justify-content-center align-items-center">
                {coupons && coupons.length > 0 ? (
                    coupons.map((coupon)=>(
                        <div className="coupon" key={coupon._id}>
                            <div className="row align-items-center">
                                <div className="col-3">
                                    <div className="left-coupon">
                                        <span className="percentage">{Math.floor(parseFloat(coupon.discountData.percentage.slice(0, -1)))}%</span>
                                    </div>
                                </div>
                                <div className="col-7">
                                    <div className="coupon-details">
                                        <h5>{coupon.discountData.percentage}% Off</h5>
                                        <p>Valid until: {new Date(coupon.expiry).toLocaleString()}</p>
                                        <p>Code: {coupon.coupon}</p>
                                    </div>
                                </div>
                                <div className="col-2">
                                    <Button className="copy-btn" onClick={() => handleCopy(coupon.coupon)}>
                                        <FaCopy />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="no-coupons-found">
                        <FaExclamationCircle className="no-coupons-icon" />
                    <p>No coupons found</p>
                </div>
                )}
            </div>
        </div>
        </>
    )
}

export default CouponComponent;
