import React, { useEffect, useState } from "react";
import './dashboard.css';
import { FaFileInvoice, FaUserAlt, FaUserFriends } from "react-icons/fa";
import { toast } from "react-toastify";
import { bookingFindingBasedOnRole } from "../../../features/axios/api/booking/booking";
import { detailBooking } from "../../../types/bookingInterface";
import BarChart from "../../commonComponent/chart/barChart/chart";
import LineChart from "../../commonComponent/chart/lineChart/lineChart";
import { AxiosResponse } from "axios";

const PartnerDashboard: React.FC = () => {
    const [totalBookings, setTotalBookings] = useState<number>(0);
    const [totalPartners, setTotalPartners] = useState<number>(0);
    const [totalEarnings, setTotalEarnings] = useState<number>(0);
    const [chartData, setChartData] = useState<any>({
        labels: [],
        datasets: []
    });
    const [dateChartData, setDateChartData] = useState<any>({
        labels: [],
        datasets: []
    });
    const [noBookings, setNoBookings] = useState<boolean>(false);

    const findPartnerBooking = async () => {
        try {
            const data: Partial<detailBooking> = { ownerRole: 'Partner' };
            const response: AxiosResponse = await bookingFindingBasedOnRole(data);
            const bookings: detailBooking[] = response.data.data;
            console.log("bookings :", bookings);

            if (bookings.length > 0) {
                setNoBookings(false);

                // Filter bookings based on owner role 'Partner'
                const partnerBookings = bookings.filter((booking: any) => booking.ownerRole === 'Partner');
                console.log("partner bookings : ", partnerBookings);

                // Calculate total bookings and total earnings
                const totalBookings = partnerBookings.length;
                const totalEarnings = partnerBookings.reduce((sum: number, booking: any) => sum + booking.transaction.amount, 0);

                setTotalBookings(totalBookings);
                setTotalEarnings(totalEarnings);

                const partnerSet = new Set(partnerBookings.map((booking: any) => booking.owner));
                setTotalPartners(partnerSet.size);

                const labels = partnerBookings.map((booking: any) => booking.date); 
                const earnings = partnerBookings.map((booking: any) => booking.transaction.amount); 

                setChartData({
                    labels: labels,
                    datasets: [
                        {
                            label: 'Earnings',
                            data: earnings,
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1,
                        }
                    ]
                });

    
                const dateCounts: { [key: string]: number } = {};
                partnerBookings.forEach((booking: any) => {
                    const date = booking.date;
                    if (dateCounts[date]) {
                        dateCounts[date]++;
                    } else {
                        dateCounts[date] = 1;
                    }
                });

                const dateLabels = Object.keys(dateCounts);
                const counts = Object.values(dateCounts);

                setDateChartData({
                    labels: dateLabels,
                    datasets: [
                        {
                            label: 'Bookings',
                            data: counts,
                            backgroundColor: 'rgba(153, 102, 255, 0.2)',
                            borderColor: 'rgba(153, 102, 255, 1)',
                            borderWidth: 1,
                        }
                    ]
                });
            } else {
                setNoBookings(true);
                setTotalBookings(0);
                setTotalEarnings(0);
                setTotalPartners(0);
                setChartData({ labels: [], datasets: [] });
                setDateChartData({ labels: [], datasets: [] });
            }
        } catch (error: any) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        findPartnerBooking();
    }, []);

    return (
        <div className="container-fluid">
            <div className="row">
                <h3>Dashboard</h3>
                <div className="contents d-flex flex-column justify-content-center align-items-center">
                    {noBookings ? (
                        <div>No bookings found for partners.</div>
                    ) : (
                        <>
                            <div className="col-md-6" style={{ width: 'inherit' }}>
                                <div className="row">
                                    <div className="col-12 col-md-4 mb-3">
                                        <div className="box-contents box-contents-blue">
                                            <div className="box-one d-flex flex-column justify-content-center align-items-center">
                                                <FaUserAlt className="mt-2" style={{ fontSize: '50px' }} />
                                                <strong className="mt-2">Total Customers</strong>
                                                <h5 className="mt-2">{totalBookings} Nos</h5>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-4 mb-3">
                                        <div className="box-contents box-contents-red">
                                            <div className="box-one d-flex flex-column justify-content-center align-items-center">
                                                <FaFileInvoice className="mt-2" style={{ fontSize: '50px' }} />
                                                <strong className="mt-2">Earnings (This Month)</strong>
                                                <h5 className="mt-2">₹ {totalEarnings}</h5>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-4 mb-3">
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
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default PartnerDashboard;
