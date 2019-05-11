import React from 'react'
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import TimePosted from '../miniComponents/TimePosted'
import Reactions from '../miniComponents/Reactions'
import WriteComments from '../miniComponents/WriteComments'
import Comments from './Comments'
import DashboardTemplate from '../dashboard/DashboardTemplate'

function StoryDetails(props) {
    const { story } = props;
    let reactionProps = {
        story: story,
        id: props.match.params.id
    }
    const comment = story ? (<Comments storyId={props.match.params.id} />) : (
        <div id="main_body_container" className="main_body_container">
            <DashboardTemplate />
        </div>
    )
    if (story) {
        return (
            <div className="main_body_container">
                <div className="main_body">
                    <div className="article">
                        <div className="article-info">
                            <div className="article-info-title">
                                <h2>{story.title}</h2>
                            </div>

                            <div className="article-info-description">
                                <p>{story.content}</p>
                            </div>
                        </div>

                        <div className="article-date">
                            <div className="date">
                                <TimePosted time={story.createdAt} />
                            </div>

                            <div className="totalComments left container">
                                <h4>{story.commentsTotal === 1 ? (story.commentsTotal + ' Comment') : (story.commentsTotal + ' Comments')}</h4>
                            </div>

                            <Reactions reactions={reactionProps} />
                        </div>
                        <div className="drag">
                            <div></div>
                        </div>
                    </div>
                </div>
                {comment}
                <WriteComments document={reactionProps.id}/>
            </div>
        )
    } else {
        return (
            <div className="container center">
                <h1>Loading Story...</h1>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id;
    const stories = state.firestore.data.stories;
    const story = stories ? stories[id] : null;
    return {
        story: story
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect((ownProps) => [
        {
            collection: 'stories',
        }
    ])
)(StoryDetails)