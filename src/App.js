import React from 'react';
import Titles from './components/Titles';
import Form from './components/Form';
import Weather from './components/Weather';
import { Motion, spring } from 'react-motion';
const API_KEY = "24074fbe58384e2412a51ad2b43b1976";

class App extends React.Component {
  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    himidity: undefined,
    description: undefined,
    error: undefined
  }

  getWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`);
    const data = await api_call.json();
    console.log(data);
    this.setState({
      temperature: data.main.temp,
      city: data.name,
      country: data.sys.country,
      humidity: data.main.humidity,
      description: data.weather[0].description,
      error: ""
    });
  }

  render() {
    return(
      <div>
        <div className="wrapper">
          <div className="main">
            <div className="title-container">
              <Titles />
            </div>
            <Form getWeather={this.getWeather} />
              <Weather
                temperature={this.state.temperature}
                city={this.state.city}
                country={this.state.country}
                humidity={this.state.humidity}
                description={this.state.description}
                error={this.state.error}
              />
          </div>
        </div>
      </div>
    )
  }
}

export default App;
