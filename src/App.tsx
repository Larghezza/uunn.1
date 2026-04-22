/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Countries from "./pages/Countries";
import CountryDetail from "./pages/CountryDetail";
import Schools from "./pages/Schools";
import SchoolDetail from "./pages/SchoolDetail";
import Compare from "./pages/Compare";
import Search from "./pages/Search";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Admin from "./pages/Admin";

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="countries" element={<Countries />} />
            <Route path="countries/:countrySlug" element={<CountryDetail />} />
            <Route path="schools" element={<Schools />} />
            <Route path="schools/:schoolSlug" element={<SchoolDetail />} />
            <Route path="compare" element={<Compare />} />
            <Route path="search" element={<Search />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="privacy" element={<Privacy />} />
            <Route path="terms" element={<Terms />} />
            <Route path="admin" element={<Admin />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}
