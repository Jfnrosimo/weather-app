import { Component } from "react";
import moment from "moment";
import './TimeSeries.css';

class TimeSeries extends Component{
  constructor(props){
    super(props);
    
    this.time = moment(props.time).format("LLLL");
    this.instantData = props.data.instant.details;
    this.state = {
      tempColor: null,
      tempIcon: null,
      windDirection: "none"
    };
  }

  componentDidMount() {
    this.setState({
      tempColor:
        this.instantData.air_temperature < 20
          ? 'cold'
          : this.instantData.air_temperature > 30
          ? 'hot'
          : 'normal',
      tempIcon:
        this.instantData.air_temperature < 20 ? (
          <img
            src="https://img.icons8.com/external-justicon-flat-justicon/344/external-cold-weather-justicon-flat-justicon.png"
            alt="cold-icon"
          />
        ) : this.instantData.air_temperature > 30 ? (
          <img
            src="https://img.icons8.com/external-justicon-lineal-color-justicon/344/external-hot-weather-justicon-lineal-color-justicon.png"
            alt="hot-icon"
          />
        ) : (
          <img
            src="https://cdn-icons-png.flaticon.com/512/211/211807.png"
            alt="normal-icon"
          />
        ),
      windDirection:
          this.instantData.wind_from_direction >= 0 && 
          this.instantData.wind_from_direction < 90
            ? "from north"
            : this.instantData.wind_from_direction >= 90 &&
            this.instantData.wind_from_direction < 180
            ? "from east"
            : this.instantData.wind_from_direction >= 180 &&
            this.instantData.wind_from_direction < 270
            ? "from south"
            : "from west"
    });
  }

  render() {
    return (
      <div className="timeSeriesCard-container">
        <div className="time-display text-center">{this.time}</div>
        <div className="temp-display text-center">
          <h2 className={this.state.tempColor}>
            {this.instantData.air_temperature}° {this.state.tempIcon}
          </h2>
        </div>
        <div className="wind-details-container">
          <p>
            <small>Cloudiness: {this.instantData.cloud_area_fraction}%</small>
          </p>
          <p>
            <small>Humidity: {this.instantData.relative_humidity}%</small>
          </p>
          <p>
            <small>
              Air Pressure: {this.instantData.air_pressure_at_sea_level} hPa
            </small>
          </p>
        </div>
        <div className="wind-sub-container">
          <p>
            <small>
              Wind Direction: {this.instantData.wind_from_direction}°{" "}
              {this.state.windDirection}
            </small>
          </p>
          <p>
            <small>Wind Speed: {this.instantData.wind_speed} m/s</small>
          </p>
        </div>
      </div>
    );
  }
}

export default TimeSeries;