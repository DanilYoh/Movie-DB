import React from "react";
import {debounce} from 'lodash';
import PropTypes from "prop-types";

import "./search-bar.css"

export default class SearchBar extends React.Component {
    debounceSearch = debounce(query =>
        this.props.onSearchMovie(query), 1000
    )

    onFormSubmit = (e) => {
        e.preventDefault()
    }

    onSearch = (e) => {
        let value = e.target.value;
        if (value) {
            this.debounceSearch(value)
        } else {
            this.debounceSearch()
        }
    }



    render() {
        return (
            <form className='search-form' onSubmit={this.onFormSubmit}>
                <input type="text"
                placeholder="type to search"
                className='search-bar'
                onChange={this.onSearch}/>
            </form>
        )
    }
}

SearchBar.defaultProps = {
    onSearchMovie: () => {}
}
SearchBar.propTypes = {
    onSearchMovie: PropTypes.func
}