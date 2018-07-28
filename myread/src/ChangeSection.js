import React from 'react';
import { PropTypes } from 'prop-types';


const ChangeSection = (props) => {
  const { book: { shelf }, handleShelfUpdate } = props;
  return (
    <select value={shelf || 'none'} onChange={(event => handleShelfUpdate(props.book, event.target.value))}>
      <option value="na" disabled>Move to...</option>
      <option value="currentlyReading">Currently Reading</option>
      <option value="wantToRead">Want to Read</option>
      <option value="read">Read</option>
      <option value="none">None</option>
    </select>
  )
}

ChangeSection.propTypes = {
  book: PropTypes.object.isRequired,
  handleShelfUpdate: PropTypes.func.isRequired
}

export default ChangeSection;
