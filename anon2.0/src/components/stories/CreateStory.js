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

    handleSubmit = (e) => {
        e.preventDefault();
        const { storyError, Ids } = this.props;
        const Filter = require('bad-words'),
            filter = new Filter();
        // console.log(filter.isProfane("Don't be an ash0le"));
        const { auth } = this.props;
        if (!auth.uid) {
            this.setState({
                errors:'You need to sign in... Anonymously :)'
            })
            return 0;
        }
        // console.log(storyError);
        if(filter.isProfane(this.state.content || this.state.title)) {
            this.setState({
                errors: 'Keep it pg-13 please :)'
            })
            return 0;
        }
        if (this.state.adding || this.state.title === '' || this.state.content === '') { this.setState({ storyError: 'Make sure you have a Title and a Story'}); return 0}
        // console.log(Ids.postIds, Ids.userIds);
        this.props.createStory(this.state, { postId: Ids.postIds.totalIds, userId: Ids.postIds.totalIds});
        this.setState({
            adding: (storyError) ? false : true
        })
    }

    render() {
        const { errors } = this.state;
        console.log(this.props);
        console.log(this.state);
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
                            <button className="btn-large lighten-1">Create</button>
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
    // console.log(state);
    return {
        storyError: state.stories.error,
        storyAdded: state.stories.addedStory,
        Ids: state.firestore.data.Ids,
        auth: state.firebase.auth,
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        {collection: 'Ids'}
    ])
)(CreateStory)