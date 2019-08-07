import React from 'react'
import StorySummary from './StorySummary';

const StoryList = ({stories}) => {
    const Filter = require('bad-words'),
        filter = new Filter();
    return (
        <div className="main_body">
            <div className="article_container">
                {stories && stories.map(story => {
                    if (!filter.isProfane(story.content)) {
                        return (
                            <StorySummary story={story} key={story.id} />
                        )
                    }
                    return <div className="center blue"><h3>Loading</h3></div>;
                })}
            </div>
        </div>
    )
}

export default StoryList