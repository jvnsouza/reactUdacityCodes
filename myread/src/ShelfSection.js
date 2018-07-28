import React from 'react';
import { PropTypes } from 'prop-types';

import BookList from './BookList';

const ShelfSection = (props) => (
  <div className={`bookshelf ${props.id}`}>
    <h2 className="bookshelf-title">{props.name}</h2>
    <div className="bookshelf-books">
      <BookList
        list={props.books}
        handleShelfUpdate={props.handleShelfUpdate}
      />
    </div>
  </div>
)

ShelfSection.propTypes = {
  name: PropTypes.string.isRequired,
  books: PropTypes.array.isRequired,
  handleShelfUpdate: PropTypes.func.isRequired
}

export default ShelfSection;
