"use client";

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addPlace, removePlace } from "./reducers/historicalActions";
import CardHolder from "./components/CardHolder";
import JSONdata from "../data/list.json";
import { CCol, CHeader, CRow } from "@coreui/react";
import Cardsearch from "./components/CardSearch";
import { CardFooter } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState(null);
  const router = useNavigate();
  const dispatch = useDispatch();

  const { data, selectedPlaces, loading, error } = useSelector(
    (state) => state.historical
  );

  useEffect(() => {
    dispatch({ type: "FETCH_DATA_REQUEST" });
 
    const savedFavorites = JSON.parse(localStorage.getItem("myfav")) || [];
    savedFavorites.forEach((place) => dispatch(addPlace(place)));
  }, [dispatch]);
 
  useEffect(() => {
    localStorage.setItem("myfav", JSON.stringify(selectedPlaces));
  }, [selectedPlaces]);
  
  const updateSelectedPlace = (place) => {
    const alreadySelected = selectedPlaces.some(
      (fav) => fav.card.poiId === place.card.poiId
    );

    if (alreadySelected) {
      dispatch(removePlace(place.card.poiId));
    } else {
      dispatch(addPlace(place));
    }
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
  };

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
        {selectedPlaces.length > 0 ? (
          <CRow>
            {selectedPlaces.map((place, i) => (
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
