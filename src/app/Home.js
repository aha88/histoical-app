"use client";

import React, { useEffect, useState } from "react";
import CardHolder from "./components/CardHolder";
import JSONdata from "../data/list.json";
import { CCol, CHeader, CRow } from "@coreui/react";
import Cardsearch from "./components/CardSearch";
import { CardFooter } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';


export default function Home() {
  const [item, setItem] = useState([]); // State for selected places
  const [searchTerm, setSearchTerm] = useState(null);
  const router = useNavigate();
  const dispatch = useDispatch();
  // const { data, loading, error } = useSelector((state) => state.historical);


  useEffect(() => {
    const myfav = () => {
      if(localStorage.getItem("myfav")){
      const storage = localStorage.getItem("myfav");
      setItem(storage ? JSON.parse(storage) : []);
    }
  }

  dispatch({ type: 'FETCH_DATA_REQUEST' });
     myfav
     
  }, [dispatch]);



  const updateSelectedPlace = (place) => {
    const existingFavs = JSON.parse(localStorage.getItem("myfav")) || [];
    const alreadySelected = existingFavs.some(
      (fav) => fav.card.poiId === place.card.poiId
    );

    const updatedFavs = alreadySelected
      ? existingFavs.filter((fav) => fav.card.poiId !== place.card.poiId) // Remove if exists
      : [...existingFavs, place]; 
      
    localStorage.setItem("myfav", JSON.stringify(updatedFavs));
    setItem(updatedFavs);
  };

  const handleSearch = (val) => {
    const searchName = val.toLowerCase();
    const results = JSONdata.attractionList.filter((place) =>
      place.card.poiName.toLowerCase().includes(searchName)
    );
    setSearchTerm(results);
  };

  const goToPage = (e) => {
    router(`/details/${e}`); 
  }

  return (
    <>
      <CHeader className="topheader">
        <Cardsearch search={handleSearch} />
      </CHeader>
      <CRow className="mt-5 p-3">
        <CCol md={12}>
          {!searchTerm ? (
            <h2>Historical Place</h2>
          ) : (
            <h2>Search Location</h2>
          )}
        </CCol>

        {!searchTerm ? (
          <CCol md={12}>
            <CRow>
              {JSONdata.attractionList.map((place, i) => (
                <CCol md={4} sm={6} key={i} className=" mt-3">
                  <CardHolder
                    title={place.card.poiName}
                    pic={place.card.coverImageUrl}
                    desc={place.card.commentInfo.commentContent}
                    numberID={place.card.poiId}
                    onSelect={() => updateSelectedPlace(place)}
                    handlePage={() => goToPage(place.card.poiId)}
                  />
                </CCol>
              ))}
            </CRow>
          </CCol>
        ) : (
          <CCol md={12}>
            <CRow>
              {searchTerm.map((place, i) => (
                <CCol md={4} sm={6} key={i} className=" mt-3">
                  <CardHolder
                    title={place.card.poiName}
                    pic={place.card.coverImageUrl}
                    desc={place.card.commentInfo.commentContent}
                    numberID={place.card.poiId}
                    onSelect={() => updateSelectedPlace(place)}
                    handlePage={() => goToPage(place.card.poiId)}
                  />
                </CCol>
              ))}
            </CRow>
          </CCol>
        )}
      </CRow>

      <CRow className="section mt-5 p-3">
        <CCol md={12}>
          <h2>Selected Place</h2>
        </CCol>
        {item.length > 0 ? (
          <CRow>
            {item.map((place, i) => (
              <CCol md={4} sm={6} key={i} className="d-flex mt-3">
                <CardHolder
                  title={place.card.poiName}
                  pic={place.card.coverImageUrl}
                  desc={place.card.commentInfo.commentContent}
                  numberID={place.card.poiId}
                  btnadd={false}
                />
              </CCol>
            ))}
          </CRow>
        ) : (
          <p>No place selected yet.</p>
        )}
      </CRow>
      <CardFooter>
        <p className="text-center p-2">Copyright 2025</p>
      </CardFooter>
    </>
  );
}