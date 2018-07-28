import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Header, Icon } from "semantic-ui-react";
import { fetchAddPost } from "../actions";
import Menu from "./menu";
import SideBar from "./sideBar";
import uuidv1 from "uuid/v1";

const options = [
  { key: 1, text: "React", value: "react" },
  { key: 2, text: "Redux", value: "redux" },
  { key: 3, text: "Udacity", value: "udacity" },
  { key: 4, text: "Javascript", value: "javascript" }
];

class AddPost extends Component {
  state = {
    postCategory: "react",
    postTitle: "",
    postAuthor: "",
    postContent: ""
  };

  handleInputChange = e => {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };

  setPostCategory = (e, data) => {
    this.setState({ postCategory: data.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const data = {
      id: uuidv1(),
      timestamp: Date.now(),
      title: this.state.postTitle,
      body: this.state.postContent,
      author: this.state.postAuthor,
      category: this.state.postCategory,
      deleted: false,
      voteScore: 1
    };
    this.props.fetchAddPost(data);
    this.props.history.push("/");
  };

  render() {
    return (
      <div className="page-wrapper">
        <SideBar />
        <div className="add-post-form ">
          <Header
            className="add-post-header"
            textAlign="center"
            color="grey"
            as="h1"
          >
            Add Post
          </Header>
          <div className="add-post-menu">
            <Menu />
          </div>

          <Form className="addpost-form" onSubmit={this.handleSubmit}>
            <Form.Select
              required
              name="postCategory"
              placeholder="Category"
              label="Choose Category"
              value={this.state.postCategory}
              onChange={this.setPostCategory}
              options={options}
            />

            <Form.Input
              required
              name="postTitle"
              id="post-title"
              value={this.state.postTitle}
              onChange={this.handleInputChange}
              label="Post Title"
              placeholder="Post Title"
            />
            <Form.Input
              required
              name="postAuthor"
              value={this.state.postAuthor}
              onChange={this.handleInputChange}
              label="Author"
              placeholder="Author"
            />

            <Form.TextArea
              required
              name="postContent"
              value={this.state.postContent}
              onChange={this.handleInputChange}
              label="Post Content"
              placeholder="Post Content"
              rows={6}
            />
            <Form.Button
              name="form-button-control-public"
              color="grey"
              compact
              size="large"
            >
              <Icon name="plus circle" />
              Add Post
            </Form.Button>
          </Form>
        </div>
      </div>
    );
  }
}

export default connect(null, { fetchAddPost })(AddPost);
