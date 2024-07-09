import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Grid, Header, Button, Icon,Label } from "semantic-ui-react";
import Navbar from "../../../shared/Navbar";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import Footer from "../../../shared/Footer";
import StockHeader from "../stock-header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ListStock = () => {
  const [stockData, setStockData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10); // Adjust based on your backend limit
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchStockData();
  }, []);

  const fetchStockData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/stock");
      setStockData(response.data);
      console.log(response.data);
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
      const button = (
        <Button
          key={pageNumber}
          onClick={() => handlePageClick(pageNumber)}
          disabled={pageNumber === page}
          primary={pageNumber === page}
        >
          {pageNumber}
        </Button>
      );

      pageNumbers.push(button);
    }

    return pageNumbers;
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handlePrevPage = () => {
    setPage(page - 1);
  };

  const exportToExcel = () => {
    try {
      const ws = XLSX.utils.json_to_sheet(stockData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "StockData");
      XLSX.writeFile(wb, "stock_data.xlsx");
      toast.success("Data Exported to Excel successfully");
    } catch (error) {
      console.error("Error exporting data:", error);
      toast.error("Error exporting data");
    }
  };

  const getSoldBadgeAndCaption = (stock) => {
    let color;
    let caption;
  
    if (stock === null) {
      color = "orange";
      caption = "Stock is empty";
    } else if (stock > 10) {
      color = "green";
      caption = "Fine";
    } else if (stock <= 10 && stock > 0) {
      color = "red";
      caption = "Stock will empty soon";
    } else if (stock === 0) {
      color = "orange";
      caption = "Stock is empty";
    }
  
       return (
      <Label color={color} className="badge-sold">
        {caption}
      </Label>
    );
  };

  return (
    <div>
      <Grid columns="equal" style={{ margin: 0 }}>
        <Grid.Row style={{ padding: 0 }}>
          <Grid.Column width={2} style={{ padding: 0 }}></Grid.Column>
          <Grid.Column stretched style={{ padding: 0 }}>
            <Navbar />
            <StockHeader />
            <Header as="h2">Stock</Header>
            <div style={{ marginTop: "50px" }}>
            <Header as="h2">Book Search: Quick </Header>
            <div class="ui grid">
              <div class="eight wide column left-aligned">
              {/* <div class="search-container"> */}
                  <div class="ui ">
                    <label>Select Author : </label>
                    <div class="ui icon input">
                      <input
                        type="text"
                        placeholder="Search Author"
                        
                      />
                      <i class="search icon"></i>
                    </div>
                    <div class="results"></div>
                  </div>
                {/* </div> */}
              </div>
             
              <div class="four wide column right-aligned">
                {/* <div class="search-container"> */}
                  <div class="ui ">
                    <label>Select Book : </label>
                    <div class="ui icon input">
                      <input
                        type="text"
                        placeholder="Search Book"
                                         />
                      <i class="search icon"></i>
                    </div>
                    <div class="results"></div>
                  </div>
                {/* </div> */}
              </div>
              
            </div>
           </div>
            <div className="eight wide column right-aligned">
              <div className="search-container">
                <div className="ui">
                  <div className="ui icon input">
                    <button
                      className="ui labeled icon green button"
                      onClick={exportToExcel}
                    >
                      <Icon name="file excel outline"></Icon>Export to Excel
                    </button>
                  </div>
                  <div className="results"></div>
                </div>
              </div>
            </div>
            <Table celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Book ID</Table.HeaderCell>
                  <Table.HeaderCell>Cover Page</Table.HeaderCell>
                  <Table.HeaderCell>Title</Table.HeaderCell>
                  <Table.HeaderCell>Purchased</Table.HeaderCell>
                  <Table.HeaderCell>Sold</Table.HeaderCell>
                  <Table.HeaderCell>Stock</Table.HeaderCell>
                  <Table.HeaderCell>Info</Table.HeaderCell>
                  <Table.HeaderCell>View More</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {stockData.map((item) => (
                  <Table.Row key={item.book_id}>
                    <Table.Cell style={{ width: "100px" }}>{item.book_id}</Table.Cell>
                    <Table.Cell style={{ width: "100px" }}>
                      <img
                        src={item.imageURL}
                        alt="Cover Page"
                        style={{ width: "50px", height: "70px" }}
                      />
                    </Table.Cell>
                    <Table.Cell style={{ width: "300px" }}>{item.title}</Table.Cell>
                    <Table.Cell style={{ width: "100px" }}>{item.purchase}</Table.Cell>
                    <Table.Cell style={{ width: "100px" }}> {item.sold}</Table.Cell>
                    <Table.Cell style={{ width: "100px" }}>{item.stock}</Table.Cell>
                    <Table.Cell style={{ width: "100px" }}>  {getSoldBadgeAndCaption(item.stock)}</Table.Cell>
                    <Table.Cell style={{ width: "100px" }}><Icon name="info circle"></Icon> </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
              <Table.Footer>
                <Table.Row>
                  <Table.HeaderCell colSpan="8" textAlign="center">
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
      {/* <Footer /> */}
      <ToastContainer />
    </div>
  );
};

export default ListStock;
