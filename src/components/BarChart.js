import React from 'react';
import {
    BarChart as ReChartBarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';

const BarChart = ({ data }) => {
    return (
        <ResponsiveContainer
            widht="100%"
            height={ 300 }
        >
            <ReChartBarChart data={ data } margin={{top:50}} >
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='date'/>
                <YAxis allowDecimals={false}/>
                <Tooltip/>
                <Bar dataKey='count' fill='#2cb1bc' barSize={75}/>
            </ReChartBarChart>
        </ResponsiveContainer>
    );
};

export default BarChart;