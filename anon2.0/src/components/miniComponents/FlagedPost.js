import React from 'react'

const FlaggedPost = (props) => {
    if (props.flagged) {
        return (
            <div className="red"><i className="material-icons right red-text noselect">flag</i></div>
        )
    } else {
        return null;
    }
}

export default FlaggedPost 