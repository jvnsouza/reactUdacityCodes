import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Timestamp from "react-timestamp";
import Menu from "./menu";
import SideBar from "./sideBar";
import * as actions from "../actions";
import {
  Header,
  Segment,
  List,
  Icon,
  Button,
  Responsive,
  Message
} from "semantic-ui-react";

class Categories extends Component {
  componentDidMount() {
    this.props.fetchPostsCategory(this.props.match.params.category);
  }

  deletePost = postId => {
    this.props.fetchDeletePost(postId);
  };

  iconThumbsUp = (postId, option) => {
    this.props.fetchVotePost(postId, "upVote");
  };

  iconThumbsDown = (postId, option) => {
    this.props.fetchVotePost(postId, "downVote");
  };

  render() {
    const { posts } = this.props.posts;
    const { sort } = this.props.sort;
    let { category } = this.props.match.params;
    category = category.charAt(0).toUpperCase() + category.slice(1);

    return (
      <div className="page-wrapper">
        <SideBar />
        <div className="category-page-container">
          <div className="header-section-categories">
            <Header textAlign="center" color="grey" as="h1">
              Readable
            </Header>

            <Menu />
            <div className="category-message-wrapper">
              <Message color="grey" size="small" className="header-categories">
                {`Category: ${category}`}
              </Message>
            </div>
          </div>

          <div>
            {
            posts && posts.length > 0 ? (
              posts
                .filter(post => !post.deleted && !post.error)
                .sort((a, b) => {
                  switch (sort.value) {
                    case "unpopular":
                      return a.voteScore - b.voteScore;
                    case "oldest":
                      return a.timestamp - b.timestamp;
                    case "newest":
                      return b.timestamp - a.timestamp;
                    default:
                      return b.voteScore - a.voteScore;
                  }
                })
                .map(post => (
                  <div key={post.id} className="post-wrapper-categories">
                    <List divided relaxed>
                      <Segment color="grey" raised>
                        <List.Item>
                          <List.Content>
                            <Link to={`/${post.category}/${post.id}`}>
                              <List.Header className="header">
                                {post.title}
                              </List.Header>
                            </Link>
                            <List.Content className="author">
                              <Icon
                                name="user"
                                color="grey"
                                size="large"
                              />{" "}
                              author:
                              {post.author}
                            </List.Content>
                            <List.Content className="time">
                              <Icon name="clock" />
                              <Timestamp
                                time={post.timestamp / 1000}
                                format="full"
                              />
                            </List.Content>
                            <List.Content className="post-body">
                              {post.body}
                            </List.Content>
                            <List.Content className="votes">
                              <Icon
                                name="thumbs up outline"
                                onClick={() =>
                                  this.iconThumbsUp(post.id, "upVote")}
                                color="grey"
                                size="large"
                              />
                              <div className="vote-score">
                                <p className="vote-score-num">
                                  {post.voteScore}
                                </p>
                              </div>

                              <Icon
                                name="thumbs down outline"
                                color="red"
                                size="large"
                                onClick={() =>
                                  this.iconThumbsDown(post.id, "downVote")}
                              />
                            </List.Content>
                            <List.Content className="comments" key={post.Id}>
                              <Icon
                                name="comment outline"
                                color="grey"
                                size="large"
                              />
                              {post.comments && post.comments.length}
                            </List.Content>
                          </List.Content>
                        </List.Item>
                        <div className="post-btn-wrapper">
                          <Responsive
                            as={Button}
                            onClick={() => this.deletePost(post.id)}
                            compact
                            basic
                            color="red"
                            size="tiny"
                            floated="right"
                            maxWidth={400}
                          >
                            <Icon name="trash" />
                            Delete
                          </Responsive>
                          <Responsive
                            as={Button}
                            onClick={() => this.deletePost(post.id)}
                            compact
                            basic
                            color="red"
                            size="tiny"
                            floated="right"
                            minWidth={401}
                          >
                            <Icon name="trash" />
                            Delete post
                          </Responsive>
                          <Link to={`/editpost/${post.id}`}>
                            <Responsive
                              as={Button}
                              compact
                              basic
                              color="grey"
                              size="tiny"
                              floated="left"
                              maxWidth={400}
                            >
                              <Icon name="edit" />
                              Edit
                            </Responsive>
                            <Responsive
                              as={Button}
                              compact
                              basic
                              color="grey"
                              size="tiny"
                              floated="right"
                              minWidth={401}
                            >
                              <Icon name="edit" />
                              Edit post
                            </Responsive>
                          </Link>
                        </div>
                      </Segment>
                    </List>
                  </div>
                ))
            ) : (
              <div className="no-posts">
                <h3 className="empty-category">
                  There are no posts in this category.
                </h3>
              </div>
            )}
            <div className="add-btn-post">
              <Link to="/addpost">
                <Button compact color="grey" size="large" floated="right">
                  <Icon name="plus circle" />
                  Add Post
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ posts, sort }) => ({
  posts,
  sort
});

export default connect(mapStateToProps, actions)(Categories);
