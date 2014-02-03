/** @jsx React.DOM */

var Comment = require('./Comment.jsx');

var CommentList = React.createClass({
    render: function(){
        var commentNodes = this.props.data.map(function(comment){
            return <Comment key={comment.guid} author={comment.author} timestamp={comment.timestamp} text={comment.text} />;
        });
        return (
            <div className="commentList">
                {commentNodes}
            </div>
        );
    }
});

module.exports = CommentList;
