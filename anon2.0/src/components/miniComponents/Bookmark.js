import React, { Component } from 'react'
import { updateBookmark } from '../../store/actions/reactionAction'
import { connect } from 'react-redux'
import { showAuthModule } from '../../store/actions/authActions'

class Bookmark extends Component {
    state = {
        highlighted: false,
        className: 'far fa-bookmark right',
    }

    componentDidMount() {
        const { auth } = this.props;
        if (!auth.uid) {
            return;
        }
        this.setHighlight();
    }

    setHighlight = () => {
        const { profile } = this.props.bookmark;
        if (profile === null) { return 0 }
        if (profile.bookmarked === undefined) { return 0 }
        let className = profile.bookmarked ? 'fas fa-bookmark right highlighted' : 'far fa-bookmark right'; //If the like does not exist set to false
        this.setState({
            highlighted: profile.bookmarked,
            className: className
        })
    }

    toggleBookmark = (e) => {
        const { auth } = this.props;
        if (!auth.uid) {
            return;
        }
        var bookmarked = !this.state.highlighted;
        let className = bookmarked ? 'fas fa-bookmark right highlighted' : 'far fa-bookmark right';
        this.setState({
            highlighted: bookmarked,
            className: className
        })
    }

    updateBookmark = (e) => {
        const { auth } = this.props;
        const { story, profile } = this.props.bookmark;
        if (!auth.uid) { this.props.showAuthModule(); return; }
        let bookmarkData = {
            story: story,
            userData: {
                profile: profile
            }
        }
        this.toggleBookmark(e);
        this.props.updateBookmark(bookmarkData);
    }

    render() {
        const { profile, story } = this.props.bookmark;
        return (
            <div className="bookmark icon_container noselect">
                <i id="bookmark" className={this.state.className} onClick={this.updateBookmark}></i>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateBookmark: (bookmark) => dispatch(updateBookmark(bookmark)),
        showAuthModule: () => dispatch(showAuthModule())
    }
}

const mapStateToProps = (state, props) => {
    const bookmarked = state.reaction[props.bookmark.story.id] ? state.reaction[props.bookmark.story.id].bookmarked : (props.bookmark.profile ? props.bookmark.profile.bookmarked : false);
    return {
        auth: state.firebase.auth,
        bookmarked: bookmarked
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Bookmark)