import './SearchBar.css'
import React from 'react'

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.search = this.search.bind(this)
    this.handleTermChange = this.handleTermChange.bind(this)
  }

  search(event) {
    // this.props.onSearch(event)
    console.log(event)
  }

  handleTermChange(event) {
    this.search(event.target.value)
  }

  render () {
    return (
      <div className="SearchBar">
        <input placeholder="Enter A Song, Album, or Artist" onChange={this.handleTermChange}/>
        <button className="SearchButton">SEARCH</button>
      </div>
    )
  }
};

export default SearchBar
