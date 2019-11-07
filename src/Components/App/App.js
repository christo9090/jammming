import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults'
import Playlist from '../Playlist/Playlist'
import Spotify from '../../util/spotify'

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
    this.addTrack = this.addTrack.bind(this)
    this.removeTrack = this.removeTrack.bind(this)
    this.updatePlaylistName = this.updatePlaylistName.bind(this)
    this.savePlaylist = this.savePlaylist.bind(this)
    this.search = this.search.bind(this)
  }

  addTrack(track) {
    let tracks = this.state.playlistTracks;

    if (tracks.find((savedTracks) => savedTracks.id === track.id)) {
      return;
    } else {
      tracks.push(track)
      this.setState({
        playlistTracks: tracks
      });
    }
  };

  removeTrack(track) {
    let tracks = this.state.playlistTracks;
    for (let i = 0; tracks.length > i; i++) {
      if (tracks[i].id === track.id) {
        let songNumber = i
        tracks.splice(songNumber, 1)
      }
    }
    this.setState({
      playlistTracks: tracks
    });
  }

  updatePlaylistName(name) {
    this.setState({
      playlistName: name
    })
  }

  savePlaylist() {
    let trackURIs = []
    this.state.playlistTracks.map(track => {
      return trackURIs.push(track.id)
    })
    console.log(trackURIs)
    Spotify.savePlaylist("test", 'test')
  }

  search(term) {
    Spotify.search(term).then(searchResults => {
      this.setState({
        searchResults: searchResults
      })
    })

    // console.log(term)
  }



  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search}/>
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
