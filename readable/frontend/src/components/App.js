import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "../components/homePage";
import AllCategories from "../components/allCategories";
import PostDetail from "../components/postDetail";
import EditPost from "../components/editPost";
import EditComment from "../components/editComment";
import AddPost from "../components/addPost";

import "../App.css";

const App = () =>  {
    return (
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/addPost" component={AddPost} />>
        <Route exact path="/:category/" component={AllCategories} />
        <Route exact path="/editPost/:postId" component={EditPost} />
        <Route exact path="/editComment/:commentId" component={EditComment} />
        <Route exact path="/:category/:post_id" component={PostDetail} />
      </Switch>
    );
}

export default App;
