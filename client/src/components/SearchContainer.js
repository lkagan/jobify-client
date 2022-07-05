import React from 'react';
import Wrapper from '../assets/wrappers/SearchContainer';
import { useAppContext } from "../context/appContext";
import { FormRow } from "./index";

const SearchContainer = () => {
    const { isLoading, handleChange, search } = useAppContext()

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
                </div>
            </form>
        </Wrapper>
    );
};

export default SearchContainer;