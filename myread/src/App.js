import React from 'react'
import { Route } from 'react-router-dom'

import * as BooksAPI from './utils/BooksAPI'
import './App.css'
import Shelf from './Shelf'
import Search from './Search'

class BooksApp extends React.Component {

  state = {
    books: []
  }

  componentDidMount = () => {
    BooksAPI.getAll().then(books => {
      this.setState({ books });
    });
  }

  updateShelf = (updatedBook, shelf) => {
    BooksAPI.update({ id: updatedBook.id }, shelf).then(response => {
      const newBook = Object.assign({}, updatedBook, { shelf: shelf });
      this.setState({
        books: [
          ...this.state.books.filter(book => book.id !== updatedBook.id),
          newBook
        ]
      });

      console.log(this.state)
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <Shelf
            books={this.state.books}
            handleShelfUpdate={this.updateShelf}
          />
        )}/>
        <Route path='/search' render={() => (
          <Search
            books={this.state.books}
            handleShelfUpdate={this.updateShelf}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
