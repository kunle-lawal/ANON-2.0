import React, {Component} from 'react'
import StoryList from '../stories/StoriesList'
import Pagination from './Pagination'
import DashboardTemplate from './DashboardTemplate'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux'
import { toggleMobileNav, resetView } from '../../store/actions/navActions'

class Dashboard extends Component {
    state = {
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
        // console.log(stories)
        const pageId = this.props.match.params.id ? this.props.match.params.id : 1;
        let filteredStories = stories ? (stories.filter((story) => {
            // console.log(this.props);
            return !(this.props.banList.includes(story.userID))
        })) : [];
        // let paginatedStories = filteredStories ? filteredStories.slice((this.state.endAt * pageId) - this.state.endAt, (this.state.endAt * pageId)) : []
        // console.log(paginatedStories)
        // let paginationState = {
        //     pagVal: filteredStories ? filteredStories.length / this.state.endAt : 0,
        //     offset: pageId,
        //     totalPages: (((filteredStories ? filteredStories.length : 1) / this.state.endAt)) < 1 ? 1 : Math.ceil((filteredStories ? filteredStories.length : 1) / this.state.endAt),
        //     pageType: 'page'
        // }

        if (!nav.mobileToggled) {
            if (filteredStories) {
                return (
                    <div id="main_body_container" className="main_body_container">
                        <StoryList stories={filteredStories} />
                    </div>
                )
            } else {
                return (
                    <div id="main_body_container" className="main_body_container">
                        <DashboardTemplate/>
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

const mapStateToProps = (state) => {
    // console.log(state);
    return {
        stories: state.firestore.ordered.stories,
        nav: state.nav,
        banList: state.firebase.profile.banList || []
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'stories', orderBy: ['time', 'desc'], limit: 10}
    ])
)(Dashboard)


// <Pagination paginationState={paginationState} />