import React, { Component } from 'react';
import { Player } from './video-react';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faStar } from '@fortawesome/free-solid-svg-icons'

import './App.css';

library.add(faStar)
class App extends Component {
  render() {
    return (
      <div className="App">
        <Player>
          <source src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4" />
        </Player>
      </div>
    );
  }
}

export default App;
