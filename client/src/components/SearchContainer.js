import React from 'react';
import Wrapper from '../assets/wrappers/SearchContainer';
import { useAppContext } from "../context/appContext";
import { FormRow, FormRowSelect } from "./index";

const SearchContainer = () => {
    const {
        isLoading,
        handleChange,
        search,
        searchStatus,
        statusOptions,
        jobType,
        jobTypeOptions,
        sort,
        sortOptions,
        clearFilters,
    } = useAppContext()

    const handleSearch = (e) => {
        if (isLoading) return;
        handleChange({ name: e.target.name, value: e.target.value });
    }

    return (
        <Wrapper>
            <form className="form">
                <h4>Search form</h4>
                <div className="form-center">
                    <FormRow
                        type="text"
                        name="search"
                        value={ search }
                        handleChange={ handleSearch }
                    />
                    <FormRowSelect
                        labelText="status"
                        name="searchStatus"
                        value={ searchStatus }
                        handleChange={ handleSearch }
                        list={ ['all', ...statusOptions] }
                    />
                    <FormRowSelect
                        labelText="type"
                        name="jobType"
                        value={ jobType }
                        handleChange={ handleSearch }
                        list={ ['all', ...jobTypeOptions] }
                    />
                    <FormRowSelect
                        labelText="sort"
                        name="sort"
                        value={ sort }
                        handleChange={ handleSearch }
                        list={ sortOptions }
                    />
                    <button
                        type="button"
                        className="btn btn-block btn-danger"
                        disabled={ isLoading }
                        onClick={ clearFilters }
                    >
                        clear filters
                    </button>
                </div>
            </form>
        </Wrapper>
    );
};

export default SearchContainer;