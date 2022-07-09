import React from 'react';
import StatsItem from "./StatsItem";
import { useAppContext } from "../context/appContext";
import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from "react-icons/fa";
import Wrapper from '../assets/wrappers/StatsContainer';

const StatsContainer = () => {
    const { stats } = useAppContext();

    const statsItemData = [
        {
            title: 'pending applications',
            count: stats.pending,
            icon: <FaSuitcaseRolling/>,
            color: '#e9b949',
            bgc: '#fcefc7',
        },
        {
            title: 'interviews schedule',
            count: stats.interview,
            icon: <FaCalendarCheck/>,
            color: '#647acb',
            bgc: '#e0e8f9',
        },
        {
            title: 'jobs declined',
            count: stats.declined,
            icon: <FaBug/>,
            color: '#d66a6a',
            bgc: '#ffeeee',
        },
    ];

    return (
        <Wrapper>
            {
                statsItemData.map((item, index) => {
                    return <StatsItem key={index} {...item} />
                })
            }
        </Wrapper>
    );
};

export default StatsContainer;