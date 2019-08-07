import React, { Component } from 'react'
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import TimePosted from '../miniComponents/TimePosted'
import Reactions from '../miniComponents/Reactions'
import WriteComments from '../miniComponents/WriteComments'
import Comments from './Comments'
import DashboardTemplate from '../dashboard/DashboardTemplate'
import ReportPost from '../miniComponents/ReportPost'
import { saveData, getData} from '../miniComponents/localstoreage'
import {increaseViews} from '../../store/actions/storyStateAction'

class StoryDetails extends Component {
    state = {

    }

    componentWillMount() {
        const { id } = this.props;
        const increaseViews = (id) => {this.props.increaseViews(id)}
        const views = getData('views');
        if(views) {if(views[id]) {return 0}}
        var timeoutId = setTimeout(function() {
            increaseViews(id)
            saveData('views', {
                ...views,
                [id]: {
                    viewed: true
                }
            })
        }, 3000)
        this.setState({timeoutId: timeoutId})
    }

    componentWillUnmount() {
        // use intervalId from the state to clear the interval
        clearInterval(this.state.timeoutId);
    }

    render(){
       const { story } = this.props;
       let reactionProps = {
           id: this.props.match.params.id,
           reactions: story ? story.reactions : null,
           profile: ((this.props.profile ? this.props.profile.reaction : null) ? this.props.profile.reaction : null)
       }
   
       let miniComponentsProps = {
           id: this.props.match.params.id,
           story: story,
           profile: this.props.profile,
           profileID: this.props.profileID
       }
       const comment = story ? (<Comments storyId={this.props.match.params.id} />) : (
           <div id="main_body_container" className="main_body_container">
               <DashboardTemplate />
           </div>
       )
       if (story) {
           return (
               <div className="main_body_container">
                   <div className="main_body">
                       <div className="article">
                           <div className="article-info">
                               <div className="article-info-topic">
                                   <h3><span>{(story.topic) ? story.topic : 'TOPIC'}</span></h3>
                               </div>
                               <div className="article-info-title">
                                   <h2>{story.title}</h2>
                                   <h1 className='center red-text'>{(this.props.profile ? this.props.profile.banned : false) ? "BANNED POST" : ''}</h1>
                                   <ReportPost post={miniComponentsProps} />
                               </div>
                               
                               <div className="article-info-description">
                                   <p>{story.content}</p>
                               </div>
                           </div>
   
                           <div className="article-misc">
                               <div className="article-misc-detail">
                                   <div className="totalComments icon_container">
                                       <i className="far fa-comment icon"><span>{story.commentsTotal}</span></i>
                                   </div>
                                   <Reactions reactions={reactionProps} />
                                   <div className="views icon_container noselect">
                                       <i id="views" className="far fa-eye icon"><span id="views">{story.views}</span></i>
                                   </div>
                               </div>
   
                               <div className="article-misc-date">
                                   <div className="date">
                                       <TimePosted time={story.createdAt} />
                                   </div>
                               </div>
                           </div>
                       </div>
                   </div>
                   {comment}
                   {(this.props.profile ? this.props.profile.banned : false) ? <div className="container red-text center lato">BANNED POST, NO COMMENTING ALLOWED</div> :  <WriteComments document={miniComponentsProps.id}/>}
               </div>
           )
       } else {
           return (
               <div className="container center">
                   <h1>Loading Story...</h1>
               </div>
           )
       }
   } 
}

const mapDispatchToProps = (dispatch) => {
    return {
        increaseViews: (id) => dispatch(increaseViews(id)),
    }
}

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id;
    const stories = state.firestore.data.stories;
    const story = stories ? stories[id] : null;
    return {
        story: story,
        id: id,
        profile: state.firebase.profile[id],
    }
}


export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect((ownProps) => [
        {
            collection: 'stories', doc: ownProps.match.params.id
        }
    ])
)(StoryDetails)