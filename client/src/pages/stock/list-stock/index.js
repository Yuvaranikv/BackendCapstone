import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Grid, Header,Button,Icon } from "semantic-ui-react";
import Navbar from "../../../shared/Navbar";
import BookHeader from "../../../shared/Header";
import Footer from "../../../shared/Footer";
const ListStock = () => {
  const [stockData, setStockData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5); // Adjust based on your backend limit
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchStockData();
  }, []);

  const fetchStockData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/stock");
      setStockData(response.data);
    } catch (error) {
      console.error("Error fetching stock data:", error);
    }
  };

  const handlePageClick = (pageNumber) => {
    setPage(pageNumber);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];

    for (let pageNumber = 1; pageNumber <= totalPages; pageNumber++) {
      // Create a button element for each page number
      const button = (
        <Button
          key={pageNumber}
          onClick={() => handlePageClick(pageNumber)}
          disabled={pageNumber === page} // Disable current page button
          primary={pageNumber === page} // Highlight current page button
        >
          {pageNumber}
        </Button>
      );

      // Push the button element into the pageNumbers array
      pageNumbers.push(button);
    }

    // Return the array of page number buttons
    return pageNumbers;
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handlePrevPage = () => {
    setPage(page - 1);
  };

  return (
    <div>
      <Grid columns="equal" style={{ margin: 0 }}>
        <Grid.Row style={{ padding: 0 }}>
          <Grid.Column width={2} style={{ padding: 0 }}></Grid.Column>
          <Grid.Column stretched style={{ padding: 0 }}>
            <Navbar />
            <BookHeader />
            <Header as="h2">Stock</Header>
            <Table celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Book ID</Table.HeaderCell>
                  <Table.HeaderCell>Title</Table.HeaderCell>
                  <Table.HeaderCell>Purchased</Table.HeaderCell>
                  <Table.HeaderCell>Sold</Table.HeaderCell>
                  <Table.HeaderCell>Stock</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {stockData.map((item) => (
                  <Table.Row key={item.book_id}>
                    <Table.Cell>{item.book_id}</Table.Cell>
                    <Table.Cell>{item.title}</Table.Cell>
                    <Table.Cell>{item.purchase}</Table.Cell>
                    <Table.Cell>{item.sold}</Table.Cell>
                    <Table.Cell>{item.stock}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
              <Table.Footer>
                <Table.Row>
                  <Table.HeaderCell colSpan="6" textAlign="center">
                    <Button
                      icon
                      labelPosition="left"
                      disabled={page === 1}
                      onClick={handlePrevPage}
                    >
                      <Icon name="left arrow" />
                      Previous
                    </Button>
                    <span>{renderPageNumbers()}</span>
                    <Button
                      icon
                      labelPosition="right"
                      disabled={stockData.length < pageSize}
                      onClick={handleNextPage}
                    >
                      Next
                      <Icon name="right arrow" />
                    </Button>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Footer>
            </Table>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Footer />
    </div>
  );
};

export default ListStock;
