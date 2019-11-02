import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults'
import Playlist from '../Playlist/Playlist'

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      searchResults: [
        {
          name: "Name1",
          artist: "artist1",
          album: "album1",
          id: "id1"
        },
        {
          name: "Name2",
          artist: "artist2",
          album: "album2",
          id: "id2"
        },
        {
          name: "Name3",
          artist: "artist3",
          album: "album3",
          id: "id3"
        },
      ],
      playlistName: "Fuckin playlist",
      playlistTracks: [
        {
          name: "Name1",
          artist: "artist1",
          album: "album1",
          id: "id1"
        },
        {
          name: "Name4",
          artist: "artist4",
          album: "album4",
          id: "id4"
        },
      ],
    }
  }
  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} />
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
