import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  Grid,
  Button,
  Form,
  Input,
  Icon,
  Pagination,
  Dropdown,
  Header,Modal, ModalHeader,
  ModalContent,
  ModalDescription,
} from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import Navbar from "../../../shared/Navbar";
// import BookHeader from "../../../shared/Header";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import Footer from "../../../shared/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PurchaseHeader from "../purchase-header";

const Purchaselist = () => {
  const [purchases, setPurchases] = useState([]);
  const [purchaseDate, setPurchaseDate] = useState("");
  const [quantityInStock, setQuantityInStock] = useState("");
  const [comments, setComments] = useState("");
  const [selectedPurchase, setSelectedPurchase] = useState(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(2);
  const [totalPages, setTotalPages] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [filteredPurchases, setFilteredPurchases] = useState([]);
  const [allBooks, setAllBooks] = useState([]);
  const [selectedBookId, setSelectedBookId] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deletePurchaseId, setDeletePurchaseId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPurchases();
    fetchAllBooks();
  }, [page]);

  const fetchPurchases = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/purchase/?page=${page}&limit=${pageSize}`
      );
      const { purchases, totalCount } = response.data;
      setPurchases(purchases);
      setFilteredPurchases(purchases);
      setTotalPages(Math.ceil(totalCount / pageSize));
    } catch (error) {
      console.error("Error fetching purchases:", error);
    }
  };

  const fetchAllBooks = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/books/all`);
      setAllBooks(response.data.books);
    } catch (error) {
      console.error("Error fetching all books:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validation checks
  if (!selectedBookId || !quantityInStock || !purchaseDate) {
    toast.error("Please fill all required fields before submitting.");
    return;
  }
    const payload = {
      bookid: selectedBookId,
      quantityinstock: quantityInStock,
      purchasedate: purchaseDate,
      comments: comments,
    };
    if (selectedPurchase) {
      try {
        const response = await axios.put(
          `http://localhost:3000/purchase/edit/${selectedPurchase.purchaseid}`,
          payload
        );
        await fetchPurchases();
        resetForm();
        toast.success("Purchase updated successfully");
      } catch (error) {
        console.error("Error updating purchase:", error);
        toast.error("Error updating purchase");
      }
    } else {
      try {
        const response = await axios.post(
          "http://localhost:3000/purchase/add/",
          payload
        );
        await fetchPurchases();
        resetForm();
        toast.success("Purchase added successfully");
      } catch (error) {
        console.error("Error adding purchase:", error);
        toast.error("Error adding purchase");
      }
    }
  };

  const resetForm = () => {
    setSelectedPurchase(null);
    setSelectedBookId(null);
    setQuantityInStock("");
    setPurchaseDate("");
    setComments("");
  };

  const handleEditButtonClick = (purchase) => {
    setSelectedPurchase(purchase);
    setSelectedBookId(purchase.bookid);
    setQuantityInStock(purchase.quantityinstock);
    setPurchaseDate(
      new Date(purchase.purchasedate).toISOString().split("T")[0]
    );
    setComments(purchase.comments);
  };

  const handleDeleteButtonClick = (purchase) => {
    setDeletePurchaseId(purchase.purchaseid);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:3000/purchase/delete/${deletePurchaseId}`
      );
      fetchPurchases();
      setConfirmOpen(false);
      toast.success("Purchase deleted successfully");
    } catch (error) {
      console.error("Error deleting purchase:", error);
      toast.error("Error deleting purchase");
    }
  };

  const handleCancelDelete = () => {
    setConfirmOpen(false);
    setDeletePurchaseId(null);
  };

  const handlePageClick = (pageNumber) => {
    setPage(pageNumber);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let pageNumber = 1; pageNumber <= totalPages; pageNumber++) {
      pageNumbers.push(
        <Button
          key={pageNumber}
          onClick={() => handlePageClick(pageNumber)}
          disabled={pageNumber === page}
          primary={pageNumber === page}
        >
          {pageNumber}
        </Button>
      );
    }
    return pageNumbers;
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
    if (e.target.value === "") {
      setFilteredPurchases(purchases);
    } else {
      setFilteredPurchases(
        purchases.filter(
          (purchase) =>
            purchase.bookid.toString().includes(e.target.value) ||
            purchase.purchasedate.includes(e.target.value)
        )
      );
    }
  };

  const handleResetSearch = () => {
    setSearchText("");
    setFilteredPurchases(purchases);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date);
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
        <Grid.Row>
          <Grid.Column width={2} style={{ padding: 0 }}></Grid.Column>
          <Grid.Column stretched style={{ padding: 0 }}>
            <Navbar />
            <PurchaseHeader />
            <Header as='h2'> {selectedPurchase ? "Purchase" : "Purchase"}</Header>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                <Form.Field width={4} className="margin-top">
                <label>Book</label>
                  <Dropdown
                    placeholder="Select Book"
                    fluid
                    selection
                    options={allBooks.map((book) => ({
                      key: book.book_id,
                      text: book.title,
                      value: book.book_id,
                    }))}
                    value={selectedBookId}
                    onChange={(e, { value }) => setSelectedBookId(value)}
                  />
                </Form.Field>
                <Form.Field width={4} className="margin-top">
                <label>Quantity in Stock</label>
                  <Input
                    placeholder="Enter Quantity in Stock"
                    value={quantityInStock}
                    onChange={(e) => setQuantityInStock(e.target.value)}
                  />
                </Form.Field>
                <Form.Field width={4} className="margin-top">
                <label>Purchase Date</label>
                  <Input
                    type="date"
                    placeholder="Enter Purchase Date"
                    value={purchaseDate}
                    onChange={(e) => setPurchaseDate(e.target.value)}
                  />
                </Form.Field>
              </Form.Group>
                <Form.Field width={12}   >
                <label>Comments</label>
                <textarea className="custom-textarea"
                  placeholder="Enter Comments"
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                />
              </Form.Field>
              <Button color="black" type="submit">
                {selectedPurchase ? "Update" : "Add"}
              </Button>
              <Button color="black" type="button" onClick={resetForm} >
              Clear 
              </Button>
            </Form>
            <Table className="ui very basic collapsing selectable celled table sortable">
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Sl. No</Table.HeaderCell>
                  <Table.HeaderCell>Book </Table.HeaderCell>
                  <Table.HeaderCell>Quantity in Stock</Table.HeaderCell>
                  <Table.HeaderCell>Purchase Date</Table.HeaderCell>
                  <Table.HeaderCell>Comments</Table.HeaderCell>
                  <Table.HeaderCell>Edit</Table.HeaderCell>
                  <Table.HeaderCell>Delete</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {filteredPurchases.map((purchase, index) => (
                  <Table.Row key={purchase.purchaseid}>
                    <Table.Cell>{(page - 1) * pageSize + index + 1}</Table.Cell>
                    <Table.Cell>{purchase.Book ? purchase.Book.title : 'N/A'}</Table.Cell>
                    <Table.Cell>{purchase.quantityinstock}</Table.Cell>
                    <Table.Cell>{formatDate(purchase.purchasedate)}</Table.Cell>
                    <Table.Cell>{purchase.comments}</Table.Cell>
                    <Table.Cell>
                      <Button
                        className="btn btn-primary btn-sm"
                        color="green"
                        size="mini"
                        onClick={() => handleEditButtonClick(purchase)}
                      >
                        <Icon name="edit"></Icon> Edit
                      </Button>
                    </Table.Cell>
                    <Table.Cell>
                      <Button
                        className="btn btn-danger btn-sm"
                        color="red"
                        size="mini"
                        onClick={() => handleDeleteButtonClick(purchase)}
                      >
                        <Icon name="trash"></Icon> Delete
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
                      disabled={purchases.length < pageSize}
                      onClick={handleNextPage}
                    >
                      Next
                      <Icon name="right arrow" />
                    </Button>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Footer>
              <Modal
                open={confirmOpen}
                onClose={() => setConfirmOpen(false)}
                size="tiny"
              >
                <ModalHeader>Confirm Delete</ModalHeader>
                <ModalContent>
                  <ModalDescription>
                    Are you sure you want to delete this genres?
                  </ModalDescription>
                </ModalContent>
                <Modal.Actions>
                  <Button color="red" onClick={handleCancelDelete}>
                    <Icon name="remove" /> Cancel
                  </Button>
                  <Button color="green" onClick={handleConfirmDelete}>
                    <Icon name="checkmark" /> Confirm
                  </Button>
                </Modal.Actions>
              </Modal>
            </Table>
            
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default Purchaselist;
