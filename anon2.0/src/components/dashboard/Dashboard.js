import React, {Component} from 'react'
import StoryList from '../stories/StoriesList'
import Pagination from './Pagination'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux'
import { toggleMobileNav, resetView } from '../../store/actions/navActions'

class Dashboard extends Component {
    state = {
        endAt: 5
    }

    // componentWillMount(props) {
    //     x[0] = 5;
    //     x[1] = 10;
    // }

    changePage = () => {
        this.setState({
            startAt: this.state.startAt + 1,
            endAt: this.state.endAt + 1
        })
    }

    render() {
        const { nav, stories } = this.props;
        const pageId = this.props.match.params.id ? this.props.match.params.id : 1;
        let paginatedStories = stories ? stories.slice((this.state.endAt * pageId) - this.state.endAt, (this.state.endAt * pageId)) : undefined
        let paginationState = {
            pagVal: stories ? stories.length / this.state.endAt : 0,
            offset: pageId,
            totalPages: (((stories ? stories.length : 1) / this.state.endAt)) < 1 ? 1 : Math.ceil((stories ? stories.length : 1) / this.state.endAt)
        }
        // console.log(paginatedStories ? paginatedStories : 0);
        // console.log(stories)
        // let story = this.story;
        // console.log(this.props);
        // story = story.splice(this.state.startAt, this.state.endAt + 1);
        // console.log(story);
        if (!nav.mobileToggled) {
            return (
                <div id="main_body_container" className="main_body_container">
                    <StoryList stories={paginatedStories} />
                    <Pagination paginationState={paginationState}/>
                </div>
            )
        } else {
            return (
                <div className="center red">
                    Loading
                </div>
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
        nav: state.nav
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'stories', orderBy: ['time', 'desc']}
    ])
)(Dashboard)