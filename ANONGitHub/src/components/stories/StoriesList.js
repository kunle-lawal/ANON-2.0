import React from 'react'
import StorySummary from './StorySummary';

const StoryList = ({stories}) => {
    // console.log(stories);
    return (
        <div className="main_body">
            {stories && stories.map(story => {
                return (
                    <StorySummary story={story} key={story.id}/>
                )
            })}
        </div>
    )
}

export default StoryList