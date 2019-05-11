import React from 'react'
import TimePosted from '../miniComponents/TimePosted'

const CommentSummary = (props) => {
    const { theComment } = props;
    return (
        <div className="comment">

            <h4>User #{theComment.user} said</h4>

            <div className="comment-info">
                <div className="comment-info-description">
                    <p>{theComment.comment}</p>
                </div>
            </div>

            <div className="comment-date">
                <div className="date">
                    <TimePosted time={theComment.createdAt} />
                </div>
            </div>
        </div>
    )
}

export default CommentSummary


    {/* < tbody >
    <tr>
        <td>Hello</td>
    </tr>
                            </tbody > */}