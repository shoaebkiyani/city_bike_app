import Pagination from "react-bootstrap/Pagination";

const PaginationPage = ({
  totalTrips,
  rowsPerPage,
  currentPage,
  getFirstPage,
  getPrevPage,
  getNextPage,
  getLastPage,
  onRowsPerPageChange,
  getTripsSorted,
}) => {
  const totalPages = Math.ceil(totalTrips / rowsPerPage);
  return (
    <Pagination>
      <div style={{ display: "flex", color: "#fff" }}>
        <Pagination.First
          disabled={currentPage < 2}
          onClick={(currentPage) => getFirstPage(currentPage)}
        />
        <Pagination.Prev
          disabled={currentPage < 2}
          onClick={(currentPage) => getPrevPage(currentPage)}
        />
        <Pagination.Item>{`Page: ${currentPage} of ${totalPages}`}</Pagination.Item>
        <Pagination.Next
          disabled={currentPage > totalTrips}
          onClick={(currentPage) => getNextPage(currentPage)}
        />
        <Pagination.Last
          disabled={currentPage > totalTrips}
          onClick={(totalPages) => getLastPage(totalPages)}
        />
        <Pagination.Item>
          <div style={{ display: "flex" }}>
            <div style={{ paddingRight: "4px" }}>Rows per page </div>
            <select
              style={{ borderRadius: "5px" }}
              onChange={onRowsPerPageChange}
              id="page-size"
            >
              <option value="10">10</option>
              <option value="100">100</option>
              <option value="500">500</option>
              <option value="1000">1000</option>
            </select>
          </div>
        </Pagination.Item>
        <Pagination.Item>
          <div style={{ display: "flex" }}>
            <div style={{ paddingRight: "4px" }}>Page Order </div>
            <select
              style={{ borderRadius: "5px" }}
              onChange={getTripsSorted}
              id="order"
            >
              <option value="desc">desc</option>
              <option value="asc">asc</option>
            </select>
          </div>
        </Pagination.Item>
      </div>
    </Pagination>
  );
};
export default PaginationPage;
