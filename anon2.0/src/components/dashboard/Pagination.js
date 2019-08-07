import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'
import { paginate } from '../../store/actions/navActions'
import { scrollToTop } from '../miniComponents/scrollToTop'

class Pagination extends Component {
    state = {
        paginationList: [1],
        resetDone: false,
    }

    resetList = (e) => {
        const { totalStories, limit, currentPage } = this.props.paginateProp;
        const totalPages = Math.round(totalStories / limit); //Total possible pages based on total stories//
        const _CurrentPage = (e) ? e.target.id : currentPage; //The current page//
        const maxItem = 4; //Maximum pagination values that can show up minus 1//
        let startVal = ((_CurrentPage) <= 1) ? 1 : _CurrentPage - 1;
        let endVal = ((Number(startVal) + maxItem) > totalPages) ? totalPages : (Number(startVal) + maxItem);
        if ((totalPages - startVal) < 5 && _CurrentPage > 1) {
            startVal = endVal - maxItem;
        }
        let paginationList = [];
        for (var i = ((startVal <= 1) ? 1 : startVal); i <= endVal; i++) {
            paginationList.push(i);
        }
        this.setState({
            paginationList: paginationList,
            resetDone: true
        })
        scrollToTop();
    }

    componentWillMount() {
        if(this.state.resetDone){return 0}
        this.resetList();
    }

    render() {
        const { totalStories, currentPage, limit, pageType } = this.props.paginateProp;
        const totalPages = Math.round(totalStories / limit);
        return (
            <div className='pagination_container center'>
                <ul className="pagination">
                    <li className={(currentPage > 1) ? "waves-effect enabled" : "disabled"} onClick={this.resetList}><Link to={"/" + pageType + '/1'}><i className="fas fa-angle-double-left"></i></Link></li>
                    {this.state.paginationList.map((item, index) => {
                        return (
                            <li id={item} className={(currentPage === item) ? "waves-effect current_page" : "waves-effect"} key={index}><Link to={"/" + pageType + "/" + (item)} id={item} onClick={this.resetList} >{item}</Link></li>
                        )
                    })}
                    <li className={(currentPage < totalPages) ? "waves-effect enabled" : "disabled"} onClick={this.resetList}><Link to={"/" + pageType + '/' + totalPages}><i className="fas fa-angle-double-right"></i></Link></li>
                </ul>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
   return {
       
   }
}

const mapStateToProps = (state, ownProps) => {
    return {
        
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Pagination)