import React from 'react'
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import TimePosted from '../miniComponents/TimePosted'
import Reactions from '../miniComponents/Reactions'

function StoryDetails(props) {
    const { story } = props;
    // console.log(props);
    // console.log(story);
    let reactionProps = {
        story: story,
        id: props.match.params.id
    }
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

                            <Reactions reactions={reactionProps} />
                        </div>
                        <div className="drag">
                            <div></div>
                        </div>
                    </div>
                </div>
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
    // console.log(state);
    const story = stories ? stories[id] : null;
    return {
        story: story
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        {collection: 'stories'}
    ])
)(StoryDetails)