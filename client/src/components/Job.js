import React from 'react';
import moment from "moment";
import { FaLocationArray, FaBriefcase, FaCalendarAlt } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useAppContext } from "../context/appContext";
import Wrapper from '../assets/wrappers/Job';
import { JobInfo } from "./JobInfo";

const Job = ({
                 _id,
                 company,
                 createdAt,
                 jobLocation,
                 position,
                 jobType,
                 status
             }) => {

    const { setEditJob, deleteJob } = useAppContext();

    return (
        <>
            <Wrapper>
                <header>
                    <div className="main-icon">{ company.charAt(0) }</div>
                    <div className="info">
                        <h5>{ position }</h5>
                        <h5>{ company }</h5>
                    </div>
                </header>
                <div className="content">
                    {/*<h5>{ moment(createdAt).format('MMM Do, YYYY') }</ddh5>*/}
                    <footer>
                        <div className="actions">
                            <Link
                                to='/add-job'
                                onClick={ () => setEditJob(_id) }
                                className='btn edit-btn'
                            >
                                Edit
                            </Link>
                            <button
                                type="button"
                                className="btn delete-btn"
                                onClick={ () => deleteJob(_id) }
                            >
                                Delete
                            </button>
                        </div>
                    </footer>
                </div>
            </Wrapper>
        </>
    );
};

export default Job;