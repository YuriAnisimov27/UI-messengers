import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchBooks, bookAddedToCart} from '../../actions';
import BookListItem from '../book-list-item/book-list-item';
import withBookstoreService from '../hoc/with-bookstore-service';
import compose from '../../utils/compose';
import Spinner from '../spinner/spinner';
import ErrorIndicator from '../error-indicator/error-indicator';
import './book-list.css';


const BookList = ({books, onAddedToCart}) => {
  return (
    <ul className='book-list'>
      {books.map((book) => <li key={book.id}><BookListItem book={book} onAddedToCart={() => onAddedToCart(book.id)}/>
      </li>)}
    </ul>
  );
};

class BookListContainer extends Component {
  componentDidMount() {
    this.props.fetchBooks();
  }

  render() {
    const {books, loading, error, onAddedToCart} = this.props;
    if (loading) return <Spinner/>;
    if (error) return <ErrorIndicator/>;

    return <BookList books={books} onAddedToCart={onAddedToCart}/>;
  }
}

const mapStateToProps = ({bookList : {books, loading, error}}) => {
  return {books, loading, error};
};

const mapDispatchToProps = (dispatch, {bookstoreService}) => {
  return {
    fetchBooks: fetchBooks(bookstoreService, dispatch),
    onAddedToCart: (id) => dispatch(bookAddedToCart(id))
  };
};

export default compose(
  withBookstoreService(),
  connect(mapStateToProps, mapDispatchToProps)
)(BookListContainer);
