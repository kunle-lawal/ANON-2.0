import React, { Component } from 'react'
import StoryList from '../stories/StoriesList'
import Pagination from './Pagination'
import DashboardTemplate from './DashboardTemplate'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux'
import { toggleMobileNav, resetView } from '../../store/actions/navActions'

class Topic extends Component {
    state = {
        endAt: 10,
        scrolled: false
    }

    changePage = () => {
        this.setState({
            startAt: this.state.startAt + 1,
            endAt: this.state.endAt + 1
        })
    }

    render() {
        const { nav, stories } = this.props;
        console.log(stories);
        const pageId = 1; //(this.props.match.params.id ? this.props.match.params.id : 1)
        let paginatedStories = stories ? stories.slice((this.state.endAt * pageId) - this.state.endAt, (this.state.endAt * pageId)) : undefined
        let paginationState = {
            pagVal: stories ? stories.length / this.state.endAt : 0,
            offset: pageId,
            totalPages: (((stories ? stories.length : 1) / this.state.endAt)) < 1 ? 1 : Math.ceil((stories ? stories.length : 1) / this.state.endAt)
        }

        if (!nav.mobileToggled) {
            if (stories) {
                return (
                    <div id="main_body_container" className="main_body_container">
                        <StoryList stories={paginatedStories} />
                        <Pagination paginationState={paginationState} />
                    </div>
                )
            } else {
                return (
                    <div id="main_body_container" className="main_body_container">
                        <DashboardTemplate />
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
    }
}

const mapStateToProps = (state, ownProps) => {
    console.log(ownProps, state);
    return {
        stories: state.firestore.ordered.stories,
        nav: state.nav
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
    firestoreConnect((ownProps) => [
        { collection: 'stories', where: ['topic', '==' , ownProps.match.params.id], orderBy: ['time', 'desc'], limit: 50 }
    ])
)(Topic)