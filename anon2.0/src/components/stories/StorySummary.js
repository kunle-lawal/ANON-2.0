import React from 'react'
import { Link } from 'react-router-dom' 
import TimePosted from '../miniComponents/TimePosted'
import Reactions from '../miniComponents/Reactions'
import { scrollToTop } from '../miniComponents/scrollToTop'
import FlaggedPost from '../miniComponents/FlagedPost'
import { connect } from 'react-redux'

const StorySummary = (props) => {
    const { story } = props;
    // console.log(props);
    let reactionProps = {
        reactions: story.reactions,
        id: story.id,
        profile: ((props.profile ? props.profile.reaction : null) ? props.profile.reaction : null)
    }

    let trunc_text = (text) => {
        let maxLen = 200;
        maxLen = (text.length < maxLen) ? text.length : maxLen;

        return text.substring(0, maxLen);
    }    

    let banned = props.profile ? props.profile.banned : false;
    if(banned) {
        return null
    } else {
        return (
            <div className="article">
                <div className="article-info">
                    <Link to={'/story/' + story.id} onClick={scrollToTop}>
                        <div className="article-info-title">
                            <h2>{story.title}</h2>
                            <FlaggedPost flagged={(props.profile ? (props.profile.flagged) : false) ? true : false} />
                        </div>
                    </Link>
                    <Link to={'/topics/' + story.topic} onClick={scrollToTop}>
                        <div className="article-info-topic">
                            <h3><span>{(story.topic) ? story.topic : 'TOPIC'}</span></h3>
                        </div>
                    </Link>
                    <Link to={'/story/' + story.id} onClick={scrollToTop}>
                        <div className="article-info-description">
                            <p>{trunc_text(story.content)}...</p>
                        </div>
                    </Link>
                </div>

                <div className="article-date">
                    <div className="date">
                        <TimePosted time={story.createdAt} />
                    </div>

                    <div className="totalComments">
                        <h4>{story.commentsTotal === 1 ? (story.commentsTotal + ' Comment') : (story.commentsTotal + ' Comments')}</h4>
                    </div>

                    <Reactions reactions={reactionProps} />
                </div>
                <div className="drag">
                    <div></div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    // console.log(ownProps);
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile[ownProps.story.id],
    }
}

export default connect(mapStateToProps)(StorySummary)
 