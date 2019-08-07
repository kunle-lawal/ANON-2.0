import React, { Component } from 'react'
import {connect} from 'react-redux'
import {createStory} from '../../store/actions/storyStateAction'
import {compose} from 'redux'
import { firestoreConnect } from 'react-redux-firebase';
import {saveData, getData, deleteData} from '../miniComponents/localstoreage'

class CreateStory extends Component {
    state = {
        title: 'Quick Thoughts',
        content: '',
        topic: 'Quick Thoughts',
        adding: false,
        errors: false,
        storyError: null,
        topScrolled: false,
        underReview: true,
        openDropdown: false
    }

    handleTopic = (e) => {
        this.setState({
            topic: e.target.id
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    isEmpty = () => {
        let errors = [];
        let concatErrors = (string, newString) => string + ' & ' + newString;
        if (this.state.content === '') {
            errors.push('You have to write something')
        } else if (this.state.title === '') {
            errors.push('You need a title')
        } else if (this.state.topic === '') {
            errors.push('Please pick a topic ^')
            document.getElementById('dropdown').style.color = '#ffffff';
            document.getElementById('dropdown').style.backgroundColor = '#222222';
        }
        if (errors.length === 0) { this.setState({ errors: '' }); return false } else { errors = (errors.length > 1) ? (errors.reduce(concatErrors)) : (errors[0]); };
        this.setState({
            errors: errors
        })
        return true;
    }

    checkAuth = () => {
        const { auth } = this.props;
        if (!auth.uid) {
            this.setState({
                errors: 'You need to sign in'
            })
            return false;
        }
        return true;
    }

    checkProfanity = () => {
        const Filter = require('bad-words'),
            filter = new Filter();
        if (filter.isProfane(this.state.content) || filter.isProfane(this.state.title) || filter.isProfane(this.state.topic)) {
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
        // deleteData('story');
        this.props.createStory(this.state, { postId: Ids.postIds.totalIds, userId: Ids.postIds.totalIds});
        this.setState({
            adding: (storyError) ? false : true
        })
    }

    getTimerVal = () => {
        const { lastPost } = this.props.profile;
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
        saveData('story', this.state);
    }

    trunc_text = (text) => {
        let maxLen = 200;
        maxLen = (text.length < maxLen) ? text.length : maxLen;

        return text.substring(0, maxLen);
    }

    toggleDropdown = () => {
        this.setState({
            openDropdown: !this.state.openDropdown
        })
    }

    render() {
        const { errors } = this.state;
        return (
            <div className="write_container">
                <form className="write" onSubmit={this.handleSubmit}>
                    <div className="input-fields">
                        <div className="input-field textarea-field content">
                            <textarea id="content" className="materialize-textarea" spellCheck="true" onChange={this.handleChange} value={this.state.content} placeholder="Write your post here"></textarea>
                            <div className="button-input">
                                {
                                    (this.state.timerVal <= (4) || this.state.timerVal == null) ? (
                                        (this.state.timerVal > 0) ? (
                                            <p className="red-text error-message center">Wait {((4) - Math.floor(this.state.timerVal))} Minutes </p>
                                        ) : (
                                                null
                                            )
                                    ) : (
                                            <button className="btn-flat white-text waves-effect waves-light">POST</button>
                                        )
                                }
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
        storyError: state.storyState.error,
        storyAdded: state.storyState.addedStory,
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