import React from "react";
import {Link} from 'react-router-dom'

const PaginationList = (props) => {
    var x = []
    const total = (props.paginationState.pagVal < 5) ? Math.ceil(props.paginationState.pagVal) : 5;
    // console.log(props.paginationState.totalPages, props.paginationState.offset);
    for(var i = 1; i <= (total); i++) {
        if(props.paginationState.offset < total) {
            x.push(<li className="waves-effect" key={i}><Link to={"/" + i} >{i}</Link></li>)
        } else if (props.paginationState.offset >= total && props.paginationState.offset <= props.paginationState.totalPages){
            let pageNumber = (props.paginationState.offset - total) + 1;
            // console.log(props.paginationState.offset, total);
            if (Number(props.paginationState.offset) === Number(props.paginationState.totalPages)) {
                pageNumber = (props.paginationState.offset - total);
                // console.log(pageNumber);
            }
            x.push(<li className="waves-effect" key={i}><Link to={"/" + (i+pageNumber)} >{i + pageNumber}</Link></li>)
        }
    }

    return (
        x
    )
}

export default PaginationList