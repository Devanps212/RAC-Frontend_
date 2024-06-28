import React, { useEffect, useState } from "react";
import './coupon.css';
import { Button, Table } from "react-bootstrap";
import { UpdateCoupon, findAll, generator } from "../../../../features/axios/api/coupon/coupon";
import { couponInterface } from "../../../../types/couponInterface";
import { toast } from "react-toastify";

const CouponGeneration = () => {
    const [coupon, setCoupon] = useState<couponInterface | null>(null);
    const [coupons, setCoupons] = useState<couponInterface[]>([]);
    const [price, setPrice] = useState<number | string>('');
    const [expiryDate, setExpiryDate] = useState<Date>(new Date());
    const currentDate = new Date().toISOString().split('T')[0];
    const generateCoupon = async () => {
        if (price !== '') {
            try {
                const formattedExpiryDate = formatDate(expiryDate);
                const couponGenerator = await generator(Number(price), formattedExpiryDate);
                console.log(couponGenerator);
                setCoupon(couponGenerator);
                toast.success(couponGenerator.status);
                await loadAllCoupons();
            } catch (error: any) {
                console.error("Error generating coupon:", error);
                console.log(error.message);
                toast.error(error.message);
            }
        } else {
            alert('Please enter the car price.');
        }
    };

    useEffect(() => {
        loadAllCoupons();
    }, []);

    const loadAllCoupons = async () => {
        try {
            const allCoupons = await findAll('all');
            console.log("all coupons: ", allCoupons);
            setCoupons(allCoupons);
        } catch (error: any) {
            console.error("Error fetching coupons:", error.message);
        }
    };

    const handleDelete = async (coupon: couponInterface) => {
        try {
            const data: Partial<couponInterface> = {
                active: false,
                _id: coupon._id
            };
            const response = await UpdateCoupon(data);
            console.log(response);
            toast.success(`Coupon ${coupon.coupon} deactivated successfully`);
            await loadAllCoupons();
        } catch (error: any) {
            console.error("Error deactivating coupon:", error.message);
            toast.error(error.message);
        }
    };

    const handleActivate = async (coupon: couponInterface) => {
        try {
            const data: Partial<couponInterface> = {
                active: true,
                _id: coupon._id
            };
            const response = await UpdateCoupon(data);
            console.log(response);
            toast.success(`Coupon ${coupon.coupon} activated successfully`);
            await loadAllCoupons(); 
        } catch (error: any) {
            console.error("Error activating coupon:", error.message);
            toast.error(error.message);
        }
    };

    const formatDate = (date: Date): string => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    return (
        <div className="container-fluid">
            <div className="row d-flex flex-column justify-content-center align-items-center">
                <div className="col-12 col-md-6">
                    <div className="main-contents">
                        <h5 className="title">Coupon Generate</h5>
                        <div className="input-group mb-3">
                        <label>Car Price:</label>
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Enter car price"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>
                        <div className="input-group mb-3">
                        <label>Select a valid date:</label>
                        <input
                            type="date"
                            className="form-control"
                            min={currentDate}
                            value={formatDate(expiryDate)}
                            onChange={(e) => setExpiryDate(new Date(e.target.value))}
                        />
                        </div>
                        <div className="input-group mb-3 animated">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Coupon will generate here"
                                value={coupon?.coupon || ''}
                                readOnly
                            />
                        </div>
                        {coupon && (
                            <div className="mb-3">
                                <strong>Discount Amount:</strong> ₹ {coupon.discountData.amount}<br />
                                <strong>Amount:</strong> ₹ {coupon.price}<br/>
                                <strong>Discount Percentage:</strong> {coupon.discountData.percentage}%
                            </div>
                        )}
                        <Button onClick={generateCoupon} className="generate-btn">Generate</Button>
                    </div>
                </div>
                <div className="col-12 col-md-10">
                    <Table responsive striped hover className="custom-table mt-5">
                        <thead>
                            <tr>
                            <th>#</th>
                            <th>Code</th>
                            <th>Amount</th>
                            <th>Percentage</th>
                            <th>Reduction</th>
                            <th>Expiry</th>
                            <th>Applicable</th>
                            <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {coupons.map((coupon, index) => (
                                <tr key={coupon._id} className="coupon-row">
                                    <td>{index + 1}</td>
                                    <td>{coupon.coupon}</td>
                                    <td>₹ {coupon.price.toFixed(2)}</td>
                                    <td>{coupon.discountData.percentage}%</td>
                                    <td>₹ {coupon.discountData.amount}</td>
                                    <td>{new Date(coupon.expiry).toLocaleString()}</td>
                                    <td>₹ {coupon.ApplyPrice.minApply} - ₹ {coupon.ApplyPrice.maxApply}</td>
                                    <td>
                                        {coupon.active ? (
                                            <Button variant="danger" onClick={() => handleDelete(coupon)} size="sm">Deactivate</Button>
                                        ) : (
                                            <Button variant="success" onClick={() => handleActivate(coupon)} size="sm">Activate</Button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    );
};

export default CouponGeneration;
