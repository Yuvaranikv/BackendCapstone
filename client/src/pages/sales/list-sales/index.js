import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  Grid,
  Button,
  Modal,
  Form,
  Input,
  Icon,
  Pagination,
} from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import Navbar from "../../../shared/Navbar";
import BookHeader from "../../../shared/Header";
import "./styles.css";
import Footer from "../../../shared/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Saleslist = () => {
  const [sales, setSales] = useState([]);
  const [saleDate, setSaleDate] = useState("");
  const [bookId, setBookId] = useState("");
  const [quantitySold, setQuantitySold] = useState("");
  const [comments, setComments] = useState("");
  const [selectedSale, setSelectedSale] = useState(null);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();
  const [deleteSaleId, setDeleteSaleId] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [filteredSales, setFilteredSales] = useState([]);

  useEffect(() => {
    fetchSales();
  }, [page]); // Reload sales when page changes

  const fetchSales = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/sales?page=${page}&limit=${pageSize}`
      );

      const { sales, totalCount } = response.data;

      setSales(sales);
      setFilteredSales(sales);
      const totalPagesCount = Math.ceil(totalCount / pageSize);
      setTotalPages(totalPagesCount);
    } catch (error) {
      console.error("Error fetching sales:", error);
    }
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handlePrevPage = () => {
    setPage(page - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedSale) {
      try {
        const response = await axios.put(
          `http://localhost:3000/sales/edit/${selectedSale.saleid}`,
          {
            bookid: bookId,
            quantitysold: quantitySold,
            saledate: saleDate,
            comments: comments,
          }
        );
        console.log("Updated sale:", response.data);
        fetchSales();
        setBookId("");
        setQuantitySold("");
        setSaleDate("");
        setComments("");
        setSelectedSale(null);
        setOpen(false);
        toast.success("Sale updated successfully");
      } catch (error) {
        console.error("Error updating sale:", error);
        toast.error("Error updating sale");
      }
    } else {
      try {
        const response = await axios.post(
          "http://localhost:3000/sales/add/",
          {
            bookid: bookId,
            quantitysold: quantitySold,
            saledate: saleDate,
            comments: comments,
          }
        );
        console.log("Added new sale:", response.data);
        fetchSales();
        setBookId("");
        setQuantitySold("");
        setSaleDate("");
        setComments("");
        setOpen(false);
        toast.success("Sale added successfully");
      } catch (error) {
        console.error("Error adding sale:", error);
        toast.error("Error adding sale");
      }
    }
  };

  const handleEditButtonClick = (sale) => {
    setSelectedSale(sale);
    setBookId(sale.bookid);
    setQuantitySold(sale.quantitysold);
    setSaleDate(sale.saledate);
    setComments(sale.comments);
    setOpen(true);
  };

  const handleDeleteButtonClick = async (sale) => {
    setDeleteSaleId(sale.saleid);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:3000/sales/delete/${deleteSaleId}`
      );
      console.log("Deleted sale");
      toast.success("Sale deleted successfully");
      fetchSales();
      setConfirmOpen(false); // Close confirmation modal after deletion
    } catch (error) {
      console.error("Error deleting sale:", error);
      toast.error("Error deleting sale");
    }
  };

  const handleCancelDelete = () => {
    setConfirmOpen(false);
    setDeleteSaleId(null); // Reset deleteSaleId state
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

  const handleSearch = (e) => {
    setSearchText(e.target.value);
    if (e.target.value === "") {
      setFilteredSales(sales);
    } else {
      setFilteredSales(
        sales.filter(
          (sale) =>
            sale.bookid.toString().includes(e.target.value) ||
            sale.saledate.includes(e.target.value)
        )
      );
    }
  };

  const handleResetSearch = () => {
    setSearchText("");
    setFilteredSales(sales);
  };

  return (
    <div>
      <Grid columns="equal" style={{ margin: 0 }}>
        <Grid.Row style={{ padding: 0 }}>
          <Grid.Column width={2} style={{ padding: 0 }}></Grid.Column>
          <Grid.Column stretched style={{ padding: 0 }}>
            <Navbar />
            <BookHeader />
            <div class="ui grid">
              <div class="eight wide column left-aligned">
                <div class="add-book-button-container">
                  <button
                    class="ui labeled icon black button"
                    onClick={() => setOpen(true)}
                  >
                    <i class="plus icon"></i>Add Sale
                  </button>
                </div>
              </div>
              <div class="eight wide column right-aligned">
                <div class="search-container">
                  <div class="ui ">
                    <div class="ui icon input">
                      <input
                        type="text"
                        placeholder="Search Sale"
                        value={searchText}
                        onChange={handleSearch}
                      />
                      <i class="search icon"></i>
                    </div>
                    <div class="results"></div>
                  </div>
                </div>
              </div>
            </div>
            <Modal open={open} onClose={() => setOpen(false)}>
              <Modal.Header>
                {selectedSale ? "Edit Sale" : "Add New Sale"}
              </Modal.Header>
              <Modal.Content>
                <Form onSubmit={handleSubmit}>
                  <Form.Field>
                    <label>Book ID</label>
                    <input
                      placeholder="Enter Book ID"
                      value={bookId}
                      onChange={(e) => setBookId(e.target.value)}
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>Quantity Sold</label>
                    <input
                      placeholder="Enter Quantity Sold"
                      value={quantitySold}
                      onChange={(e) => setQuantitySold(e.target.value)}
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>Sale Date</label>
                    <input
                      type="date"
                      placeholder="Enter Sale Date"
                      value={saleDate}
                      onChange={(e) => setSaleDate(e.target.value)}
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>Comments</label>
                    <textarea
                      placeholder="Enter Comments"
                      value={comments}
                      onChange={(e) => setComments(e.target.value)}
                    />
                  </Form.Field>
                  <Button color="green" type="submit">
                    {selectedSale ? "Update Sale" : "Add Sale"}
                  </Button>
                </Form>
              </Modal.Content>
            </Modal>
            <Table className="ui very basic collapsing selectable celled table sortable">
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Sl. No</Table.HeaderCell>
                  <Table.HeaderCell>Book ID</Table.HeaderCell>
                  <Table.HeaderCell>Quantity Sold</Table.HeaderCell>
                  <Table.HeaderCell>Sale Date</Table.HeaderCell>
                  <Table.HeaderCell>Comments</Table.HeaderCell>
                  <Table.HeaderCell>Edit</Table.HeaderCell>
                  <Table.HeaderCell>Delete</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {filteredSales.map((sale, index) => (
                  <Table.Row key={sale.saleid}>
                    <Table.Cell>{(page - 1) * pageSize + index + 1}</Table.Cell>
                    <Table.Cell>{sale.bookid}</Table.Cell>
                    <Table.Cell>{sale.quantitysold}</Table.Cell>
                    <Table.Cell>{sale.saledate}</Table.Cell>
                    <Table.Cell>{sale.comments}</Table.Cell>
                    <Table.Cell>
                      <Button
                        className="btn btn-primary btn-sm"
                        color="green"
                        size="mini"
                        onClick={() => handleEditButtonClick(sale)}
                      >
                        <Icon name="edit"></Icon> Edit
                      </Button>
                    </Table.Cell>
                    <Table.Cell>
                      <Button
                        className="btn btn-primary btn-sm"
                        color="red"
                        size="mini"
                        onClick={() => handleDeleteButtonClick(sale)}
                      >
                        <Icon name="delete"></Icon> Delete
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
              <Table.Footer>
                <Table.Row>
                  <Table.HeaderCell colSpan="7" textAlign="center">
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
                      disabled={sales.length < pageSize}
                      onClick={handleNextPage}
                    >
                      Next
                      <Icon name="right arrow" />
                    </Button>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Footer>
            </Table>
            <Modal
              open={confirmOpen}
              onClose={() => setConfirmOpen(false)}
              size="tiny"
            >
              <Modal.Header>Confirm Delete</Modal.Header>
              <Modal.Content>
                <Modal.Description>
                  Are you sure you want to delete this sale?
                </Modal.Description>
              </Modal.Content>
              <Modal.Actions>
                <Button color="red" onClick={handleCancelDelete}>
                  <Icon name="remove" /> Cancel
                </Button>
                <Button color="green" onClick={handleConfirmDelete}>
                  <Icon name="checkmark" /> Confirm
                </Button>
              </Modal.Actions>
            </Modal>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Footer />
    </div>
  );
};

export default Saleslist;
