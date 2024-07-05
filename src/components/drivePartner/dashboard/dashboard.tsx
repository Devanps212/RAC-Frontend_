import React, { useEffect, useState } from "react";
import './dashboard.css';
import { FaFileInvoice, FaUserAlt, FaUserFriends } from "react-icons/fa";
import { toast } from "react-toastify";
import { bookingFindingBasedOnRole } from "../../../features/axios/api/booking/booking";
import { bookingInterface, bookingInterfaceReschedule, detailBooking } from "../../../types/bookingInterface";
import BarChart from "../../commonComponent/chart/barChart/chart";
import GanttChart from "../../commonComponent/chart/granttChart/granttchart";
import { AxiosResponse } from "axios";
import { io } from "socket.io-client";
import { jwtDecode } from "jwt-decode";
import { useSelector } from "react-redux";
import { RootState } from "../../../features/axios/redux/reducers/reducer";
import { tokenInterface } from "../../../types/payloadInterface";




const PartnerDashboard: React.FC = () => {

    const partnerToken = useSelector((root: RootState)=>root.partnerToken.partnerToken) ?? ''
    const partnerDecode : tokenInterface = jwtDecode(partnerToken)

    const partnerId = partnerDecode.payload


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
    const [ganttData, setGanttData] = useState<any[]>([]);
    const [ganttCategories, setGanttCategories] = useState<string[]>([]);
    const [noBookings, setNoBookings] = useState<boolean>(false);

    const findPartnerBooking = async () => {
        try {
            const data: Partial<detailBooking> = { 
                owner: partnerId,
                ownerRole: 'Partner' 
            };
            const response = await bookingFindingBasedOnRole(data);
            
            const bookings = response.data.data;

            // if (bookings) {
            //     setNoBookings(false);
            //     const partnerBookings = Array.isArray(bookings) ? bookings : [bookings];

            //     const totalBookings = partnerBookings.length;
            //     const totalEarnings = partnerBookings.reduce((sum: number, booking: any) => sum + booking.transaction.amount, 0);

            //     setTotalBookings(totalBookings);
            //     setTotalEarnings(totalEarnings);

            //     const partnerSet = new Set(partnerBookings.map((booking: any) => booking.owner));
            //     setTotalPartners(partnerSet.size);

            //     const labels = partnerBookings.map((booking: any) => booking.date.start);
            //     const earnings = partnerBookings.map((booking: any) => booking.transaction.amount);

            //     setChartData({
            //         labels: labels,
            //         datasets: [
            //             {
            //                 label: 'Earnings',
            //                 data: earnings,
            //                 backgroundColor: 'rgba(75, 192, 192, 0.2)',
            //                 borderColor: 'rgba(75, 192, 192, 1)',
            //                 borderWidth: 1,
            //             }
            //         ]
            //     });

            //     const dateCounts: { [key: string]: number } = {};
            //     partnerBookings.forEach((booking: any) => {
            //         const date = new Date(booking.date.start).toISOString().split('T')[0];
            //         if (dateCounts[date]) {
            //             dateCounts[date]++;
            //         } else {
            //             dateCounts[date] = 1;
            //         }
            //     });

            //     const dateLabels = Object.keys(dateCounts);
            //     const counts = Object.values(dateCounts);

            //     setDateChartData({
            //         labels: dateLabels,
            //         datasets: [
            //             {
            //                 label: 'Bookings',
            //                 data: counts,
            //                 backgroundColor: 'rgba(153, 102, 255, 0.2)',
            //                 borderColor: 'rgba(153, 102, 255, 1)',
            //                 borderWidth: 1,
            //             }
            //         ]
            //     });

            //     const tasks = partnerBookings.map((booking: any) => ({
            //         id: booking.id,
            //         start: new Date(booking.date.start).getTime(),
            //         end: new Date(booking.date.end).getTime(),
            //         name: `Booking ${booking.id}`,
            //         y: partnerBookings.indexOf(booking)
            //     }));

            //     const categories = partnerBookings.map((booking: bookingInterfaceReschedule) => booking.carId.name);
            //     console.log("partner booking : ", partnerBookings)
            //     setGanttData(tasks);
            //     setGanttCategories(categories);
            // } else {
            //     setNoBookings(true);
            //     setTotalBookings(0);
            //     setTotalEarnings(0);
            //     setTotalPartners(0);
            //     setChartData({ labels: [], datasets: [] });
            //     setDateChartData({ labels: [], datasets: [] });
            //     setGanttData([]);
            //     setGanttCategories([]);
            // }
            if (bookings) {
                // Ensure bookings are filtered by the correct partnerId
                const partnerBookings = (Array.isArray(bookings) ? bookings : [bookings]).filter(
                    (booking: any) => booking.owner === partnerId
                );
            
                if (partnerBookings.length > 0) {
                    setNoBookings(false);
            
                    const totalBookings = partnerBookings.length;
                    const totalEarnings = partnerBookings.reduce((sum: number, booking: any) => sum + booking.transaction.amount, 0);
            
                    setTotalBookings(totalBookings);
                    setTotalEarnings(totalEarnings);
            
                    const partnerSet = new Set(partnerBookings.map((booking: any) => booking.owner));
                    setTotalPartners(partnerSet.size);
            
                    const labels = partnerBookings.map((booking: any) => booking.date.start);
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
                        const date = new Date(booking.date.start).toISOString().split('T')[0];
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
            
                    const tasks = partnerBookings.map((booking: any, index: number) => ({
                        id: booking.id,
                        start: new Date(booking.date.start).getTime(),
                        end: new Date(booking.date.end).getTime(),
                        name: `Booking ${booking.id}`,
                        y: index
                    }));
            
                    const categories = partnerBookings.map((booking: bookingInterfaceReschedule) => booking.carId.name);
                    console.log("partner booking : ", partnerBookings)
                    setGanttData(tasks);
                    setGanttCategories(categories);
                } else {
                    setNoBookings(true);
                    setTotalBookings(0);
                    setTotalEarnings(0);
                    setTotalPartners(0);
                    setChartData({ labels: [], datasets: [] });
                    setDateChartData({ labels: [], datasets: [] });
                    setGanttData([]);
                    setGanttCategories([]);
                }
            } else {
                setNoBookings(true);
                setTotalBookings(0);
                setTotalEarnings(0);
                setTotalPartners(0);
                setChartData({ labels: [], datasets: [] });
                setDateChartData({ labels: [], datasets: [] });
                setGanttData([]);
                setGanttCategories([]);
            }
        } catch (error: any) {
            toast.error(error.message);
        }
    };

    useEffect(()=>{
        const socketConnection = io('https://easyrentacar.shop')

        socketConnection.on('newBookingPartner', ({message})=>{
            console.log("message got : ", message)
            toast.info(message)
        })

        socketConnection.on('partnerReport', ({message})=>{
            console.log("report success : ", message)
            toast.warning(message)
        })
        
        return()=>{
            socketConnection.disconnect()
        }

    }, [])

    useEffect(() => {
        findPartnerBooking();
    }, []);

    return (
        <div className="container-fluid">
            <div className="row">
                <h3>Dashboard</h3>
                <div className="contents d-flex flex-column justify-content-center align-items-center">
                    {noBookings ? (
                        <div>Welcome to Partner Dashboard</div>
                    ) : (
                        <>
                            <div className="col-md-6" style={{ width: 'inherit' }}>
                            <div className="row">
                                <div className="col-12 col-md-6 mb-3">
                                    <div className="box-contents box-contents-blue">
                                        <div className="box-one d-flex flex-column justify-content-center align-items-center">
                                            <FaUserAlt className="mt-2" style={{ fontSize: '50px' }} />
                                            <strong className="mt-2">Total Customers</strong>
                                            <h5 className="mt-2">{totalBookings} Nos</h5>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-md-6 mb-3">
                                    <div className="box-contents box-contents-red">
                                        <div className="box-one d-flex flex-column justify-content-center align-items-center">
                                            <FaFileInvoice className="mt-2" style={{ fontSize: '50px' }} />
                                            <strong className="mt-2">Earnings (This Month)</strong>
                                            <h5 className="mt-2">₹ {totalEarnings}</h5>
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
                                            <GanttChart tasks={ganttData} categories={ganttCategories} />
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
};

export default PartnerDashboard;
