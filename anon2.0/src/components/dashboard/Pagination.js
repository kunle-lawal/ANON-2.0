import React, {Component} from 'react'
import PaginationList from './PaginationLists'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'
import { paginate } from '../../store/actions/navActions'

class Pagination extends Component {
    state = {
        previousPage: Number(this.props.paginationState.offset) - 1,
        nextPage: Number(this.props.paginationState.offset) + 1
    }

    checkPage = (page) => {
        return (page === "nextPage") ? (this.props.paginationState.offset < this.props.paginationState.totalPages) : (this.props.paginationState.offset > 1) 
    }

    render() {
        // console.log(this.props.paginationState.offset);
        // console.log(this.props.paginationState.totalPages)
        const currentPage = Number(this.props.paginationState.offset);
        let nextPage = this.checkPage('nextPage') ? 1 : 0;
        let previousPage = this.checkPage('previousPage') ? -1 : 0; 
        return (
            <div className='pagination_container center'>
                <ul className="pagination">
                    <li className={this.checkPage('previousPage') ? "waves-effect enabled" : "disabled"}><Link to="/1"><i className="material-icons">first_page</i></Link></li>
                    {/* <li className={this.checkPage('previousPage') ? "waves-effect enabled" : "disabled"}><Link to={"/" + (currentPage + previousPage)}><i className="material-icons">chevron_left</i></Link></li> */}
                    <PaginationList paginationState={this.props.paginationState}/>
                    {/* <li className={this.checkPage('nextPage') ? "waves-effect enabled" : "disabled"}><Link to={"/" + (currentPage + nextPage)}><i className="material-icons">chevron_right</i></Link></li> */}
                    <li className={this.checkPage('nextPage') ? "waves-effect enabled" : "disabled"}><Link to={"/" + this.props.paginationState.totalPages}><i className="material-icons">last_page</i></Link></li>
                </ul>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
   return {
       paginate: (val) => dispatch(paginate(val))
   }
}

export default connect(null, mapDispatchToProps)(Pagination)

{/* <li className="active" onClick={() => (props.paginate(1))}><a href="#!">1</a></li>
                <li className="waves-effect"><a href="#!">2</a></li>
                <li className="waves-effect"><a href="#!">3</a></li>
                <li className="waves-effect"><a href="#!">4</a></li>
                <li className="waves-effect"><a href="#!">5</a></li> */}