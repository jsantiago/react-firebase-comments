/** @jsx React.DOM */

var CommentBox = require('./CommentBox.jsx');

var promise = $.getJSON('/data/config.json');
$.when(promise).then(function(data){
    var site = window.location.hostname.replace(/\./g, '_') + window.location.pathname;
    var firebase = new Firebase(data.firebase.url+site);

    React.renderComponent(
        <CommentBox data={firebase} />,
        document.getElementById('comments')
    );
});
