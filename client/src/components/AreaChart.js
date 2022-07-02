import React from 'react';
import {
    ResponsiveContainer,
    AreaChart as ReChartAreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";

const AreaChart = ({ data }) => {
    return (
        <ResponsiveContainer
            width='100%'
            height={ 300 }
        >
            <ReChartAreaChart
                data={ data }
                margin={ { top: 50 } }
            >
                <CartesianGrid strokeDasharray='3 3'/>
                <XAxis dataKey='date'/>
                <YAxis allowDecimals={ false }/>
                <Tooltip/>
                <Area
                    type='monotone'
                    dataKey='count'
                    stroke='#2cb1bc'
                    fill='#bef8fd'
                />
            </ReChartAreaChart>
        </ResponsiveContainer>
    );
};

export default AreaChart;