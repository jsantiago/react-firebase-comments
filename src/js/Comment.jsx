/** @jsx React.DOM */

var Comment = React.createClass({
    render: function() {
        var posted = new Date(this.props.timestamp).toString();
        return (
            <blockquote className="comment">
                <p className="commentText">{this.props.text}</p>
                <footer>
                    <span className="commentAuthor">{this.props.author}</span>
                    <span className="commentPosted pull-right">{posted}</span>
                </footer>
            </blockquote>
        );
    }
});

module.exports = Comment;
