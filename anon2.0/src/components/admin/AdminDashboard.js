import React, { Component } from 'react'
import StoryList from './StoryList'
import Pagination from '../dashboard/Pagination'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux'
import { toggleMobileNav, resetView } from '../../store/actions/navActions'

class AdminDashboard extends Component {
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
        const pageId = this.props.match.params.id ? this.props.match.params.id : 1;
        let paginatedStories = stories ? stories.slice((this.state.endAt * pageId) - this.state.endAt, (this.state.endAt * pageId)) : []
        // console.log(stories);
        let paginationState = {
            pagVal: stories ? stories.length / this.state.endAt : 0,
            offset: pageId,
            totalPages: (((stories ? stories.length : 1) / this.state.endAt)) < 1 ? 1 : Math.ceil((stories ? stories.length : 1) / this.state.endAt),
            pageType: 'admin'
        }
        // console.log(paginationState);

        if (!nav.mobileToggled) {
            if (stories) {
                if(stories.length > 0) {
                    return (
                        <div id="main_body_container" className="main_body_container">
                            <StoryList stories={paginatedStories} />
                            <Pagination paginationState={paginationState} />
                        </div>
                    )
                } else {
                    return (
                        <div id = "main_body_container" className = "main_body_container" >
                            <br/>
                            <br />
                            <br />
                            <br />
                            <br />
                            <br/>
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <div><h1 className="center">No new Posts Yet</h1></div>
                        </div>
                    )
                }
            } else {
                return (
                    <div id="main_body_container" className="main_body_container">
                        <div><h1 className="center">No new Posts</h1></div>
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
        stories: state.firestore.ordered.reviews,
        nav: state.nav,
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'reviews', orderBy: ['time', 'desc'], limit: 50 }
    ])
)(AdminDashboard)