import React, {Component} from 'react'
import StoryList from '../stories/StoriesList'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux'

class Dashboard extends Component {
    render() {
        // console.log(this.props)
        const { stories, nav } = this.props;
        if (!nav.mobileToggled) {
            return (
                <div id="main_body_container" className="main_body_container">
                    <StoryList stories={stories} />
                    {/* <div className="row">
                    <div className="col s12 m6">
                        
                    </div>
                </div> */}
                </div>
            )
        } else {
            return null;
        }
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
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'stories',  limit: 6, orderBy: ['time', 'desc']}
    ])
)(Dashboard)