import { CCardBody, CCardHeader, CCardImage, CCol, CRow, CButton, CHeader } from "@coreui/react";
import React, { useMemo } from "react";
import { CIcon } from "@coreui/icons-react";

import JSONdata from "../../data/list.json";
import { useParams } from "react-router-dom";
import Link from "next/link";
import { cilArrowLeft } from "@coreui/icons";


const Details = () => {
  const { id } = useParams();

  const item = useMemo(
    () =>
      JSONdata.attractionList.find(
        (fav) => String(fav.card.poiId) === id
      ),
    [id]
  );
  if (!item) {
    return <div>Item not found</div>; // Handle case where item is not found
  }


  return (
    <>
    <CHeader className="topheader">
        <CButton className="btn-link" href="/">
            <CIcon
                icon={cilArrowLeft}
                height={20}
                width={20}
                size="md"
                style={{ fill: "blue", cursor: "pointer", marginRight: '5px' }}
                /> 
            Back to Home
        </CButton>
    </CHeader>
      <CRow className="detailsBody mt-5 p-3">
        <CCol md={12}>
                <CCardHeader>
                    <h2>
                        {item.card.poiName}
                    </h2>
                </CCardHeader>
                <div className="bg-gray">
                    <CCardImage  orientation="top" className="details img" src={item.card.coverImageUrl} />
                </div>
                <CCardBody>
                    <section>
                        Description
                        <hr/>
                        <article>
                            {item.card.commentInfo.commentContent}
                        </article>
                    </section>
                    <section>
                        Location
                        <hr/>
                        <article>
                            {item.card.location}
                        </article>
                    </section>
                    <section>
                        Price Info
                        <hr/>
                        <article>
                           RM {item.card.priceInfo.price}
                        </article>
                    </section>
                    <section>
                        Map
                        <hr/>
                        <article>
                        <iframe                               
                            src={`https://www.google.com/maps?q=${item.card.coordinate.latitude},${item.card.coordinate.longitude}&z=15&output=embed`}
                            width="100%"
                            height="450"
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade">
                            </iframe>
                        </article>
                    </section>
                </CCardBody>
          
          {/* Add more fields as needed */}
        </CCol>
      </CRow>
    </>
  );
};

export default Details;
