import React from 'react';
import './App.css';
import axios from 'axios';
import logo from './blue_re-pict-house-base-512.png'

function App() {
  return (
    <div id="App" className="App">
      <img src={logo} className="App-logo" alt="logo" />
      <HomeList />
    </div>
  );
}

class HomeList extends React.Component {
  constructor() {
    super();
    this.state = {
      houses: [],
    }
    this.pn = 1;      // next page number to download
    this.ppl = 5;     // number of pages to download concurrently
    this.nQueued = 0; // number of pages currently queued for download

    this.formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    })
  }

  render() {
    return (
      <ol>
        {this.state.houses.map(h =>
          <li className="row" key={h.id}>
            <div className="info">
              <p>ID {h.id}</p>
              <p>{this.formatter.format(h.price)}</p>
              <p>{h.address}</p>
            </div>
            <img src={h.photoURL} />
          </li>)}
      </ol>
    )
  }

  /* Monitor the user's scroll and queue downloads
    * as the scroll approaches the bottom
    */
  download() {
    if (this.nQueued > this.ppl) { return }

    if (document.body.clientHeight - (window.scrollY + window.screen.height) < 1000) {
      for (var i=0; i < this.ppl; i++) {
        this.getHouses(this.pn + i, 2)
      }
      this.pn += this.ppl
      this.nQueued += this.ppl;
    }
  }

  componentDidMount() {
    this.download()
    setInterval(() => {this.download()}, 500)
  }

  async getHouses(page, pagesize) {
    axios.get(`http://app-homevision-staging.herokuapp.com/api_project/houses?page=${page}&per_page=${pagesize}`)
      .then(resp => {
        console.log(resp.data)
        this.setState({
          houses: this.state.houses.concat(resp.data.houses),
        })
        this.nQueued--
      })
      .catch(error => {
        console.log(error)
        this.getHouses(page, pagesize)
      })
  }
}

export default App;
