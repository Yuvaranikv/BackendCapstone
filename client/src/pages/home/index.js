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
  CardGroup,
  List,
  ListItem,
  Segment,
  SegmentInline,
  GridColumn,
} from "semantic-ui-react";
import Navbar from "../../shared/Navbar";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import Footer from "../../shared/Footer";
import HomeHeader from "../home/home-header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './styles.css'; // Add this import for CSS

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
      const data = response.data.map(item => ({
        ...item,
        BooksSoldToday: item.BooksSoldToday === null ? 0 : item.BooksSoldToday
      }));
      setBookSalesData(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching stock data:", error);
    }
  };

  const fetchTotalSalesData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/stock/totalsales"
      );
      const data=response.data.map(item=>({
        ...item,TotalSalesToday:item.TotalSalesToday===null?0:item.TotalSalesToday
      }));
      setTotalSalesData(data);
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
    return stockAlertData.filter(
      (item) => item.stock <= 10 || item.stock === null
    );
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
                <Card color="orange" className="fixed-size-card">
                  <Header as="h2" align="center"style={{ padding:10}}>
                    Books InStock
                  </Header>
                  <CardContent>
                    <CardHeader align="center">{item.total_stock}&nbsp;&nbsp;<span>units</span></CardHeader>
                  </CardContent>
                </Card>
              ))}
              {booksalesData.map((item) => (
                <Card color="blue" className="fixed-size-card">
                  <Header as="h2" align="center" style={{ padding:10}}>
                    Books Sold Today
                  </Header>
                  <CardContent>
                    <CardHeader align="center">{item.BooksSoldToday}&nbsp;&nbsp;<span>units</span></CardHeader>
                  </CardContent>
                </Card>
              ))}
              {totalsalesData.map((item) => (
                <Card color="green" className="fixed-size-card">
                  <Header as="h2" align="center" style={{ padding:10}}>
                    Today's Sales
                  </Header>
                  <CardContent>
                    <CardHeader align="center"><Icon name="rupee sign"></Icon>{item.TotalSalesToday}</CardHeader>
                  </CardContent>
                </Card>
              ))}
            </Card.Group>
            <Header as="h2">Top 5 selling books</Header>
            <Card.Group itemsPerRow={5}>
              {topsellingData.map((item) => (
                <Card key={item.id} className="fixed-size-card">
                  <Image
                    src={item.imageURL}
                   
                    ui={false}
                    className="fixed-size-image"
                  /> 
                  <CardContent>
                    <CardHeader>{item.title}</CardHeader>
                    <CardMeta>{item.author}</CardMeta>
                    <CardDescription>{item.description}</CardDescription>
                  </CardContent>
                  <CardContent extra className="sold-number">
                    <a>
                      <Icon name="shopping cart" />
                      {item.total_quantity_sold} Sold
                    </a>
                  </CardContent>
                </Card>
              ))}
            </Card.Group>

            <div style={{ marginTop: "50px" }}>
              <Segment>
                <Header as="h2">Stock Alert</Header>
                <Grid>
                  <Grid.Row columns={3}>
                    {getStockAlertBooks().map((item) => (
                      <Grid.Column key={item.id}>
                        <Segment>
                          <Icon name="warning circle" color="red" />
                          {item.title} -{" "}
                          {item.stock === null
                            ? "(Stock is empty)"
                            : `(Only ${item.stock} left)`}
                        </Segment>
                      </Grid.Column>
                    ))}
                  </Grid.Row>
                </Grid>
              </Segment>
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <ToastContainer />
    </div>
  );
};

export default HomePage;
