import React, {Component} from 'react';
import './characterPage.css';
import {Col, Row} from 'reactstrap';
import ItemList from '../itemList';
import CharDetails from '../charDetails';
import ErrorMessage from '../errorMessage';
import GotService from '../../services/gotService';

export default class CharacterPage extends Component {
  gotService = new GotService();

  state = {
    selectedChar: 130,
    error: false
  };

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: true
    });
  }

  onCharSelected = (id) => {
    this.setState({
      selectedChar: id
    });
  };

  render() {
    if (this.state.error) {
      return <ErrorMessage/>;
    }

    return (
      <Row>
        <Col md='6'>
          <ItemList
            onCharSelected={this.onCharSelected}
            getData={this.gotService.getAllCharacters} />
        </Col>
        <Col md='6'>
          <CharDetails charId={this.state.selectedChar}/>
        </Col>
      </Row>
    );
  }
}
