"use client"

import { CCol, CFormInput, CInputGroup, CInputGroupText, CRow } from '@coreui/react';
import React  from 'react';


const Cardsearch = ({search }) => {

    const handleSearch = (e) => {
        const searchValue = e.target.value;
        if (search) {
          search(searchValue);  
        }
      };


    return (<CRow className='p-2'>
        <CCol md={12}>
            <CInputGroup>
                <CInputGroupText id="textsearch">Search</CInputGroupText>
                <CFormInput placeholder="Place Name" aria-label="Place Name" aria-describedby="textsearch" onChange={handleSearch} />
            </CInputGroup>
        </CCol>
    </CRow>)

}

export default Cardsearch