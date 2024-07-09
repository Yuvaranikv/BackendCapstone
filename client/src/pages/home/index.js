import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  Grid,
  Header,
  Button,
  Icon,
  Label,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardMeta,
  Image,
  CardGroup,List,ListItem,
  Segment,
  SegmentInline,
  GridColumn
} from "semantic-ui-react";
import Navbar from "../../shared/Navbar";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import Footer from "../../shared/Footer";
import HomeHeader from "../home/home-header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HomePage = () => {
  const [stockData, setStockData] = useState([]);
  const [booksalesData, setBookSalesData] = useState([]);
  const [totalsalesData, setTotalSalesData] = useState([]);
  const [topsellingData, setTopSellingData] = useState([]);
  const [stockAlertData, setStockAlertData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10); // Adjust based on your backend limit
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchTotalStockData();
    fetchStockData();
    fetchBookSalesData();
    fetchTotalSalesData();
    fetchTopsellingData();
  }, []);

  const fetchTotalStockData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/stock/totalstock"
      );
      setStockData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching stock data:", error);
    }
  };

  const fetchBookSalesData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/stock/bookssold");
      setBookSalesData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching stock data:", error);
    }
  };

  const fetchTotalSalesData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/stock/totalsales"
      );
      setTotalSalesData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching stock data:", error);
    }
  };

  const fetchTopsellingData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/stock/topsellingbooks"
      );
      setTopSellingData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching stock data:", error);
    }
  };

  const fetchStockData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/stock");
      setStockAlertData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching stock data:", error);
    }
  };

  const getStockAlertBooks = () => {
    return stockAlertData.filter(item => item.stock <= 10 || item.stock === null);
    console.log(stockData);
  };

  return (
    <div>
      <Grid columns="equal" style={{ margin: 0 }}>
        <Grid.Row style={{ padding: 0 }}>
          <Grid.Column width={2} style={{ padding: 0 }}></Grid.Column>
          <Grid.Column stretched style={{ padding: 0 }}>
            <Navbar />
          <HomeHeader />
            <Header as="h2">Home</Header>
            <Card.Group itemsPerRow={3}>
              {stockData.map((item) => (
                <Card color="orange" style={{ width: "20%" }}>
                  <Header as="h2" align="center">
                    {" "}
                    Books InStock
                  </Header>
                  <CardContent>
                    <CardHeader align="center"> {item.total_stock}</CardHeader>
                  </CardContent>
                </Card>
              ))}
              {booksalesData.map((item) => (
                <Card color="blue" style={{ width: "20%" }}>
                  <Header as="h2" align="center">
                    {" "}
                    Books Sold Today
                  </Header>
                  <CardContent>
                    <CardHeader align="center">
                      {item.BooksSoldToday}
                    </CardHeader>
                  </CardContent>
                </Card>
              ))}
              {totalsalesData.map((item) => (
                <Card color="green" style={{ width: "20%" }}>
                  <Header as="h2" align="center">
                    {" "}
                    Today's Sales
                  </Header>
                  <CardContent>
                    <CardHeader align="center">
                      {" "}
                      {item.TotalSalesToday}
                    </CardHeader>
                  </CardContent>
                </Card>
              ))}
            </Card.Group>
            <Header as="h2">Top 5 selling books</Header>
            <Card.Group itemsPerRow={5}>
              {topsellingData.map((item) => (
                 <Card key={item.id} style={{ height: "300px"  }}>
                  <Image
                    src={item.imageURL}
                    wrapped
                    ui={false}
                    style={{ width: "230px" }}
                  />
                  <CardContent>
                    <CardHeader>{item.title}</CardHeader>
                    <CardMeta>{item.author}</CardMeta>
                    <CardDescription>{item.description}</CardDescription>
                  </CardContent>
                  <CardContent extra>
                    <a>
                      <Icon name="user" />
                      {item.total_quantity_sold} Sold
                    </a>
                  </CardContent>
                </Card>
              ))}
            </Card.Group>
            
            <div style={{ marginTop: "250px" }}>
              <Segment>
                        <Header as="h2">Stock Alert</Header>
            <List>
              {getStockAlertBooks().map((item) => (
                <ListItem key={item.id}>
                  <Icon name="warning circle" color="red" />
                            {item.title} -   {item.stock === null ? "Stock is empty" : `Only ${item.stock} left`}
                             </ListItem>
                          ))}
                       </List>
            </Segment>
            </div>
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
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <ToastContainer />
    </div>
  );
};

export default HomePage;
