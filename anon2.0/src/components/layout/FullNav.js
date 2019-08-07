import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import {closeFullNav} from '../../store/actions/navActions'
import Footer from '../layout/Footer';

class Topics extends Component {
    state = {
        topics: ['Science', 'Technology', 'Engineering', 'Art', 'Math', 'Misc', 'Tech News', 'Money', 'Education', 'Science', 'Steam', 'Stem', 'Jobs', 'react'],
        close:false
    }

    toggleModule = () => {
        this.setState({
            open_model: !this.state.open_model
        })
    }

    render() {
        if (!this.props.userInfo.auth.uid) {
            return null;
        } else {
            if (!this.props.nav.openFullNav) {document.getElementById('body').style.overflow = "scroll"; return null}
            return (
                <>
                    {document.getElementById('body').style.overflow = "hidden"}
                    <div className="center fullnav_container">
                        <div className="fullnav">
                            <div className="topics_container">
                                <div className="topics">
                                    <h2 className='black-text'>Topics</h2>
                                    <br/>
                                    <br/>
                                    <ul>
                                        {this.state.topics.map((topic, id) => {
                                            return (
                                                <NavLink to={"/topics/" + topic.toUpperCase()} key={id} onClick={this.props.closeFullNav} ><li id={topic}>{topic}</li></NavLink>
                                            )
                                        })}
                                    </ul>
                                </div>
                            </div>

                            <div className="footer_container">
                                <Footer />
                            </div>
                        </div>
                    </div>
                </>
            )
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        nav: state.nav,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        closeFullNav: () => dispatch(closeFullNav())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Topics) 