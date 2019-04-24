import React, {Component} from 'react'
import {connect} from 'react-redux'
import {createStory} from '../../store/actions/storyAction'

class CreateStory extends Component {
    state = {
        title: '',
        content: ''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.createStory(this.state);
        // console.log(this.state);
    }

    render() {
        const { storyError} = this.props;
        console.log(this.props);
        return (
            <div className="write_container container">
                <form className="write" onSubmit={this.handleSubmit}>
                    <h3 className="dark-text test-darken-3">Tell us your story. Its Anonymous</h3>
                    <h4>A safe place where you cna post whatever tf you want with no reprecussions. Lol</h4>
                    <div className="input-fields">
                        <div className="input-field">
                            <input type="text" id='title' onChange={this.handleChange} />
                            <label htmlFor="title">Title</label>
                        </div>

                        <div className="input-field textarea-field">
                            <textarea id="content" className="materialize-textarea" spellcheck="true" onChange={this.handleChange}></textarea>
                            <label htmlFor="content">My Story</label>
                        </div>

                        <div className="input-field button-input">
                            <button className="btn-large lighten-1">Create</button>
                            <div className="red-text error-message center">
                                {<p>{storyError}</p>}
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createStory: (story) => dispatch(createStory(story))
    }
}

const mapStateToProps = (state) => {
    return {
        storyError: state.stories.error
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateStory)