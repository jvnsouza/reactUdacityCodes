import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchEditComment, fetchComment } from "../actions";
import Menu from "./menu";
import SideBar from "./sideBar";
import { Form, Header, Icon } from "semantic-ui-react";

class EditComment extends Component {
  state = {
    commentAuthor: "",
    commentContent: ""
  };

  componentDidMount() {
    this.props.fetchComment(this.props.match.params.commentId).then(() => {
      const { author, body } = this.props.receiveComment;
      this.setState({
        commentAuthor: author,
        commentContent: body
      });
    });
  }

  handleInputChange = e => {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { commentContent, commentAuthor } = this.state;
    const data = {
      id: this.props.receiveComment.id,
      body: commentContent,
      author: commentAuthor
    };
    this.props.fetchEditComment(data, data.id);
    this.props.history.goBack();
  };

  render() {
    return (
      <div className="page-wrapper">
        <SideBar />
        <div className="add-post-form ">
          <Header
            className="editcomment-header"
            textAlign="center"
            color="grey"
            as="h1"
          >
            Edit Comment
          </Header>

          <Menu />

          <Form onSubmit={this.handleSubmit}>
            <Form.Input
              required
              name="commentAuthor"
              value={this.state.commentAuthor}
              onChange={this.handleInputChange}
              label="Author"
            />

            <Form.TextArea
              required
              name="commentContent"
              value={this.state.commentContent}
              onChange={this.handleInputChange}
              label="Comment Content"
              rows={6}
            />
            <Form.Button
              name="form-button-control-public"
              color="grey"
              compact
              size="large"
            >
              <Icon name="edit" />
              Edit comment
            </Form.Button>
          </Form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ receiveComment }) => ({
  receiveComment
});

export default connect(mapStateToProps, { fetchEditComment, fetchComment })(
  EditComment
);
