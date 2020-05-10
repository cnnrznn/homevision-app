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
    this.nextPage = 1;        // next page number to download
    this.pagesPerLoad = 10;   // number of pages to download concurrently
    this.housesPerPage = 1;   // number of houses per page
    this.nPagesQueued = 0;    // number of pages currently queued for download

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
    if (this.nPagesQueued > this.pagesPerLoad) { return }

    if (document.body.clientHeight - (window.scrollY + window.screen.height) < 2000) {
      for (var i=0; i < this.pagesPerLoad; i++) {
        this.getHouses(this.nextPage + i, this.housesPerPage)
      }
      this.nextPage += this.pagesPerLoad
      this.nPagesQueued += this.pagesPerLoad;
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
        console.log(this.nPagesQueued)
        this.nPagesQueued--
      })
      .catch(error => {
        console.log(error)
        this.getHouses(page, pagesize)
      })
  }
}

export default App;
