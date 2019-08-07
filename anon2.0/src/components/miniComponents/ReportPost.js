import React, { Component } from 'react'
import FlaggedPost from './FlagedPost'
import { updateFlaggedPost } from '../../store/actions/flagPostsActions'
import { showAuthModule } from '../../store/actions/authActions'
import { connect } from 'react-redux'

class ReportPost extends Component {
    state = {
        flagged: false,
        className: 'material-icons',
        flagUIOpened: false,
        reason: '',
        reasonType: ''
    }

    componentDidMount() {
        const { auth } = this.props;
        if (!auth.uid) {
            return;
        }
        this.setFlag('flagged');
    }

    toggleFlagUI = (e) => {
        const { auth } = this.props;
        if (!auth.uid) {
            this.props.showAuthModule();
            return;
        }
        this.setState({
            flagUIOpened: !this.state.flagUIOpened,
        })
    }

    setFlag = (id) => {
        const { docID } = this.props.post;
        const flagged = this.props.post.profile ? this.props.post.profile.flagged : undefined;
        let className = flagged ? 'highlighted material-icons' : "material-icons";
        this.setState({
            flagged: flagged,
            className: className
        })
    }

    addFlag = (e) => {
        const { auth } = this.props;
        if (!auth.uid) {
            return;
        }
        if (this.state.flagged) {return;}
        const docID = this.props.post.id;
        this.setState({
            flagged: true,
            className: 'highlighted material-icons'
        })
        this.props.updateFlaggedPost({ 
            fbDoc: docID, 
            userID: this.props.post.story.userID,
            postID: this.props.post.story.postID, 
            reason:e.target.id,
            reasonType: e.target.value
        });
    }

    render() {
        // const { reactions } = this.props.reactions.story;
        return (
            <React.Fragment>
                {this.state.flagged ? (
                    <FlaggedPost flagged={this.state.flagged}/>
                ) : (
                    <React.Fragment>
                        <i className="material-icons right noselect" onClick={this.toggleFlagUI}>keyboard_arrow_down</i>

                        <div className={this.state.flagUIOpened ? "report container" : "reportClosed container"}>
                            <ul className="collection right">
                                <li className="collection-header" onClick={this.toggleFlagUI}>
                                </li>
                                <li id="I don't like this post" className="collection-item" value='2' onClick={this.addFlag}>I don't like this post</li>
                                <li id="Block posts from this user" className="collection-item red-text" value='1' onClick={this.addFlag}>Block posts from this user</li>
                                <li id="It's suspicious or spam" className="collection-item" value="4" onClick={this.addFlag}>It's suspicious or spam</li>
                                <li id="It displays sensitive or personal information" className="collection-item" value="3" onClick={this.addFlag}>It displays sensitive or personal information</li>
                                <li id="It's abusive or harmful" className="collection-item" value="2" onClick={this.addFlag}>It's abusive or harmful</li>
                            </ul>
                        </div>
                    </React.Fragment>
                )}
            </React.Fragment>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateFlaggedPost: (post) => dispatch(updateFlaggedPost(post)),
        showAuthModule: () => dispatch(showAuthModule())
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReportPost)