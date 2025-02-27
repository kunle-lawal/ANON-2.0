import QuickPost from './QuickPost'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import { Redirect } from 'react-router-dom'
import ActivitySummary from './ActivitySummary';

class MyActivity extends Component {
    state = {
        active: 'about'
    }

    render() {
        const { auth, stories } = this.props;
        if (!auth.uid) return <Redirect to='/welcome' />
        return (
            <div id="main_body_container profile" className="main_body_container">
                <div className="main_body profile_main">
                    <div className="container">
                        <h2 className="">My Activity</h2>
                    </div>
                    <div className="activity article_container">
                        <QuickPost/>
                        {stories && stories.map((stories, index) => {
                            return (
                                <ActivitySummary story={stories} key={stories.id} />
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
    const profileStories = state.firestore.ordered['users/' + state.firebase.auth.uid + '/posts'];
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
            collection: 'users/' + dispatch.getState().firebase.auth.uid + '/posts',
            orderBy: ['posts.postID', 'desc']
        }
    ])
)(MyActivity)