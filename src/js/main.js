/** @jsx React.DOM */

var CommentBox = require('./CommentBox.jsx');

var site = window.location.hostname.replace(/\./g, '_') + window.location.pathname;
var firebase = new Firebase('https://intense-fire-3862.firebaseio.com/'+site);

React.renderComponent(
    <CommentBox data={firebase} />,
    document.getElementById('comments')
);
