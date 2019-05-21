import React from "react";
import { Link } from 'react-router-dom'
import { scrollToTop } from '../miniComponents/scrollToTop'

const PaginationList = (props) => {
    // console.log(props)
    var paginationList = []
    const total = (props.paginationState.pagVal < 5) ? Math.ceil(props.paginationState.pagVal) : 5;
    for(var i = 1; i <= (total); i++) {
        if(props.paginationState.offset < total) {
            paginationList.push(<li className="waves-effect" key={i}><Link to={"/" + props.paginationState.pageType + "/" + i} onClick={scrollToTop} >{i}</Link></li>)
        } else if (props.paginationState.offset >= total && props.paginationState.offset <= props.paginationState.totalPages){
            let pageNumber = (props.paginationState.offset - total) + 1;
            if (Number(props.paginationState.offset) === Number(props.paginationState.totalPages)) {
                pageNumber = (props.paginationState.offset - total);
            }
            paginationList.push(<li className="waves-effect" key={i}><Link to={"/" + props.paginationState.pageType + "/" + (i + pageNumber)} onClick={scrollToTop} >{i + pageNumber}</Link></li>)
        }
    }

    return (
        paginationList
    )
}

export default PaginationList