import React, { useEffect } from 'react';
import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/wrappers/JobsContainer";

const JobsContainer = () => {
    const { getJobs, jobs, isLoading, page, totalJobs } = useAppContext();

    useEffect(() => {
        getJobs()
    });

    if (isLoading) {
        return <h1>loading...</h1>
    }

    if (jobs.length === 0) {
        return (
            <Wrapper>
                <h2>No jobs to display</h2>
            </Wrapper>
        );
    }

    return (
        <div>
            Jobs Container
        </div>
    );
};

export default JobsContainer;