import React from 'react'
import StorySummary from './StorySummary';

const StoryList = ({ stories }) => {
    const Filter = require('bad-words'),
        filter = new Filter();
    return (
        <div className="main_body">
            {stories && stories.map(story => {
                if (!filter.isProfane(story.content)) {
                    return (
                        <StorySummary story={story} key={story.id} />
                    )
                }
            })}
        </div>
    )
}

export default StoryList