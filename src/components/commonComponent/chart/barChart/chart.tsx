import React, { useRef, useEffect, useState } from "react";
import './chart.css';
import Chart from 'chart.js/auto';
import { Chart as ChartJS } from 'chart.js';

interface BarChartProps {
    data: {
        labels: string[];
        datasets: any[];
    };
}

const BarChart: React.FC<BarChartProps> = ({ data }) => {
    const chartRef = useRef<HTMLDivElement | null>(null);

    const [chartInstance, setChartInstance] = useState<ChartJS | null>(null);

    useEffect(() => {
        let newChartInstance: ChartJS | null = null;

        const ctx = chartRef.current?.querySelector("canvas")?.getContext("2d");
        if (ctx) {
            if (chartInstance) {
                chartInstance.destroy();
            }
            
            newChartInstance = new Chart(ctx, {
                type: 'bar',
                data: data,
                options: {
                    responsive: true,
                    maintainAspectRatio: false
                }
            });

            setChartInstance(newChartInstance);
        }

        return () => {
            if (newChartInstance) {
                newChartInstance.destroy();
            }
        };
    }, [data]);

    return (
        <div className="chart fade-in">
            <div className="chart-header">
                <strong>Booking based on Status</strong>
            </div>
            <div ref={chartRef} className="chart-canvas">
                <canvas id="barChart" />
            </div>
        </div>
    );
}

export default BarChart;
