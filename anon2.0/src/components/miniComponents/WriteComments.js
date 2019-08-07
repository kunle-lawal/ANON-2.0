import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addComment } from '../../store/actions/commentActions'
import { showAuthModule } from '../../store/actions/authActions'

class WriteComments extends Component {
    state = {
        comment: '',
        adding: false,
        errors: false,
        commentError: null,
        postProgress: 1, 
        timerVal: 0,
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
        // if(this.checkProfanity() === true){return 0}
        if (this.state.adding || this.state.comment === '') { this.setState({ storyError: 'Make sure you have a comment' }); return 0 }
        this.setState({lastComment:this.state.comment, errors: '', timerVal: 0, intervalId: setInterval(this.getTimerVal.bind(this), 1000)})
        this.props.addComment({ comment: this.state.comment, fbDocument: this.props.document, userProfile: this.props.profile});
        this.setState({
            adding: (commentError) ? false : true,
            comment: ''
        })
    }

    isEmpty = () => {
        if (this.state.comment === '') {
            this.setState({
                errors: 'You gotta write something'
            })
            return true;
        }
        return false;
    }

    checkAuth = () => {
        const { auth } = this.props;
        if (!auth.uid) {
            this.setState({
                errors: 'You need to sign in.'
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
        if (this.state.timerVal >= 60) { clearInterval(this.state.intervalId); }
        this.setState({ timerVal: (((Date.now()) - lastComment) / 1000) })
    }

    componentDidMount = () => {
        var intervalId = setInterval(this.getTimerVal.bind(this), 1000);

        this.setState({ intervalId: intervalId, adding: false});
    }

    componentWillUnmount () {
        // use intervalId from the state to clear the interval
        clearInterval(this.state.intervalId);
    }

    render() {
        const { errors } = this.state;
        const { auth } = this.props
        // const { lastComment } = this.props.profile;
        // let timerVal = (((Date.now()) - lastComment) / 1000);
        return (
            <div className="write_comment_container">
                <div className="write_comment" onClick={(!auth.uid) ? this.props.showAuthModule : null}>
                    <form className="write comment" onSubmit={this.handleSubmit}>
                        <div className="input-field textarea-field">
                            <textarea id="comment" className="materialize-textarea" maxLength="200" spellCheck="true" onChange={this.handleChange} value={this.state.comment} placeholder="Add comment"></textarea>
                        </div>

                        <div className={"input-field button-input " + (this.state.comment.length < 1 ? "disable" : "")}>
                            {
                                (this.state.timerVal < 30) ? (
                                    (this.state.timerVal > 0) ? (
                                        <p className="red-text error-message center">Wait {Math.trunc(30 - this.state.timerVal)} seconds </p>
                                    ) : (
                                        null
                                    )
                                ) : (
                                        <div className="btn-flat waves-effect waves-light btn-post " onClick={this.handleSubmit}>Comment</div>
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
        addComment: (comment) => dispatch(addComment(comment)),
        showAuthModule: () => dispatch(showAuthModule())
    }
}

const mapStateToProps = (state) => {
    return {
        commentError: state.comments.error,
        commentAdded: state.comments.addedComment,
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WriteComments)

    {/* < div className = "determinate black" style = {{ width: this.state.postProgress + '%', height: '10px' }}></div > */}