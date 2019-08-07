import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import TimePosted from '../miniComponents/TimePosted'
import { scrollToTop } from '../miniComponents/scrollToTop'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStory } from '../../store/actions/storyStateAction'

class StorySummary extends Component {
    state = {
        title: this.props.story.title,
        content: this.props.story.content,
        topic: this.props.story.topic,
        passedReview: false,
        underReview: false,
        docID: this.props.story.id,
        userID: this.props.story.userID
    }


    handleSubmit = (e) => {
        e.preventDefault();
        const { IDs } = this.props;
        this.setState({
            passedReview: (e.target.id === 'true') ? true : false
        })
        this.props.createStory({ ...this.state, passedReview: (e.target.id === 'true') ? true : false}, { postId: IDs.postIds.totalIds, userId: IDs.postIds.totalIds });
    }

    render() {
        const { story } = this.props;
        
        return (
            <div className="article">
                <div className="article-info">
                    <div className="article-info-title">
                        <h2>{story.title}</h2>
                    </div>
                    <div className="article-info-topic">
                        <h3><span>{(story.topic) ? story.topic : 'TOPIC'}</span></h3>
                    </div>
                    <div className="article-info-description">
                        <p>{story.content}</p>
                    </div>
                </div>

                <div className="article-date">
                    <div className="date">
                        <TimePosted time={story.createdAt} />
                    </div>
                    <div className="">
                        <button id="true" className="btn waves-effect waves-light green" onClick={this.handleSubmit}>Accept</button>
                    </div>

                    <div className="">
                        <button id="false" className="btn white-text waves-effect waves-light red" onClick={this.handleSubmit}>Deny</button>
                    </div>
                </div>
                <div className="drag">
                    <div></div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createStory: (story, IDs) => dispatch(createStory(story, IDs))
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        auth: state.firebase.auth,
        IDs: state.firestore.data.Ids,
        profile: state.firebase.profile[ownProps.story.id],
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
)(StorySummary)
