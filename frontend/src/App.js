import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import Home from "./components/Home";
import About from "./components/About";

const App = () => {
  /* States */
  const [tripData, setTripData] = useState([]);
  const [totalTrips, setTotalTrips] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [skipPage, setSkipPage] = useState(0);
  const [pageOrder, setPageOrder] = useState(-1);
  const [searchText, setSearchText] = useState("");

  const fetchTrips = async () => {
    const params = new URLSearchParams({
      page: currentPage,
      limit: rowsPerPage,
      order: pageOrder,
      search: searchText,
    });
    const res = await fetch(`api/trips?${params}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const tripData = await res.json();
    setTripData(tripData.trips);
    setTotalTrips(tripData.totalDocs);
    setRowsPerPage(tripData.limit);
    setSkipPage(tripData.skip);
    setPageOrder(tripData.order);
    setSearchText(tripData.search);
  };

  const getFirstPage = (currentPage) => {
    setCurrentPage(currentPage - (currentPage - 1));
  };

  const getPrevPage = (currentPage) => {
    setCurrentPage(currentPage - 1);
  };

  const getNextPage = (currentPage) => {
    setCurrentPage(currentPage + 1);
  };

  const getLastPage = (totalPages) => {
    setCurrentPage(totalPages - 1);
  };

  const onRowsPerPageChange = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
  };

  const getTripsSorted = (e) => {
    if (e.target.value === "desc") {
      setPageOrder(e.target.value, -1);
    } else {
      setPageOrder((e.target.value, 1));
    }
  };

  const handleSearch = (searchText) => {
    setSearchText(searchText);
  };

  const handleClear = () => setSearchText("");

  useEffect(() => {
    fetchTrips();
    // eslint-disable-next-line
  }, [currentPage, rowsPerPage, pageOrder, searchText]);

  return (
    <>
      <Router>
        <Header />
        <div className="container">
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  tripData={tripData}
                  totalTrips={totalTrips}
                  rowsPerPage={rowsPerPage}
                  currentPage={currentPage}
                  getFirstPage={getFirstPage}
                  getPrevPage={getPrevPage}
                  getNextPage={getNextPage}
                  getLastPage={getLastPage}
                  skipPage={skipPage}
                  onRowsPerPageChange={onRowsPerPageChange}
                  getTripsSorted={getTripsSorted}
                  searchTrips={handleSearch}
                  clearSearch={handleClear}
                />
              }
            />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </Router>
    </>
  );
};

export default App;
