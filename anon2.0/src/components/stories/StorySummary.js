import React from 'react'
import { Link } from 'react-router-dom' 
import TimePosted from '../miniComponents/TimePosted'
import Reactions from '../miniComponents/Reactions'
import Bookmark from '../miniComponents/Bookmark'
import { scrollToTop } from '../miniComponents/scrollToTop'
import FlaggedPost from '../miniComponents/FlagedPost'
import { connect } from 'react-redux'

const StorySummary = (props) => {
    const { story } = props;
    let reactionProps = {
        reactions: story.reactions,
        id: story.id,
        profile: ((props.profile ? props.profile.reaction : null) ? props.profile.reaction : null)
    }

    let bookmarkProps = {
        story: story,
        profile: ((props.profile) ? props.profile : null)
    }

    let trunc_text = (text) => {
        let maxLen = 200;
        maxLen = (text.length < maxLen) ? text.length : maxLen;

        return text.substring(0, maxLen);
    }    

    let banned = props.profile ? props.profile.banned : false;
    if(banned) {
        return (
            <div className="article main_page_article">
                <div className="article-info">
                    <Link to={'/topics/' + story.topic} onClick={scrollToTop}>
                        <div className="article-info-topic">
                            <h3><span>{(story.topic) ? story.topic : 'TOPIC'}</span></h3>
                        </div>
                    </Link>
                    <Link to={'/story/' + story.id} onClick={scrollToTop}>
                        <div className="article-info-title">
                            <h2 className="red-text">FLAGGED POST</h2>
                            <FlaggedPost flagged={(props.profile ? (props.profile.flagged) : false) ? true : false} />
                        </div>
                    </Link>
                    <Link to={'/story/' + story.id} onClick={scrollToTop}>
                        <div className="article-info-description">
                            <p className="red-text">THIS POST HAS BEEN FLAGGED BY YOU. TO VIEW IT'S CONTENT CLICK HERE</p>
                        </div>
                    </Link>
                </div>

                <div className="article-misc">
                    <div className="article-misc-detail">
                        <div className="totalComments icon_container">
                            <i className="far fa-comment icon red-text"><span>{story.commentsTotal}</span></i>
                        </div>
                        <div className="reaction icon_container noselect">
                            <i id="thumb" className='red-text far fa-thumbs-up icon'> <span id="thumb">0</span></i>
                        </div>
                        <div className="views icon_container noselect">
                            <i id="views" className="far fa-eye icon red-text"><span id="views">{story.views}</span></i>
                        </div>
                    </div>

                    <div className="article-misc-date">
                        <div className="date red-text">
                            <TimePosted time={story.createdAt} />
                        </div>
                    </div>
                </div>
                <div className="drag">
                    <div></div>
                </div>
            </div>
        )
    } else {
        return (
            <div className="article main_page_article">
                <div className="article-info">
                    <div className="article-info-topic">
                        <Link to={'/topics/' + story.topic} onClick={scrollToTop}>
                            <h3><span>{(story.topic) ? story.topic : 'TOPIC'}</span></h3>
                        </Link>
                    </div>
                    <Bookmark bookmark={bookmarkProps}/>
                    <Link to={'/story/' + story.id} onClick={scrollToTop}>
                        <div className="article-info-title">
                            <h2>{story.title}</h2>
                            <FlaggedPost flagged={(props.profile ? (props.profile.flagged) : false) ? true : false} />
                        </div>
                    </Link>
                    <Link to={'/story/' + story.id} onClick={scrollToTop}>
                        <div className="article-info-description">
                            <p>{trunc_text(story.content)}...</p>
                        </div>
                    </Link>
                </div>

                <div className="article-misc">
                    <div className="article-misc-detail">
                        <div className="totalComments icon_container">
                            <i className="far fa-comment icon"><span>{story.commentsTotal}</span></i>
                        </div>
                        <Reactions reactions={reactionProps} />
                        <div className="views icon_container noselect">
                            <i id="views" className="far fa-eye icon"><span id="views">{story.views}</span></i>
                        </div>
                    </div>

                    <div className="article-misc-date">
                        <div className="date">
                            <TimePosted time={story.createdAt} />
                        </div>
                    </div>
                </div>
                <div className="drag">
                    <div></div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile[ownProps.story.id],
    }
}

export default connect(mapStateToProps)(StorySummary)

/*{ < div className = "totalComments" >
        <h4>{story.commentsTotal === 1 ? (story.commentsTotal + ' Comment') : (story.commentsTotal + ' Comments')}</h4>
                    </div >

    <Reactions reactions={reactionProps} /> } */