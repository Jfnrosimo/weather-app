import { Component } from 'react';
import './App.css';
import TimeSeries from './components/TimeSeries';


class App extends Component {
  constructor(){
    super();

    this.apiUrl = "https://api.met.no/weatherapi/locationforecast/2.0/complete";

    this.state = {
      timeSeriesData: []
    }
  }

  componentDidMount(){
    navigator.geolocation.getCurrentPosition((pos) => {

      //get API
      fetch(
        `${this.apiUrl}?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}`
      )
        .then((response) => response.json())
        .then((data) => {
          this.setState({timeSeriesData: data.properties.timeseries})
        })
    })
  }


  render(){
    return(
      <>
        <h1>Weather App</h1>

        <main>

        {
          this.state.timeSeriesData.map((seriesData,index) => {
            return(
              index < 6 && (
                <TimeSeries 
                  key={index}
                  time={seriesData.time}
                  data={seriesData.data}
                />
              )
            )
          })
        }

        </main>
        
      </>
    )
  }
}

export default App;
