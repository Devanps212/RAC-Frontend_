import React from "react";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsGantt from 'highcharts/modules/gantt';
import './granttchart.css';

if (typeof Highcharts === 'object') {
    HighchartsGantt(Highcharts);
}

interface GanttChartProps {
    tasks: any[];
    categories: string[];
}

const GanttChart: React.FC<GanttChartProps> = ({ tasks, categories }) => {
    const options: Highcharts.Options = {
        title: {
            text: 'Gantt Chart'
        },
        series: [{
            type: 'gantt',
            name: 'Bookings',
            data: tasks
        }],
        xAxis: {
            type: 'datetime'
        },
        yAxis: {
            title: {
                text: 'Bookings'
            },
            categories: categories
        }
    };

    return (
        <div className="chart fade-in">
            <div className="chart-header">
                <strong>Booking Gantt Chart</strong>
            </div>
            <div className="chart-canvas">
                <HighchartsReact
                    highcharts={Highcharts}
                    constructorType={'ganttChart'}
                    options={options}
                />
            </div>
        </div>
    );
};

export default GanttChart;
