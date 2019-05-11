import React from 'react'
import { Link } from 'react-router-dom'
import TimePosted from '../miniComponents/TimePosted'

const ProfileSummary = (props) => {
    const { thePost } = props;
    console.log(thePost ? thePost : null);
    return (
        <div className="article">
            <Link to={'/story/' + thePost.posts.docId}>
                <div className="article-info">
                    <div className="article-info-title">
                        <h2>{thePost.posts.title}</h2>
                    </div>

                    <div className="article-info-description">
                        <p>{(thePost.posts.content)}</p>
                    </div>
                </div>
            </Link>

            <div className="article-date">
                <div className="date">
                    <TimePosted time={thePost.posts.createdAt} />
                </div>

                <div className="totalComments left container">
                    <h4>Post #{thePost.posts.postID}</h4>
                </div>
            </div>
            <div className="drag">
                <div></div>
            </div>
        </div>
    )
}

export default ProfileSummary

{/* < tbody >
    <tr>
        <td>Hello</td>
    </tr>
                            </tbody > */}