import React, { useEffect, useState } from "react";
import './dashBoard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaBook, FaFileInvoice, FaUserAlt, FaUserFriends } from "react-icons/fa";
import BarChart from "../../commonComponent/chart/barChart/chart";
import { detailBooking } from "../../../types/bookingInterface";
import { toast } from "react-toastify";
import { findBookings } from "../../../features/axios/api/booking/booking";
import LineChart from "../../commonComponent/chart/lineChart/lineChart";
import { findAllUsers, findUser } from "../../../features/axios/api/user/user";
import { userDetailPayload } from "../../../types/payloadInterface";
import { findAllPartner } from "../../../features/axios/api/partner/partner";
import { partnerDetailInterface } from "../../../types/partnerInterface";

const Dashboard: React.FC = () => {
    const [chartData, setChartData] = useState<any>({
        labels: [],
        datasets: []
    });

    const [dateChartData, setDateChartData] = useState<any>({
        labels: [],
        datasets: []
    });

    const [totalCustomers, setTotalCustomers] = useState<number>(0);
    const [totalBookings, setTotalBookings] = useState<number>(0);
    const [totalPartners, setTotalPartners] = useState<number>(0);
    const [totalAmountEarned, setTotalAmountEarned] = useState<number>(0);

    useEffect(() => {
        const fetchUsers = async()=>{
            const response: userDetailPayload[] | userDetailPayload = await findAllUsers()
            if(Array.isArray(response)){
                const totalCustomerNumber = response.length
                setTotalCustomers(totalCustomerNumber)
            }
        }


        const fetchPartner = async()=>{
            const response : partnerDetailInterface[] = await findAllPartner()
            setTotalPartners(response.length)
        }


        const fetchBookings = async () => {
            try {
                const response = await findBookings('all');
                
                const bookings: detailBooking[] | detailBooking | null = response.data;

                const statusCounts: { [key: string]: number } = {};
                const totalAmounts: { [key: string]: number } = {};
                const bookingsByDate: { [key: string]: number } = {};

                let currentMonthBookings = 0;
                let currentMonthAmount = 0;

                if (Array.isArray(bookings)) {
                    bookings.forEach((booking: detailBooking) => {
                        const status = booking.status;
                        if (statusCounts[status]) {
                            statusCounts[status]++;
                        } else {
                            statusCounts[status] = 1;
                        }

                        const amount = booking.transaction?.amount ?? 0;
                        const transactionId = booking.transaction?.transactionId;

                        if (transactionId) {
                            if (totalAmounts[transactionId]) {
                                totalAmounts[transactionId] += amount;
                            } else {
                                totalAmounts[transactionId] = amount;
                            }
                        }

                        const date = new Date(booking.date.start).toISOString().split('T')[0];
                        if (bookingsByDate[date]) {
                            bookingsByDate[date]++;
                        } else {
                            bookingsByDate[date] = 1;
                        }

                       

                        const bookingMonth = new Date(booking.date.start).getMonth();
                        const currentMonth = new Date().getMonth();
                        if (bookingMonth === currentMonth) {
                            currentMonthBookings++;
                            currentMonthAmount += amount;
                        }
                    });
                } else if (bookings) {
                    const status = bookings.status;
                    if (statusCounts[status]) {
                        statusCounts[status]++;
                    } else {
                        statusCounts[status] = 1;
                    }

                    const amount = bookings.transaction?.amount ?? 0;
                    const transactionId = bookings.transaction?.transactionId;

                    if (transactionId) {
                        if (totalAmounts[transactionId]) {
                            totalAmounts[transactionId] += amount;
                        } else {
                            totalAmounts[transactionId] = amount;
                        }
                    }

                    const date = new Date(bookings.date.start).toISOString().split('T')[0];
                    if (bookingsByDate[date]) {
                        bookingsByDate[date]++;
                    } else {
                        bookingsByDate[date] = 1;
                    }

                    

                    const bookingMonth = new Date(bookings.date.start).getMonth();
                    const currentMonth = new Date().getMonth();
                    if (bookingMonth === currentMonth) {
                        currentMonthBookings++;
                        currentMonthAmount += amount;
                    }
                }

                setTotalBookings(currentMonthBookings);

                setTotalAmountEarned(currentMonthAmount);

                setChartData({
                    labels: Object.keys(statusCounts),
                    datasets: [
                        {
                            label: "Number of Bookings by Status",
                            data: Object.values(statusCounts),
                            backgroundColor: 'rgba(75,192,192,0.4)',
                            borderColor: 'rgba(75,192,192,1)',
                            borderWidth: 1
                        },
                        {
                            label: "Total Booking Amounts",
                            data: Object.values(totalAmounts),
                            backgroundColor: 'rgba(255,99,132,0.4)',
                            borderColor: 'rgba(255,99,132,1)',
                            borderWidth: 1
                        }
                    ]
                });
                setDateChartData({
                    labels: Object.keys(bookingsByDate),
                    datasets: [
                        {
                            label: "Number of Bookings by Date",
                            data: Object.values(bookingsByDate),
                            backgroundColor: 'rgba(153,102,255,0.4)',
                            borderColor: 'rgba(153,102,255,1)',
                            borderWidth: 1
                        }
                    ]
                });
            } catch (error: any) {
                toast.error(error.message);
            }
        }
        fetchBookings();
        fetchUsers()
        fetchPartner()
    }, []);

    return (
        <div className="container-fluid">
            <div className="row">
                <h3>Dashboard</h3>
                <div className="contents d-flex flex-column justify-content-center align-items-center">
                    <div className="col-md-6" style={{ width: 'inherit' }}>
                        <div className="row">
                            <div className="col-12 col-md-3 mb-3">
                                <div className="box-contents box-contents-blue">
                                    <div className="box-one d-flex flex-column justify-content-center align-items-center">
                                        <FaUserAlt className="mt-2" style={{ fontSize: '50px' }} />
                                        <strong className="mt-2">Total Customers</strong>
                                        <h5 className="mt-2">{totalCustomers} Nos</h5>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-3 mb-3">
                                <div className="box-contents box-contents-yellow">
                                    <div className="box-one d-flex flex-column justify-content-center align-items-center">
                                        <FaBook className="mt-2" style={{ fontSize: '50px' }} />
                                        <strong className="mt-2">Bookings (This Month)</strong>
                                        <h5 className="mt-2">{totalBookings} Nos</h5>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-3 mb-3">
                                <div className="box-contents box-contents-red">
                                    <div className="box-one d-flex flex-column justify-content-center align-items-center">
                                        <FaFileInvoice className="mt-2" style={{ fontSize: '50px' }} />
                                        <strong className="mt-2">Earnings (This Month)</strong>
                                        <h5 className="mt-2">₹ {totalAmountEarned}</h5>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-3 mb-3">
                                <div className="box-contents box-contents-green">
                                    <div className="box-one d-flex flex-column justify-content-center align-items-center">
                                        <FaUserFriends className="mt-2" style={{ fontSize: '50px' }} />
                                        <strong className="mt-2">Total Partners</strong>
                                        <h5 className="mt-2">{totalPartners} Nos</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 mt-4">
                        <div className="row">
                            <div className="col-12 col-xl-6 chart-container">
                                <div className="chart">
                                    <BarChart data={chartData} />
                                </div>
                            </div>
                            <div className="col-12 col-xl-6 chart-container">
                                <div className="chart">
                                    <LineChart data={dateChartData} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
