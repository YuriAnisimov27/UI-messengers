import React, {Component} from 'react';
import SwapiService from '../../services/swapi-service';
import Spinner from '../spinner';
import ErrorButton from '../error-button';
import './item-details.css';

export const Record = ({item, field, label}) => {
  return (
    <li className="list-group-item">
      <span className="term">{label}</span>
      <span>{item[field]}</span>
    </li>
  );
};

export default class ItemDetails extends Component {
  state = {
    item: null,
    image: null
  };

  swapiService = new SwapiService();

  componentDidMount() {
    this.updateItem();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.itemId !== prevProps.itemId) {
      this.updateItem();
    }
  }

  updateItem() {
    const {itemId, getData, getImageUrl} = this.props;
    if (!itemId) return;

    getData(itemId)
      .then((item) => {
        this.setState({
          item,
          image: getImageUrl(item)
        });
      });
  };

  render() {
    if (!this.state.item) {
      return <Spinner/>;
    }

    const {item} = this.state;

    const {
      id, name, gender, birthYear, eyeColor
    } = item;

    const {image} = this.state;

    return (
      <div className="item-details card">
        <img className="item-image"
             src={image} alt="item"/>

        <div className="card-body">
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
            {
              React.Children.map(this.props.children, (child) => {
                return React.cloneElement(child, {item});
              })
            }
          </ul>
          <ErrorButton/>
        </div>
      </div>
    );
  }
}