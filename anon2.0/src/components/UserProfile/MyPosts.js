import React from 'react'
import { Link } from 'react-router-dom'
import TimePosted from '../miniComponents/TimePosted'
import Reactions from '../miniComponents/Reactions'
import FlaggedPost from '../miniComponents/FlagedPost'
import { scrollToTop } from '../miniComponents/scrollToTop'

const MyPosts = () => {
    return (
        <div className="article main_page_article">
            <div className="article-info">
                <Link to={'/topics/' + 'MONEY'}>
                    <div className="article-info-topic">
                        <h3><span>{'TOPIC'}</span></h3>
                    </div>
                </Link>
                <Link to={'/story/' + 'story.id'} onClick={scrollToTop}>
                    <div className="article-info-title">
                        <h2>{'The title'}</h2>
                        <FlaggedPost flagged={false} />
                    </div>
                </Link>
                <Link to={'/story/' + 'story.id'} onClick={scrollToTop}>
                    <div className="article-info-description">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio rem quis delectus! Sequi qui illum dolores. 
                            Dolore alias laboriosam, iusto voluptas modi 
                            placeat accusantium ut consequatur dolorem quaerat aperiam deleniti!</p>
                    </div>
                </Link>
            </div>

            <div className="article-misc">
                <div className="article-misc-detail">
                    <div className="totalComments icon_container">
                        <i className="far fa-comment icon"><span>{100}</span></i>
                    </div>
                    {/* <Reactions reactions={reactionProps} /> */}
                    <div className="views icon_container noselect">
                        <i id="views" className="far fa-eye icon"><span id="views">{100}</span></i>
                    </div>
                </div>

                <div className="article-misc-date">
                    <div className="date">
                        <TimePosted time={1323248} />
                    </div>
                </div>
            </div>
            <div className="drag">
                <div></div>
            </div>
        </div>
    )
}

export default MyPosts