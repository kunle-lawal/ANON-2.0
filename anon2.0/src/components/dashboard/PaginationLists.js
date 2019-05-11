import React from "react";
import {Link} from 'react-router-dom'

const PaginationList = (props) => {
    var paginationList = []
    const total = (props.paginationState.pagVal < 5) ? Math.ceil(props.paginationState.pagVal) : 5;
    for(var i = 1; i <= (total); i++) {
        if(props.paginationState.offset < total) {
            paginationList.push(<li className="waves-effect" key={i}><Link to={"/" + i} >{i}</Link></li>)
        } else if (props.paginationState.offset >= total && props.paginationState.offset <= props.paginationState.totalPages){
            let pageNumber = (props.paginationState.offset - total) + 1;
            if (Number(props.paginationState.offset) === Number(props.paginationState.totalPages)) {
                pageNumber = (props.paginationState.offset - total);
            }
            paginationList.push(<li className="waves-effect" key={i}><Link to={"/" + (i+pageNumber)} >{i + pageNumber}</Link></li>)
        }
    }

    return (
        paginationList
    )
}

export default PaginationList