import React from "react"
import './pagination.css'

interface paginationProps {
    currentPage:number,
    totalPages:number,
    onPageChange:(page:number)=>void
}

const Pagination : React.FC<paginationProps> = ({currentPage, totalPages, onPageChange})=>{

    const pageNumbers = Array.from({length:totalPages}, (_, i)=>i+1)
    return(
        <nav>
            <ul className="pagination">
                <li className={`page-item ${currentPage == 1?'disable' : 'enabled'}`} style={{display:`${currentPage == 1? 'none' : 'block'}`}}>
                    <button className="page-buttons" onClick={()=>onPageChange(currentPage - 1)}>
                        Previous
                    </button>
                </li>
                {pageNumbers.map((page)=>(
                    <li key={page}>
                        <button className="page-buttons" onClick={()=>onPageChange(page)} style={{color:`${currentPage === page ? 'blue' : ''}`}}>
                            {page}
                        </button>
                    </li>
                ))}
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : 'enabled'}`} style={{display:`${currentPage == totalPages ? 'none' : 'block'}`}}>
                    <button className="page-buttons" onClick={()=>onPageChange(currentPage+1)}>
                        Next
                    </button>
                </li>
            </ul>
        </nav>
        
    )
}

export default Pagination