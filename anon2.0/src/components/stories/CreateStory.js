import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'
import {createStory} from '../../store/actions/storyAction'
import {compose} from 'redux'
import { firestoreConnect } from 'react-redux-firebase';

class CreateStory extends Component {
    state = {
        title: '',
        content: '',
        adding: false,
        errors: false,
        storyError: null
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    isEmpty = () => {
        if (this.state.content === '' || this.state.title === '') {
            this.setState({
                errors: 'You gotta write something, Don\'t worry its Anonymously :)'
            })
            return true;
        }
        return false;
    }

    checkAuth = () => {
        const { auth } = this.props;
        if (!auth.uid) {
            this.setState({
                errors: 'You need to sign in... Anonymously :)'
            })
            return false;
        }
        return true;
    }

    checkProfanity = () => {
        const Filter = require('bad-words'),
            filter = new Filter();
        if (filter.isProfane(this.state.content) || filter.isProfane(this.state.title)) {
            this.setState({
                errors: 'Keep it pg-13 please :)'
            })
            return true;
        }
        return false;
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { storyError, Ids } = this.props;
        if (this.checkAuth() === false) { return 0 }
        if (this.isEmpty() === true) { return 0 }
        if (this.checkProfanity() === true) { return 0 }
        if (this.state.adding || this.state.title === '' || this.state.content === '') { this.setState({ storyError: 'Make sure you have a Title and a Story'}); return 0}
        this.setState({intervalId: setInterval(this.getTimerVal.bind(this), 1000) })
        this.props.createStory(this.state, { postId: Ids.postIds.totalIds, userId: Ids.postIds.totalIds});
        this.setState({
            adding: (storyError) ? false : true
        })
    }

    getTimerVal = () => {
        const { lastPost } = this.props.profile;
        console.log(this.state.timerVal);
        if (this.state.timerVal >= 4) { clearInterval(this.state.intervalId); }
        this.setState({ timerVal: (((Date.now()) - lastPost) / 1000) / 60 })
    }

    componentDidMount = () => {
        var intervalId = setInterval(this.getTimerVal.bind(this), 1000);

        this.setState({ intervalId: intervalId });
    }

    componentWillUnmount() {
        // use intervalId from the state to clear the interval
        clearInterval(this.state.intervalId);
    }

    render() {
        const { errors } = this.state;
        console.log(this.state.timerVal);
        return (
            <div className="write_container container">
                <form className="write" onSubmit={this.handleSubmit}>
                    <h3 className="dark-text test-darken-3">Tell us your story. Its Anonymous</h3>
                    <h4> Anonymous Posting </h4>
                    <div className="input-fields">
                        <div className="input-field">
                            <input type="text" id='title' maxLength="30" onChange={this.handleChange} />
                            <label htmlFor="title">Title</label>
                        </div>

                        <div className="input-field textarea-field">
                            <textarea id="content" className="materialize-textarea" spellCheck="true" onChange={this.handleChange}></textarea>
                            <label htmlFor="content">My Story</label>
                        </div>
            
                        <div className="input-field button-input">
                            {
                                (this.state.timerVal < (4) || this.state.timerVal == null) ? (
                                    (this.state.timerVal > 0) ? (
                                        <p className="red-text error-message center">Wait {((4) - Math.floor(this.state.timerVal))} Minutes </p>
                                    ) : (
                                            null
                                        )
                                    ) : (
                                        <button className="btn-large waves-effect waves-light red lato">Create</button>
                                    )
                            }
                            <div className="red-text error-message center">
                                {<p>{errors}</p>}
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createStory: (story, ids) => dispatch(createStory(story, ids))
    }
}

const mapStateToProps = (state) => {
    return {
        storyError: state.stories.error,
        storyAdded: state.stories.addedStory,
        Ids: state.firestore.data.Ids,
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        {collection: 'Ids'}
    ])
)(CreateStory)