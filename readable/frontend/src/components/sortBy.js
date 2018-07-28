import React, { Component } from "react";
import { connect } from "react-redux";
import { changeSortAction } from "../actions";
import { Select } from "semantic-ui-react";

const options = [
  { value: "popular", text: "Popular" },
  { value: "unpopular", text: "Unpopular" },
  { value: "oldest", text: "Oldest" },
  { value: "newest", text: "Newest" }
];

class SortBy extends Component {
  state = {
    value: ""
  };

  setValue = (e, data) => {
    this.setState({ value: data.value });
    this.props.changeSortAction({ value: data.value });
  };

  render() {
    const { value } = this.state;
    return (
      <div className="sort">
        <Select
          onChange={this.setValue}
          color="grey"
          name="sort"
          placeholder="Sort By"
          options={options}
          value={value}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ sort }) => ({
  sort
});

export default connect(mapStateToProps, { changeSortAction })(SortBy);
