import React, { Component } from 'react'
import StoryList from '../stories/StoriesList'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux'
import { toggleMobileNav, resetView } from '../../store/actions/navActions'
import {Redirect} from 'react-router-dom'
import { loadMore } from '../../store/actions/storyAction'

class Topic extends Component {
    state = {
        scrolled: false,
        startAtOffset: 0
    }

    changePage = () => {
        this.setState({
            startAt: this.state.startAt + 1,
            endAt: this.state.endAt + 1
        })
    }

    componentDidMount() {
        // window.setTimeout(() => {
        if (this.props.loaded) { return 0 }
        // }, 100);
    }

    render() {
        const { nav, stories, auth } = this.props;
        // const pageId = 1; //(this.props.match.params.id ? this.props.match.params.id : 1)
        let filteredStories = (stories) ? (stories.filter((story) => {
            return !(this.props.banList.includes(story.userID))
        })) : [];

        if(!auth.uid) return <Redirect to='/welcome'/>

        if (!nav.mobileToggled) {
            if (stories) {
                if(stories.length > 0) {
                    return (
                        <div id="main_body_container" className="main_body_container">
                            <StoryList stories={filteredStories} />
                            <div className="load_more_container center">
                                <div className="btn btn-flat quicksand wave-effect" onClick={this.props.loadMore}>Load More</div>
                            </div>
                        </div>
                    )
                } else {
                    return (
                        <div id="main_body_container" className="main_body_container">
                            <div className="center container no_topics">
                                <h2 className="">No <span className="red-text">{this.props.topic}</span> topics yet.</h2>
                                <Link to={'/create'}>
                                    <div className="create_topic">
                                            <div className="btn btn-flat quicksand wave-effect">Create One</div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    )
                }
            } else {
                return (
                    <div className="main_body_container">
                        <div className="center container">
                            <h2 className="red-text">Loading</h2>
                        </div>
                    </div>
                )
            }
        } else {
            return (
                null
            );
        }
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        toggleMobileNav: () => dispatch(toggleMobileNav()),
        resetView: () => dispatch(resetView()),
        loadMore: () => dispatch(loadMore())
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        stories: state.firestore.ordered.stories,
        topic: ownProps.match.params.id,
        limit: state.stories.topic_limit,
        loaded: state.stories.loaded,
        banList: state.firebase.profile.banList || [],
        nav: state.nav,
        auth: state.firebase.auth,
    }
}
// firestoreConnect((ownProps) => [
//     {
//         collection: 'stories/' + ownProps.storyId + '/comments',
//         orderBy: ['time', 'desc']
//     }
// ])
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect((ownProps, dispatch) => [
        { collection: 'stories', where: ['topic', '==' , ownProps.match.params.id], orderBy: ['time', 'desc'], limit: ownProps.limit }
    ])
)(Topic)