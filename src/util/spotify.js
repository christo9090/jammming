let token = ''
const clientId = '4fb81ef050e74cbaaf997902201723ea'
const redirectUri = 'http://wackassspotifyplaylistthing.surge.sh'

const Spotify = {
  getAccessToken() {
    if (token) {
      return token;
    } else {
      //check for access token match
      const tokenMatch = window.location.href.match(/access_token=([^&]*)/);
      const expiresMatch = window.location.href.match(/expires_in=([^&]*)/)
      // console.log(tokenMatch)
      if (tokenMatch && expiresMatch) {
        token = tokenMatch[1]
        let expiresIn = Number(expiresMatch[1])
        window.setTimeout(() => token = '', expiresIn * 1000);
        window.history.pushState('Access Token', null, '/');
        return token;
      } else {
        window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;

      }
    }
  },

  search(term) {
    let accessToken = Spotify.getAccessToken();
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then(response => {
      // console.log(response)
      return response.json()
    }).then(jsonResponse => {
      // console.log(jsonResponse)
      if(!jsonResponse.tracks) {
        return []
      }
        return jsonResponse.tracks.items.map(track => {
            return {
              name: track.name,
              artist: track.artists[0].name,
              album: track.album.name,
              id: track.id,
              uri: track.uri
            }
        })

    })
  },

  savePlaylist(playlistName, trackUris) {
    if (!playlistName || !trackUris.length) {
      return;
    }
    let accessToken = Spotify.getAccessToken();
    let headers = {Authorization: `Bearer ${accessToken}`};
    let userId = ''
    return fetch('https://api.spotify.com/v1/me',
    {
      headers: headers
    }).then(response => {
      return response.json()
    }).then(responseJson => {
      // console.log(responseJson)
      userId = responseJson.id
      return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`,
      {
        headers: headers,
        method: 'POST',
        body: JSON.stringify({ name: playlistName, })
      }).then(response => {
        return response.json()
      }).then(responseJson => {
        console.log(responseJson)
        let playlistId = responseJson.id;

        return fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
        {
          headers: headers,
          method: 'POST',
          body: JSON.stringify({ uris: trackUris }),
        })
      })
    })
  }
};

export default Spotify
