import React from 'react';
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';
import Wrapper from '../assets/wrappers/PageBtnContainer';
import { useAppContext } from "../context/appContext";

const PageBtnContainer = () => {
    const { numOfPages, page, changePage } = useAppContext();

    const prevPage = () => {
        let newPage = page === 1 ? 1 : page - 1;
        changePage(newPage);
    }

    const nextPage = () => {
        let newPage = page === numOfPages ? numOfPages : numOfPages + 1
        changePage(newPage);
    }

    const getButtons = () => {
        let buttons = [];

        for (let i = 1; i <= numOfPages; ++i) {
            buttons.push(
                <button
                    type='button'
                    className={ i === page ? 'pageBtn active' : 'pageBtn' }
                    key={ i }
                    onClick={ () => changePage(i) }
                >{ i }</button>
            )
        }

        return buttons;
    }

    return (
        <Wrapper>
            <button
                className="prev-btn"
                onClick={ prevPage }
            >
                <HiChevronDoubleLeft/>
            </button>

            <div className="btn-container">{ getButtons() }
            </div>

            <button
                className="next-btn"
                onClick={ nextPage }
            >
                <HiChevronDoubleRight/>
            </button>
        </Wrapper>
    );
};

export default PageBtnContainer;