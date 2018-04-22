import React, { Component } from 'react';
import axios from 'axios';
// import '../assets/stylesheets/Search.scss';
import SearchResults from './SearchResults';

export default class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.loadState();
  }

  loadState = () => {
    try {
      const serializedState = localStorage.getItem('SearchBarState');
      if (serializedState != null) {
        this.state = JSON.parse(serializedState);
      } else {
        this.state = {
          searchTerm: '',
          cachedData: {}
        };
      }
    } catch (err) {
      console.log(err);
    }
  };

  saveState = () => {
    const serializedState = JSON.stringify({ ...this.state, searchTerm: '' });
    try {
      localStorage.setItem('SearchBarState', serializedState);
    } catch (err) {
      console.log(err);
    }
  };

  updateCachedData = data => {
    this.setState(
      {
        cachedData: {
          ...this.state.cachedData,
          [this.state.searchTerm]: data.city
        }
      },
      () => {
        this.saveState();
      }
    );
  };

  handleSearch = () => {
    const API_KEY = 'a3cb99e4a46d3c130772308d454ee522';
    const ROOT_URL = `http://api.openweathermap.org/data/2.5/forecast?appid=${API_KEY}`;
    const url = `${ROOT_URL}&q=${this.state.searchTerm}`;
    axios
      .get(url)
      .then(response => {
        this.updateCachedData(response.data);
        console.log('response', response.data);
        this.updateCachedData(response.data);
      })
      .catch(error => {});
  };

  render() {
    let { cachedData, searchTerm } = this.state;
    console.log(cachedData[searchTerm]);
    return (
      <div>
        <input
          type="text"
          onChange={e => {
            this.setState({ searchTerm: e.target.value });
          }}
          onKeyPress={e => {
            if (e.key === 'Enter') {
              if (!(searchTerm in cachedData)) {
                this.handleSearch();
              }
            }
          }}
        />
        {/* <button onClick={this.handleSearch}>OK</button> */}
        <SearchResults data={cachedData[searchTerm]} />
      </div>
    );
  }
}
