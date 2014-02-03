/** @jsx React.DOM */

var CommentList = require('./CommentList.jsx');
var CommentForm = require('./CommentForm.jsx');

var CommentBox = React.createClass({
    comments: [],

    getInitialState: function(){
        return {data: this.comments};
    },

    componentWillMount: function(){
        var childAdded = function(snapshot){
            this.comments.push(snapshot.val());
            this.setState({data: this.comments});
        }.bind(this);
        this.props.data.on('child_added', childAdded);
    },

    render: function() {
        return (
            <div className="commentBox">
                <h1>Comments</h1>
                <CommentForm data={this.props.data} />
                <CommentList data={this.state.data} />
            </div>
        );
    }
});

module.exports = CommentBox;
