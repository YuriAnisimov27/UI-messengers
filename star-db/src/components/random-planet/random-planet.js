import React, {Component} from 'react';
import SwapiService from '../../services/swapi-service';
import './random-planet.css';
import Spinner from '../spinner';

export default class RandomPlanet extends Component {
  constructor(props) {
    super(props);
    this.updatePlanet();
  }

  state = {
    planet: {},
    loading: true
  };

  swapiService = new SwapiService();

  onPlanetLoaded = (planet) => {
    this.setState({planet, loading: false});
  };

  updatePlanet = () => {
    const id = Math.ceil(Math.random() * 17) + 2;

    this.swapiService
      .getPlanet(id)
      .then(this.onPlanetLoaded);
  };

  render() {
    const {loading, planet} = this.state;
    const spinner = loading ? <Spinner/> : null;
    const content = loading ? null : <PlanetView planet={planet}/>;

    return (
      <div className="random-planet jumbotron rounded">
        {content}
        {spinner}
      </div>
    );
  }
}

const PlanetView = ({planet}) => {
  const {id, name, population, rotationPeriod, diameter} = planet;

  return (
    <React.Fragment>
      <img className="planet-image"
           src={`https://starwars-visualguide.com/assets/img/planets/${id || 5}.jpg`} alt=''/>
      <div>
        <h4>{name}</h4>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <span className="term">Population</span>
            <span>{population}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Rotation Period</span>
            <span>{rotationPeriod}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Diameter</span>
            <span>{diameter}</span>
          </li>
        </ul>
      </div>
    </React.Fragment>
  );
};
