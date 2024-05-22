import React from "react";
import './lineChart.css'
import { Line } from 'react-chartjs-2';
import { ChartData, ChartOptions } from 'chart.js';

interface LineChartProps {
    data: ChartData<'line'>;
    options?: ChartOptions<'line'>;
  }


const LineChart: React.FC<LineChartProps> = ({ data, options })=>{
    return(
        <div className="line-chart">
            <strong>Booking based on Date</strong>
            <Line data={data} options={options} id="chart-line" />
        </div>
    ) 
}

export default LineChart