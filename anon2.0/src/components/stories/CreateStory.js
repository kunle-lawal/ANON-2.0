import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'
import {createStory} from '../../store/actions/storyAction'
import {compose} from 'redux'
import { firestoreConnect } from 'react-redux-firebase';
import TimePosted from '../miniComponents/TimePosted'
import Reactions from '../miniComponents/Reactions'
import {saveData} from '../miniComponents/localstoreage'
import {getData} from '../miniComponents/localstoreage'
import {deleteData} from '../miniComponents/localstoreage'

class CreateStory extends Component {
    state = {
        title: (getData('story') ? getData('story').title : ''),
        content: (getData('story') ? getData('story').content : ''),
        topic: (getData('story') ? getData('story').topic : ''),
        adding: false,
        errors: false,
        storyError: null,
        topScrolled: false,
        underReview: true
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    isEmpty = () => {
        if (this.state.content === '' || this.state.title === '' || this.state.topic === '') {
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
        console.log('Hello');
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

    render() {
        const { errors } = this.state;
        // console.log(this.state.timerVal);
        return (
            <div className="write_container container">
                <form className="write" onSubmit={this.handleSubmit}>
                    <h3 className="dark-text test-darken-3">Tell us your story. Its Anonymous</h3>
                    <h4> Anonymous Posting - (All post go under review)</h4>
                    <div className="input-fields">
                        <div className="input-field topic">
                            <input type="text" id="topic" maxLength="30" spellCheck="true" onChange={this.handleChange} value={this.state.topic}name="topics"/>
                            <label htmlFor="topic" className={this.state.topic ? "active" : ""}>Topic</label>
                        </div>

                        <div className="input-field title">
                            <input type="text" id='title' maxLength="30" onChange={this.handleChange} value={this.state.title} />
                            <label htmlFor="title" className={this.state.title ? "active" : ""}>Title</label>
                        </div>

                        <div className="input-field textarea-field content">
                            <textarea id="content" className="materialize-textarea" spellCheck="true" onChange={this.handleChange} value={this.state.content}></textarea>
                            <label htmlFor="content" className={this.state.content ? "active" : ""}>My Story</label>
                        </div>

                        <div className="input-field button-input">
                            {
                                (this.state.timerVal <= (4) || this.state.timerVal == null) ? (
                                    (this.state.timerVal > 0) ? (
                                        <p className="red-text error-message center">Wait {((4) - Math.floor(this.state.timerVal))} Minutes </p>
                                    ) : (
                                            null
                                        )
                                    ) : (
                                        <button className="btn-large btn-flat white-text waves-effect waves-light red lato">Create</button>
                                    )
                            }
                            <div className="red-text error-message center">
                                {<p>{errors}</p>}
                            </div>
                        </div>
                    </div>
                </form>
                <div className="main_body_container">
                    <div className="main_body">
                        <div className="article">
                            <div className="article-info">
                                <div className="article-info-title">
                                    <h2>{(this.state.title === "") ? "Your post" : this.state.title}</h2>
                                </div>
                                <div className="article-info-topic">
                                    <h3><span>{(this.state.topic === "") ? "looks like" : (this.state.topic).toUpperCase()}</span></h3>
                                </div>
                                <div className="article-info-description">
                                    <p>{(this.state.content === "") ? "this" : this.trunc_text(this.state.content)}...</p>
                                </div>
                            </div>

                            <div className="article-date">
                                <div className="date">
                                    <TimePosted time={1557546857489} />
                                </div>

                                <div className="totalComments left container">
                                    <h4> 10 Comments</h4>
                                </div>

                                <div className="reaction noselect">
                                    <i id="thumb" className="fas fa-thumbs-up highlighted"> <span id="thumb">100</span></i>
                                    <i id="laugh" className="fas fa-grin-squint-tears"><span id="laugh">0</span></i>
                                    <i id="shook" className="fas fa-surprise"><span id="shook">20</span></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

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