import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchCategories, fetchPostsCategory } from "../actions";
import SortBy from "./sortBy";
import { Grid, Button, Responsive } from "semantic-ui-react";

class Menu extends Component {
  //Get all the categories, to display in the Menu.
  componentDidMount() {
    this.props.fetchCategories();
  }

  getPostsByCategory = category => {
    this.props.fetchPostsCategory(category);
  };

  render() {
    const { receiveCategories } = this.props;
    return (
      <div className="categories">
        <Responsive as={Grid} columns={6} minWidth={768}>
          <Grid.Column>
            <Link to="/">
              <Button
                className="menu-btn"
                size="tiny"
                compact
                basic
                color="grey"
              >
                All
              </Button>
            </Link>
          </Grid.Column>
          {receiveCategories.length > 0 &&
            receiveCategories.map(category => (
              <Grid.Column key={category.path}>
                <Link to={`/${category.name}`}>
                  <Button
                    className="menu-btn"
                    onClick={() => this.getPostsByCategory(category.name)}
                    size="tiny"
                    compact
                    basic
                    color="grey"
                  >
                    {category.name}
                  </Button>
                </Link>
              </Grid.Column>
            ))}
          <Grid.Column>
            <SortBy />
          </Grid.Column>
        </Responsive>
        <Responsive as={Grid} columns={1} maxWidth={767}>
          <SortBy />
        </Responsive>
      </div>
    );
  }
}

const mapStateToProps = ({ receiveCategories }) => ({
  receiveCategories
});


export default connect(mapStateToProps, {
  fetchCategories,
  fetchPostsCategory
})(Menu);
