/** @jsx React.DOM */

var CommentForm = React.createClass({

    handleSubmit: function(){
        var guid = Date.now(); // TODO
        var author = this.refs.author.getDOMNode().value.trim();
        var text = this.refs.text.getDOMNode().value.trim();
        var timestamp = Date.now();

        if (!text || !author) {
            return false;
        }

        this.props.data.push({guid: guid, author: author, text: text, timestamp: timestamp});

        this.refs.author.getDOMNode().value = '';
        this.refs.text.getDOMNode().value = '';
        return false;
    },

    render: function() {
        return (
            <form className="commentForm" onSubmit={this.handleSubmit}>
                <input className="form-control" type="text" placeholder="Your name" ref="author" />
                <textarea className="form-control" placeholder="Say something..." ref="text" />
                <input className="btn btn-default" type="submit" />
            </form>
        );
    }
});

module.exports = CommentForm;
