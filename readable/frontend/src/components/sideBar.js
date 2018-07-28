import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchCategories, fetchPostsCategory } from "../actions";
import { Sidebar, Menu, Image, Icon, Responsive } from "semantic-ui-react";

class SideBar extends Component {

  state = { visible: false };


  componentDidMount() {
    this.props.fetchCategories();
  }


  getPostsByCategory = category => {
    this.props.fetchPostsCategory(category);
  };

  toggleVisibility = () => this.setState({ visible: !this.state.visible });

  render() {
    const { visible } = this.state;
    const { receiveCategories } = this.props;
    return (
      <div>
        <Responsive
          as={Menu}
          maxWidth={767}
          className="hamburger-menu"
          size="large"
          secondary
          attached="top"
        >
          <Menu.Item onClick={this.toggleVisibility}>
            <Icon name="sidebar" />Menu
          </Menu.Item>
        </Responsive>
        <Responsive maxWidth={767} as={Image}>
          <Sidebar
            as={Menu}
            width="thin"
            animation="overlay"
            visible={visible}
            icon="labeled"
            vertical
            inverted
          >
            <Link to="/">
              <Menu.Item className="mobile-menu-btn" name="home">
                Home
              </Menu.Item>
            </Link>
            {
            receiveCategories.length > 0 &&
              receiveCategories.map(category => (
                <Link
                  //When the menu link/item is clicked, dispatch action to
                  //fetch the matching posts for a category, and go to the right
                  //page.
                  onClick={() => this.getPostsByCategory(category.name)}
                  key={category.path}
                  to={`/${category.name}`}
                >
                  <Menu.Item name="menu-item">
                    {
                    category.name.charAt(0).toUpperCase() +
                      category.name.slice(1)}
                  </Menu.Item>
                </Link>
              ))}
            <Link onClick={this.toggleVisibility} to="#">
              <Menu.Item className="close-btn">
                <Icon name="close" />
              </Menu.Item>
            </Link>
          </Sidebar>
          <Sidebar.Pusher />
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
})(SideBar);
