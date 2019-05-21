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

    componentDidMount() {
        const { auth } = this.props;
        if(!auth.uid){
            return;
        }
        this.setHighlight('thumb');
        this.setHighlight('laugh');
        this.setHighlight('shook');
    }

    setHighlight = (id) => {
        // const reactionType = this.props.profile[this.props.reactions.docID] ? this.props.profile[this.props.reactions.docID].reaction : undefined;
        // const liked = reactionType ? this.props.profile[this.props.reactions.docID].reaction[id] : undefined;
        const { profile } = this.props.reactions;
        if (profile === null) { return 0 }
        if (profile[id] === undefined) { return 0 }
        let className = profile[id].liked ? ' highlighted' : ''; //If the like does not exist set to false
        this.setState({
            [id]: {
                highlighted: profile[id].liked,
                className: className
            }
        })
    }

    toggleReaction = (e) => {
        const { auth } = this.props;
        if (!auth.uid) {
            return;
        }
        var liked = !this.state[e.target.id].highlighted;
        let className = liked ? ' highlighted' : '';
        this.setState({
            [e.target.id]: {
                highlighted: liked,
                className: className
            }
        })
    }

    updateLikes = (e) => {
        const { auth } = this.props;
        const { id, profile, reactions } = this.props.reactions;
        if(!auth.uid){ return; }
        // if (profile === null) { return 0 }
        // if (profile[id] === undefined) { return 0 }
        const { total } = reactions[e.target.id];
        let reactionData = {
            docID: id,
            type: [e.target.id],
            val: total,
            userData: {
                reactions: profile
            }
        }
        this.toggleReaction(e);
        this.props.updateReaction(reactionData);
    }

    render() {
        const {id, profile, reactions} = this.props.reactions;
        // console.log(this.props)
        return (
            <div className="reaction noselect">
                <i id="thumb" className={"fas fa-thumbs-up" + this.state.thumb.className} onClick={this.updateLikes}> <span id="thumb">{reactions.thumb.total}</span></i>
                <i id="laugh" className={"fas fa-grin-squint-tears" + this.state.laugh.className} onClick={this.updateLikes}><span id="laugh">{reactions.laugh.total}</span></i>
                <i id="shook" className={"fas fa-surprise" + this.state.shook.className} onClick={this.updateLikes}><span id="shook">{reactions.shook.total}</span></i>
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
    return {
        auth: state.firebase.auth,
    }
} 

export default connect(mapStateToProps, mapDispatchToProps)(Reactions)

    {/* < i id = "thumb" className = { this.state.thumb.highlighted ? "fas fa-thumbs-up highlighted" : "fas fa-thumbs-up" } onClick = {(e) => { this.updateLikes(e); this.toggleReaction(e) }}> <span id="thumb">{reactions.thumb.total}</span></i >
        <i id="laugh" className={this.state.laugh.highlighted ? "fas fa-grin-squint-tears highlighted" : "fas fa-grin-squint-tears"} onClick={(e) => { this.updateLikes(e); this.toggleReaction(e) }}><span id="laugh">{reactions.laugh.total}</span></i>
        <i id="shook" className={this.state.shook.highlighted ? "fas fa-surprise highlighted" : "fas fa-surprise"} onClick={(e) => { this.updateLikes(e); this.toggleReaction(e) }}><span id="shook">{reactions.shook.total}</span></i> */}
{/* <i id="thumb" className={this.toggleReaction ? "fas fa-thumbs-up highlighted" : "fas fa-thumbs-up"} onClick={this.updateLikes}><span id="thumb">{reactions.thumb.total}</span></i>
    <i id="laugh" className={this.toggleReaction ? "fas fa-grin-squint-tears highlighted" : "fas fa-grin-squint-tears"} onClick={this.updateLikes}><span id="laugh">{reactions.laugh.total}</span></i>
    <i id="shook" className={this.toggleReaction ? "fas fa-surprise highlighted" : "fas fa-surprise"} onClick={this.updateLikes}><span id="shook">{reactions.shook.total}</span></i> */}