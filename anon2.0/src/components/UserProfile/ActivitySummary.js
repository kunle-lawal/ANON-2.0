import React from 'react'
import { Link } from 'react-router-dom'
import TimePosted from '../miniComponents/TimePosted'
import { Redirect } from 'react-router-dom'
import { scrollToTop } from '../miniComponents/scrollToTop'
import FlaggedPost from '../miniComponents/FlagedPost'
import { connect } from 'react-redux'

const StorySummary = (props) => {
    const story = props.story.posts;

    let trunc_text = (text) => {
        let maxLen = 200;
        maxLen = (text.length < maxLen) ? text.length : maxLen;

        return text.substring(0, maxLen);
    }
    return (
        <div className="article main_page_article">
            <div className="article-info">
                <div className="article-info-topic">
                    <Link to={'/topics/' + story.topic} onClick={scrollToTop}>
                        <h3><span>{(story.topic) ? story.topic : 'TOPIC'}</span></h3>
                    </Link>
                </div>
                <Link to={'/story/' + story.docId} onClick={scrollToTop}>
                    <div className="article-info-title">
                        <h2>{story.title}</h2>
                        <FlaggedPost flagged={(props.profile ? (props.profile.flagged) : false) ? true : false} />
                    </div>
                </Link>
                <Link to={'/story/' + story.docId} onClick={scrollToTop}>
                    <div className="article-info-description">
                        <p>{trunc_text(story.content)}...</p>
                    </div>
                </Link>
            </div>
        </div>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile[ownProps.story.id],
    }
}

export default connect(mapStateToProps)(StorySummary)


{/* < div className = "totalComments" >
        <h4>{story.commentsTotal === 1 ? (story.commentsTotal + ' Comment') : (story.commentsTotal + ' Comments')}</h4>
                    </div >

    <Reactions reactions={reactionProps} /> */}