"use client";

import React from "react";
import { CIcon } from "@coreui/icons-react";
import { cilStar } from "@coreui/icons";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { CButton, CCol, CRow } from "@coreui/react";

const CardHolder = ({ title, pic, desc, numberID, onSelect, btnadd=true,handlePage }) => {
  // Check if this card is selected
  const selectedPlaces = JSON.parse(localStorage.getItem("myfav")) || [];
  const isSelected = selectedPlaces.some((place) => place.card.poiId === numberID);


  return (
    <div className="shadow boxcontainer bg-white-border p-2">
      <div className="top">
        <div className="picholder">
          <Image
            src={pic}
            height={200}
            width={300}
            alt={title ? `${title} image` : "Image"}
            className="img-fluid"
            priority={true}
            style={{ width: 'auto', height: '200px' }} 
          />
        </div>
        <hr />
        <div>
          <span className="nameTitle">
            <h5>{title}</h5>
            {btnadd ?
             !isSelected ? (
              <div className="buttonadd" onClick={() => onSelect(numberID)}>
                <CIcon
                icon={cilStar}
                height={20}
                width={20}
                size="md"
                style={{ fill: "blue", cursor: "pointer" }}
                /> 
               </div>
            ) : (
              <div className="buttonremove" onClick={() => onSelect(numberID)}>
                <FontAwesomeIcon
                  icon={faStar}
                  style={{
                    color: "gold",
                    cursor: "pointer",
                    fontSize: "24px",
                  }}
                  />
              </div>
            )
          :''}
          </span>
          <p className="desc text-muted">{desc}</p>
        </div>
        {btnadd?
          <CRow>
            <CCol md={12}>
              <a className="float-right btn btn-link" onClick={() => handlePage(numberID)}>Details</a>
              
            </CCol>
          </CRow>
          :
          ''
        }
      </div>
    </div>
  );
};

export default CardHolder;
