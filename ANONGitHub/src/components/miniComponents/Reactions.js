import React, {Component} from 'react'
import { updateReaction } from '../../store/actions/reactionAction'
import {connect} from 'react-redux'

class Reactions extends Component {
    state = {
        thumb: {
            highlighted: false,
            className: ''
        },
        laugh: {
            highlighted: false,
            className: ''
        },
        shook: {
            highlighted: false,
            className: ''
        }
    }

    toggleReaction = (e) => {
        // console.log(this.props.profile[this.props.reactions.id].reactions[e.target.id]);
        const { auth } = this.props;
        if (!auth.uid) {
            return;
        }
        var liked = !this.state[e.target.id].highlighted;
        let className = liked ? ' highlighted' : '';
        console.log(liked);
        this.setState({
            [e.target.id]: {
                highlighted: liked,
                className: className
            }
        })
        // return false;

        // console.log(this.state);
        // console.log(this.state[e.target.id].highlighted);
        // console.log(this.state);
    }

    setHighlight = (id) => {
        // console.log(this.props.profile[this.props.reactions.id].reactions[id]);
        // var liked = this.props.profile[this.props.reactions.id].reactions[id].liked;
        const reactionType = this.props.profile[this.props.reactions.id] ? this.props.profile[this.props.reactions.id].reactions[id] : undefined;
        const liked = reactionType ? this.props.profile[this.props.reactions.id].reactions[id].liked : undefined;
        let className = liked ? ' highlighted' : '';
        // console.log('Hello');
        this.setState({
            [id]: {
                highlighted: liked,
                className: className
            }
        })
    }

    componentDidMount() {
        const { auth } = this.props;
        console.log(auth);
        if(!auth.uid){
            return;
        }
        this.setHighlight('thumb');
        this.setHighlight('laugh');
        this.setHighlight('shook');
    }

    updateLikes = (e) => {
        const { auth } = this.props;
        if(!auth.uid){
            return;
        }
        const { id } = this.props.reactions;
        const { total } = this.props.reactions.story.reactions[e.target.id];
        let reactionData = {
            id: id,
            type: [e.target.id],
            val: total,
            userData: {
                reactions: this.props.profile
            }
        }
        // console.log(total);
        this.props.updateReaction(reactionData);
        // $('#' + [e.target.id]).toggleClass("highlighted");
        // console.log(this.props.profile[this.props.reactions.id].reactions[e.target.id].liked);
    }
    
    render() {
        // console.log(this.props);
        const {reactions} = this.props.reactions.story;
        // console.log(this.props, this.props.profile);
        // this.setHighlight('thumb');
        return (
            <div className="reaction noselect">
                <i id="thumb" className={"fas fa-thumbs-up" + this.state.thumb.className} onClick={(e) => { this.updateLikes(e); this.toggleReaction(e) }}> <span id="thumb">{reactions.thumb.total}</span></i>
                <i id="laugh" className={"fas fa-grin-squint-tears" + this.state.laugh.className} onClick={(e) => { this.updateLikes(e); this.toggleReaction(e) }}><span id="laugh">{reactions.laugh.total}</span></i>
                <i id="shook" className={"fas fa-surprise" + this.state.shook.className} onClick={(e) => { this.updateLikes(e); this.toggleReaction(e) }}><span id="shook">{reactions.shook.total}</span></i>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateReaction: (reaction) => dispatch(updateReaction(reaction))
    }
}

const mapStateToProps = (state) => {
    // console.log(state);
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
} 

export default connect(mapStateToProps, mapDispatchToProps)(Reactions)

    {/* < i id = "thumb" className = { this.state.thumb.highlighted ? "fas fa-thumbs-up highlighted" : "fas fa-thumbs-up" } onClick = {(e) => { this.updateLikes(e); this.toggleReaction(e) }}> <span id="thumb">{reactions.thumb.total}</span></i >
        <i id="laugh" className={this.state.laugh.highlighted ? "fas fa-grin-squint-tears highlighted" : "fas fa-grin-squint-tears"} onClick={(e) => { this.updateLikes(e); this.toggleReaction(e) }}><span id="laugh">{reactions.laugh.total}</span></i>
        <i id="shook" className={this.state.shook.highlighted ? "fas fa-surprise highlighted" : "fas fa-surprise"} onClick={(e) => { this.updateLikes(e); this.toggleReaction(e) }}><span id="shook">{reactions.shook.total}</span></i> */}
{/* <i id="thumb" className={this.toggleReaction ? "fas fa-thumbs-up highlighted" : "fas fa-thumbs-up"} onClick={this.updateLikes}><span id="thumb">{reactions.thumb.total}</span></i>
    <i id="laugh" className={this.toggleReaction ? "fas fa-grin-squint-tears highlighted" : "fas fa-grin-squint-tears"} onClick={this.updateLikes}><span id="laugh">{reactions.laugh.total}</span></i>
    <i id="shook" className={this.toggleReaction ? "fas fa-surprise highlighted" : "fas fa-surprise"} onClick={this.updateLikes}><span id="shook">{reactions.shook.total}</span></i> */}