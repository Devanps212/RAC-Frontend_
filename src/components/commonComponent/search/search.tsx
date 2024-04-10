import React, { useState } from 'react'
import { Form, FormControl } from 'react-bootstrap'
import './search.css'
import { SearchOneProps } from '../../../types/searchInterface'

const SearchOne : React.FC<SearchOneProps> = ({onSearch})=>{

    const [search, setSearch] = useState('')

    const handleSearch: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        e.preventDefault()
        const value = e.currentTarget.value
        setSearch(value)
        onSearch(value)
    }

    return(
    <Form className="search-form mb-5">
        <FormControl
            type="text"
            placeholder="Search here"
            className="search-input mr-sm-2"
            value={search}
            onChange={handleSearch}
        />
         <div className="loading-spinner" style={{ display: 'none' }} />
    </Form>
    )
}

export default SearchOne