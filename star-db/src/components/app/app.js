import React, {Component} from 'react';
import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorButton from '../error-button';
import ErrorIndicator from '../error-indicator';
import PeoplePage from '../people-page';
import ItemList from '../item-list';
import SwapiService from '../../services/swapi-service';
import Row from '../row';
import ItemDetails from '../item-details';
import {Record} from '../item-details/item-details';
import './app.css';
import ErrorBoundry from '../error-boundry';
import {PersonDetails, PersonList, PlanetDetails, StarshipDetails, StarshipList} from '../sw-components';

export default class App extends Component {
  state = {
    showRandomPlanet: true,
    hasError: false
  };

  swapiService = new SwapiService();

  componentDidCatch(error, errorInfo) {
    this.setState({hasError: true});
  }

  toggleRandomPlanet = () => {
    this.setState((state) => {
      return {
        showRandomPlanet: !state.showRandomPlanet
      };
    });
  };

  render() {
    if (this.state.hasError) {
      return <ErrorIndicator/>;
    }

    const planet = this.state.showRandomPlanet ?
      <RandomPlanet/> :
      null;

    const {getPerson, getStarship, getPersonImage, getStarshipImage, getAllPeople, getAllPlanets} = this.swapiService;

    const personDetails = (
      <ItemDetails itemId={11} getData={getPerson} getImageUrl={getPersonImage}>
        <Record field='gender' label='Gender'/>
        <Record field='eyeColor' label='Eye Color'/>
      </ItemDetails>
    );

    const starShipDetails = (
      <ItemDetails itemId={9} getData={getStarship} getImageUrl={getStarshipImage}>
        <Record field='model' label='Model'/>
        <Record field='length' label='Length'/>
        <Record field='costInCredits' label='Cost'/>
      </ItemDetails>
    );

    return (
      <ErrorBoundry>
        <div className="stardb-app">
          <Header/>
          {planet}
          <button
            className="toggle-planet btn btn-warning btn-lg"
            onClick={this.toggleRandomPlanet}
            style={{marginBottom: '30px'}}>
            Toggle Random Planet
          </button>

          <ErrorButton/>

          <PersonDetails itemId={1}/>
          <PlanetDetails itemId={5}/>
          {/*<StarshipDetails itemId={7}/>*/}

          <PersonList>
            {({name}) => <span>{name}</span>}
          </PersonList>

          <PersonList>
            {({name}) => <span>{name}</span>}
          </PersonList>

          <StarshipList>
            {({name}) => <span>{name}</span>}
          </StarshipList>

          {/*<ItemList getData={getAllPlanets}>*/}
          {/*  {({name}) => <span>{name}</span>}*/}
          {/*</ItemList>*/}

        </div>
      </ErrorBoundry>
    );
  }
}
