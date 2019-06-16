import React from 'react'
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import TimePosted from '../miniComponents/TimePosted'
import Reactions from '../miniComponents/Reactions'
import WriteComments from '../miniComponents/WriteComments'
import Comments from './Comments'
import DashboardTemplate from '../dashboard/DashboardTemplate'
import ReportPost from '../miniComponents/ReportPost'

function StoryDetails(props) {
    // console.log(props);
    const { story } = props;
    // console.log(story);
    let reactionProps = {
        id: props.match.params.id,
        reactions: story ? story.reactions : null,
        profile: ((props.profile ? props.profile.reaction : null) ? props.profile.reaction : null)
    }

    console.log(props)
    let miniComponentsProps = {
        id: props.match.params.id,
        story: story,
        profile: props.profile,
        profileID: props.profileID
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
                            <div className="article-info-topic">
                                <h3><span>{(story.topic) ? story.topic : 'TOPIC'}</span></h3>
                            </div>
                            <div className="article-info-title">
                                <h2>{story.title}</h2>
                                <h1 className='center red-text'>{(props.profile ? props.profile.banned : false) ? "BANNED POST" : ''}</h1>
                                <ReportPost post={miniComponentsProps} />
                            </div>
                            
                            <div className="article-info-description">
                                <p>{story.content}</p>
                            </div>
                        </div>

                        <div className="article-misc">
                            <div className="article-misc-detail">
                                <div className="totalComments icon_container">
                                    <i class="far fa-comment icon"><span>{story.commentsTotal}</span></i>
                                </div>
                                <Reactions reactions={reactionProps} />
                                <div className="views icon_container noselect">
                                    <i id="views" class="far fa-eye icon"><span id="views">10</span></i>
                                </div>
                            </div>

                            <div className="article-misc-date">
                                <div className="date">
                                    <TimePosted time={story.createdAt} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {comment}
                <WriteComments document={miniComponentsProps.id}/>
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
    // console.log(state.firebase.profile);
    return {
        story: story,
        profile: state.firebase.profile[id],
        profileID: state.firebase.profile.id
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