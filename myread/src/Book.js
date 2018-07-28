import React from 'react';
import { PropTypes } from 'prop-types';

import ChangeSection from './ChangeSection'

const Book = (props) => {
  const { book: { imageLinks, title, authors }, handleShelfUpdate } = props;
  const thumbnail = imageLinks && imageLinks.thumbnail ? imageLinks.thumbnail : null;
  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div className="book-cover"
               style={{
                 width: 128,
                 height: 192,
                 backgroundImage: `url(${thumbnail})`
                }}>
          </div>

          <div className="book-info">
            <div className="book-title">{title}</div>
            <div className="book-authors">{!!authors && authors.join(', ')}</div>
          </div>

          <div className="book-shelf-changer">
            <ChangeSection
              key={props.book.id}
              book={props.book}
              handleShelfUpdate={handleShelfUpdate}
            />
          </div>
        </div>

      </div>
    </li>
  )
}

Book.propTypes = {
  book: PropTypes.object.isRequired,
  handleShelfUpdate: PropTypes.func.isRequired
}

export default Book;
