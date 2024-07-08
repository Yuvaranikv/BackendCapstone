import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Grid, Header, Button, Icon,Label } from "semantic-ui-react";
import Navbar from "../../shared/Navbar";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import Footer from "../../shared/Footer";
import HomeHeader from "../home/home-header";
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
    } catch (error) {
      console.error("Error fetching stock data:", error);
    }
  };

    return (
    <div>
      <Grid columns="equal" style={{ margin: 0 }}>
        <Grid.Row style={{ padding: 0 }}>
          <Grid.Column width={2} style={{ padding: 0 }}></Grid.Column>
          <Grid.Column stretched style={{ padding: 0 }}>
            <Navbar />
           <HomeHeader />
            <Header as="h2">Stock</Header>
            <Card.Group itemsPerRow={3} centered>
                <Card onClick={handleBookCardClick} style={{ width: '20%' }}>
                  <Image src={bannerImage} wrapped ui={false} />
                  <CardContent>
                    <CardHeader>Add Book</CardHeader>
                    <CardMeta>Joined in 2016</CardMeta>
                    <CardDescription>
                      Daniel is a comedian living in Nashville.
                    </CardDescription>
                  </CardContent>
                  <CardContent extra>
                    <a>
                      <Icon name="user" />
                      10 Friends
                    </a>
                  </CardContent>
                </Card>
                <Card onClick={handleAuthorCardClick} style={{ width: '20%' }}>
                  <Image src={bannerImage1} wrapped ui={false} />
                  <CardContent>
                    <CardHeader>Add Author</CardHeader>
                    <CardMeta>Joined in 2016</CardMeta>
                    <CardDescription>
                      Daniel is a comedian living in Nashville.
                    </CardDescription>
                  </CardContent>
                  <CardContent extra>
                    <a>
                      <Icon name="user" />
                      10 Friends
                    </a>
                  </CardContent>
                </Card>
                <Card onClick={handleGenresCardClick} style={{ width: '20%' }}>
                  <Image src={bannerImage2} wrapped ui={false} />
                  <CardContent>
                    <CardHeader>Add Genres</CardHeader>
                    <CardMeta>Joined in 2016</CardMeta>
                    <CardDescription>
                      Daniel is a comedian living in Nashville.
                    </CardDescription>
                  </CardContent>
                  <CardContent extra>
                    <a>
                      <Icon name="user" />
                      10 Friends
                    </a>
                  </CardContent>
                </Card>
              </Card.Group>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default ListStock;
