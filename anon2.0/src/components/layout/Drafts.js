import React from 'react'

const Drafts = (props) => {
    if (!props.userInfo.auth.uid) {
        return null;
    } else {
        return (
            <div className="write-container">
                <div className="right profileView">
                    <i className="material-icons">drafts</i>
                </div>
            </div>
        )
    }
}

export default Drafts 