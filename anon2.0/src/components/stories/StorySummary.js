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

    // console.log(reactionProps);

    let trunc_text = (text) => {
        let maxLen = 200;
        maxLen = (text.length < maxLen) ? text.length : maxLen;

        return text.substring(0, maxLen);
    }    

    return (
        <div className="article">
            <Link to={'/story/' + story.id}>
                <div className="article-info">
                    <div className="article-info-title">
                        <h2>{story.title}</h2>
                    </div>

                    <div className="article-info-description">
                        <p>{trunc_text(story.content)}</p>
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
 