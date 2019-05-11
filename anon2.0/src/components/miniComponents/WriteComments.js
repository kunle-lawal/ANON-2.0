import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addComment } from '../../store/actions/commentActions'

class WriteComments extends Component {
    state = {
        comment: '',
        adding: false,
        errors: false,
        commentError: null,
        postProgress: 1, 
        timerVal: 0
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { commentError, Ids } = this.props;
        if(this.checkAuth() === false){return 0}
        if(this.isEmpty() === true) {return 0}
        if(this.checkProfanity() === true){return 0}
        if (this.state.adding || this.state.comment === '') { this.setState({ storyError: 'Make sure you have a comment' }); return 0 }
        this.setState({ errors: '', timerVal: 0, intervalId: setInterval(this.getTimerVal.bind(this), 1000)})
        this.props.addComment({ comment: this.state.comment, fbDocument: this.props.document, userProfile: this.props.profile});
        this.setState({
            adding: (commentError) ? false : true,
            comment: ''
        })
    }

    isEmpty = () => {
        if (this.state.comment === '') {
            this.setState({
                errors: 'You gotta write something, Don\'t worry its Anonymous :)'
            })
            return true;
        }
        return false;
    }

    checkAuth = () => {
        const { auth } = this.props;
        if (!auth.uid) {
            this.setState({
                errors: 'You need to sign in... Anonymous :)'
            })
            return false;
        }
        return true;
    }

    checkProfanity = () => {
        const Filter = require('bad-words'),
            filter = new Filter();
        if (filter.isProfane(this.state.comment)) {
            this.setState({
                errors: 'Keep it pg-13 please :)'
            })
            return true;
        }
        return false;
    }

    getTimerVal = () => {
        const { lastComment } = this.props.profile;
        console.log(this.state.timerVal);
        if (this.state.timerVal >= 60) { clearInterval(this.state.intervalId); }
        this.setState({ timerVal: (((Date.now()) - lastComment) / 1000) })
    }

    componentDidMount = () => {
        var intervalId = setInterval(this.getTimerVal.bind(this), 1000);

        this.setState({ intervalId: intervalId});
    }

    componentWillUnmount () {
        // use intervalId from the state to clear the interval
        clearInterval(this.state.intervalId);
    }

    render() {
        const { errors } = this.state;
        // const { lastComment } = this.props.profile;
        // let timerVal = (((Date.now()) - lastComment) / 1000);
        console.log(this.state);
        return (
            <div className="write_comment_container">
                <div className="write_comment">
                    <h3>Write your comment</h3>
                    <form className="write comment" onSubmit={this.handleSubmit}>
                        <div className="input-field textarea-field">
                            <textarea id="comment" className="materialize-textarea" maxLength="100" spellCheck="true" onChange={this.handleChange} value={this.state.comment}></textarea>
                            <label htmlFor="comment">Comment</label>
                        </div>

                        <div className="input-field button-input">
                            {
                                (this.state.adding || this.state.timerVal < 60) ? (
                                    (this.state.timerVal > 0) ? (
                                        <p className="red-text error-message center">Wait {Math.trunc(60 - this.state.timerVal)} seconds </p>
                                    ) : (
                                        null
                                    )
                                ) : (
                                        <div className="btn-large waves-effect waves-light red lato" onClick={this.handleSubmit}>Comment</div>
                                    )
                            }
                            <div className="red-text error-message center">
                                <br />
                                {<p className="red-text error-message center">{errors}</p>}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addComment: (comment) => dispatch(addComment(comment))
    }
}

const mapStateToProps = (state) => {
    // console.log(state);
    return {
        commentError: state.comments.error,
        commentAdded: state.comments.addedComment,
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WriteComments)

    {/* < div className = "determinate black" style = {{ width: this.state.postProgress + '%', height: '10px' }}></div > */}