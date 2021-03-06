import React from 'react';
import { FormRow, FormRowSelect, Alert } from '../../components';
import { useAppContext } from '../../context/appContext';
import Wrapper from '../../assets/wrappers/DashboardFormPage';

const AddJob = () => {
    const {
        showAlert,
        displayAlert,
        position,
        company,
        isEditing,
        editJob,
        isLoading,
        jobLocation,
        jobType,
        jobTypeOptions,
        status,
        statusOptions,
        handleChange,
        clearValues,
        createJob,
    } = useAppContext();

    const handleSubmit = e => {
        e.preventDefault();

        if (!position || !company || !jobLocation) {
            displayAlert();
            return;
        }

        if (isEditing) {
            editJob()
            return;
        }

        createJob();
    }

    const handleJobInput = e => {
        handleChange({ name: e.target.name, value: e.target.value });
    }

    return (
        <Wrapper>
            <form className="form">
                <h3>{ isEditing ? 'edit job' : 'add job' }</h3>
                { showAlert && <Alert/> }

                <div className="form-center">
                    <FormRow
                        type='text'
                        name='position'
                        value={ position }
                        handleChange={ handleJobInput }
                    />
                    <FormRow
                        type='text'
                        name='company'
                        value={ company }
                        handleChange={ handleJobInput }
                    />
                    <FormRow
                        type='text'
                        labelText='location'
                        name='jobLocation'
                        value={ jobLocation }
                        handleChange={ handleJobInput }
                    />
                    <FormRowSelect
                        name="status"
                        value={ status }
                        list={ statusOptions }
                        handleChange={ handleJobInput }
                    />
                    <FormRowSelect
                        labelText="job type"
                        name="jobType"
                        value={ jobType }
                        list={ jobTypeOptions }
                        handleChange={ handleJobInput }
                    />

                    <div className="btn-container">
                        <button
                            className='btn btn-block submit-btn'
                            type='submit'
                            onClick={ handleSubmit }
                            disabled={ isLoading }
                        >
                            submit
                        </button>
                        <button
                            type="button"
                            className="btn btn-block clear-btn"
                            onClick={ e => clearValues() }
                        >
                            clear
                        </button>
                    </div>
                </div>
            </form>
        </Wrapper>
    );
};

export default AddJob;