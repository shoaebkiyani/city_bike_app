import { Table } from "react-bootstrap";
import PaginationPage from "./PaginationPage";
import Search from "./Search";

const Home = ({
  tripData,
  totalTrips,
  rowsPerPage,
  currentPage,
  getFirstPage,
  getPrevPage,
  getNextPage,
  getLastPage,
  skipPage,
  onRowsPerPageChange,
  getTripsSorted,
  searchTrips,
  clearSearch,
}) => {
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <Search searchTrips={searchTrips} clearSearch={clearSearch} />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      ></div>
      <PaginationPage
        totalTrips={totalTrips}
        rowsPerPage={rowsPerPage}
        currentPage={currentPage}
        getFirstPage={getFirstPage}
        getPrevPage={getPrevPage}
        getNextPage={getNextPage}
        getLastPage={getLastPage}
        onRowsPerPageChange={onRowsPerPageChange}
        getTripsSorted={getTripsSorted}
      />
      <Table responsive striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>#</th>
            <th>Departure</th>
            <th>Return</th>
            <th>Departure Station Name</th>
            <th>Return Station Name</th>
            <th>Covered Distance (km)</th>
            <th>Duration (min)</th>
          </tr>
        </thead>

        {tripData.map((item, index) => (
          <tbody key={item._id}>
            <tr>
              <td>{index + skipPage + 1}</td>
              <td>
                {item.departure_date.split("T")[0]}
                {"\n"}
                {item.departure_date.split("T")[1].split(".000Z")}
              </td>
              <td>
                {item.return_date.split("T")[0]}
                {"\n"}
                {item.return_date.split("T")[1].split(".000Z")}
              </td>
              <td>{item.departure_station_name}</td>
              <td>{item.return_station_name}</td>
              <td>{item.covered_distance_m}</td>
              <td>{item.duration_sec}</td>
            </tr>
          </tbody>
        ))}
      </Table>
    </div>
  );
};
export default Home;
