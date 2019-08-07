import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import { Redirect } from 'react-router-dom'
import StorySummary from '../stories/StorySummary';

class BookMarks extends Component {
    state = {
        active: 'about'
    }

    render() {
        const { auth, stories } = this.props;
        if (!auth.uid) return <Redirect to='/welcome' />
        return (
            <div id="main_body_container" className="main_body_container">
                <div className="main_body bookmarks_main">
                    <h2 className="">Bookmarks</h2>
                    <div className="article_container">
                        {stories && stories.map((stories, index) => {
                            return (
                                <StorySummary story={stories.bookmarkedStory} key={index} />
                            )
                        })}
                   </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const id = ownProps
    const profileStories = state.firestore.ordered['users/' + state.firebase.auth.uid + '/bookmarks'];
    return {
        profile: state.firebase.profile,
        auth: state.firebase.auth,
        stories: profileStories,
    }
}


export default compose(
    connect(mapStateToProps),
    firestoreConnect((props, dispatch) => [
        {
            collection: 'users/' + dispatch.getState().firebase.auth.uid + '/bookmarks',
            orderBy: ['bookmarkedStory.postID', 'desc']
        }
    ])
)(BookMarks)