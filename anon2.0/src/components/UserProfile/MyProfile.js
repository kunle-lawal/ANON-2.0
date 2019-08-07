import React, {Component} from 'react'
import AboutMe from './AboutMe'
import MyActivity from './MyActivity'
import MyInfo from './MyInfo'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import {scrollToTop} from '../miniComponents/scrollToTop'
import { Redirect } from 'react-router-dom'

class MyProfile extends Component {
    state = {
        active:'about'
    }

    render() {
        // window.scrollTo(0, 0);
        scrollToTop();
        const { auth } = this.props;
        if (!auth.uid) return <Redirect to='/welcome' />
        return (
            <div id="main_body_container" className="main_body_container">
                <div className="main_body">
                    <div className="profile">
                        <MyInfo profile={this.props.profile}/>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const id = ownProps
    // const profileStories = state.firestore.ordered['users/' + state.firebase.auth.uid + '/posts'];
    return {
        profile: state.firebase.profile,
        auth: state.firebase.auth
    }
}

export default compose(
    connect(mapStateToProps),
    // firestoreConnect((props, dispatch) => [
    //     {
    //         collection: 'users/' + dispatch.getState().firebase.auth.uid + '/posts',
    //         orderBy: ['posts.postID', 'desc']
    //     }
    // ])
)(MyProfile)
// users / eRxoGv183tXeZKZdSQNcLZw69om2 / posts
//stories/Qv7NxP9q0BwNCgaKQ5c8/comments
{/* <div className="main_body">
            {comments && comments.map(story => {
                if (!filter.isProfane(story.content)) {
                    return (
                        
                    )
                }
            })}
        </div> */}



{/* <CommentSummary comment="comment" key={0}/> */ }