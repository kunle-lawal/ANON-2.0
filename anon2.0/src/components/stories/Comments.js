import React from 'react'
import CommentSummary from './CommentSummary';
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'

const Comments = (props) => {
    const Filter = require('bad-words'),
        filter = new Filter();
    const { comments } = props;
    return (
        <div className="comment_container">
            <div className='comments'>
                {comments && comments.map((theComment, index) => {
                    return (
                        <CommentSummary theComment={theComment} key={index} />
                    )
                })}
            </div>
        </div>
    )
}

const mapStateToProps = (state, ownProps) => {
    const id = ownProps
    const storyComments = state.firestore.ordered['stories/' + ownProps.storyId + '/comments'];
    return {
        comments: storyComments
    }
}

const get = (ownProps) => {

}

export default compose(
    connect(mapStateToProps),
    firestoreConnect((ownProps) => [
        {
            collection: 'stories/' + ownProps.storyId + '/comments',
            orderBy: ['time', 'desc']
        }
    ])
)(Comments)
// 'stories/H9Ei7POjVrxteD4p4gse/comments'
// H9Ei7POjVrxteD4p4gse
{/* <div className="main_body">
            {comments && comments.map(story => {
                if (!filter.isProfane(story.content)) {
                    return (
                        
                    )
                }
            })}
        </div> */}



{/* <CommentSummary comment="comment" key={0}/> */ }