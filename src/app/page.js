"use client";

import React, { Suspense } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './store';

const HomePage = React.lazy(() => import("./Home"));
const Details = React.lazy(() => import("./page/Details"));

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/details/:id" element={<Details />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </Suspense>
      </Router>
    </Provider>
  );
}
