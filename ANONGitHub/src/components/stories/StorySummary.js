import React from 'react'
import { Link } from 'react-router-dom' 
import TimePosted from '../miniComponents/TimePosted'
import Reactions from '../miniComponents/Reactions'

const StorySummary = (props) => {
    const { story } = props;
    // console.log(props);
    // console.log(story);
    let reactionProps = {
        story: story,
        id: props.story.id
    }
    return (
        <div className="article">
            <Link to={'/story/' + story.id}>
                <div className="article-info">
                    <div className="article-info-title">
                        <h2>{story.title}</h2>
                    </div>

                    <div className="article-info-description">
                        <p>{story.content}</p>
                    </div>
                </div>
            </Link>

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
    )
}

export default StorySummary
 