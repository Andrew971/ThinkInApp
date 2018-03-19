import React, { Component } from 'react';
import { searchWord } from '../../../../Redux/Actions/searchAction'
import { searchStatus } from '../../../../Redux/Actions/searchAction'
import { connect } from 'react-redux';
import ResultBox from './ResultBox'

class Search extends Component {

  Search = () => {
    const { search } = this.searchForm
    const { dispatch } = this.props
    if (search.value !== '') {
      dispatch(searchWord(search.value))
      dispatch(searchStatus(true))
    } else {
      dispatch(searchStatus(false))
    }
  }

  render() {
    const { dispatch } = this.props
    return (
      <div className="col-6">
        <form className="search" ref={self => this.searchForm = self}
          onBlur={() => {
            this.searchForm.search.value = ''
          }}

          onFocus={() => {
            dispatch(searchStatus(true))
          }}
        >
          <input
            type="text"
            placeholder="Search..."
            name="search"
            onKeyUp={this.Search}
          />

        </form>

        <ResultBox />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    status: state.search.status
  }
}


export default connect(mapStateToProps)(Search);
