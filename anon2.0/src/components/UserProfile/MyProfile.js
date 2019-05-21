import React, {Component} from 'react'
import ProfileSummary from './ProfileSummary';
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import {scrollToTop} from '../miniComponents/scrollToTop'

class MyProfile extends Component {
    render() {
        // window.scrollTo(0, 0);
        scrollToTop();
        const { profileStories } = this.props;
        // console.log(profileStories);
        return (
            <div id="main_body_container" className="main_body_container">
                <div className="main_body">
                    {/* <h3 className="center underline">User Profile</h3> */}
                    {profileStories && profileStories.map((thePosts, index) => {
                        return (
                            <ProfileSummary thePost={thePosts} key={index} />
                        )
                    })}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const id = ownProps
    // console.log(state);
    const profileStories = state.firestore.ordered['users/' + state.firebase.auth.uid + '/posts'];
    return {
        profileStories: profileStories
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