import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  Grid,
  Button,
  Modal,
  Form,
  TextArea,
  ModalHeader,
  ModalContent,
  ModalDescription,
  Icon,
  Header,
} from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import Navbar from "../../../shared/Navbar";
import BookHeader from "../../../shared/Header";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import Footer from "../../../shared/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import _ from "lodash";

const AuthorsList = () => {
  const [authors, setAuthors] = useState([]);
  const [authorName, setAuthorName] = useState("");
  const [biography, setBiography] = useState("");
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5); // Adjust based on your backend limit
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();
  const [deleteAuthorId, setDeleteAuthorId] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [filteredAuthors, setFilteredAuthors] = useState([]);
  const [direction, setDirection] = useState(null);
  const [allAuthors, setAllAuthors] = useState([]);
  const [authorNameClicked, setAuthorNameClicked] = useState(false);

  useEffect(() => {
    fetchAuthors();
    fetchAllAuthors();
  }, [page]); // Reload authors when currentPage changes

  const fetchAllAuthors = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/authors/all`);
      setAllAuthors(response.data.authors);
    } catch (error) {
      console.error("Error fetching all authors:", error);
    }
  };

  const fetchAuthors = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/authors?page=${page}&limit=${pageSize}`
      );

      const { authors, totalCount } = response.data;

      setAuthors(authors);
      setFilteredAuthors(authors);
      const totalPagesCount = Math.ceil(totalCount / pageSize);
      setTotalPages(totalPagesCount);
    } catch (error) {
      console.error("Error fetching authors:", error);
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
    setAuthorNameClicked(true);

    if (selectedAuthor) {
      try {
        const response = await axios.put(
          `http://localhost:3000/authors/edit/${selectedAuthor.author_id}`,
          {
            name: authorName,
            biography: biography || null,
          }
        );
        fetchAuthors();
        setAuthorName("");
        setBiography("");
        setSelectedAuthor(null);
        setOpen(false);
        toast.success("Author updated successfully");
      } catch (error) {
        console.error("Error updating author:", error);
        toast.error("Error updating author");
      }
    } else {
      try {
        const response = await axios.post("http://localhost:3000/authors/add/", {
          name: authorName,
          biography: biography || null,
        });
        fetchAuthors();
        setAuthorName("");
        setBiography("");
        setOpen(false);
        toast.success("Author added successfully");
      } catch (error) {
        console.error("Error adding author:", error);
        toast.error("Error adding author");
      }
    }
  };

  const handleEditButtonClick = (author) => {
    setSelectedAuthor(author);
    setAuthorName(author.name);
    setBiography(author.biography);
    setOpen(true);
  };

  const handleDeleteButtonClick = async (author) => {
    setDeleteAuthorId(author.author_id);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:3000/authors/delete/${deleteAuthorId}`
      );
      toast.success("Author deleted successfully");
      fetchAuthors();
      setConfirmOpen(false); // Close confirmation modal after deletion
    } catch (error) {
      console.error("Error deleting author:", error);
      toast.error("Error deleting author");
    }
  };

  const handleCancelDelete = () => {
    setConfirmOpen(false);
    setDeleteAuthorId(null); // Reset deleteAuthorId state
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

  const handleSearch = (e) => {
    setSearchText(e.target.value);
    if (e.target.value === "") {
      setFilteredAuthors(authors);
    } else {
      setFilteredAuthors(
        allAuthors.filter((author) =>
          author.name.toLowerCase().includes(e.target.value.toLowerCase())
        )
      );
    }
  };

  const handleResetSearch = () => {
    setSearchText("");
    setFilteredAuthors(authors);
  };

  const handleSort = () => {
    const sortedAuthors = _.orderBy(
      filteredAuthors,
      ["name"],
      [direction === "ascending" ? "asc" : "desc"]
    );
    setFilteredAuthors(sortedAuthors);
    setDirection(direction === "ascending" ? "descending" : "ascending");
  };

  return (
    <div>
      <Grid columns="equal" style={{ margin: 0 }}>
        <Grid.Row style={{ padding: 0 }}>
          <Grid.Column width={2} style={{ padding: 0 }}></Grid.Column>
          <Grid.Column stretched style={{ padding: 0 }}>
            <Navbar />
            <BookHeader />
            <Header as="h2">Author</Header>
            <div class="ui grid">
              <div class="eight wide column left-aligned">
                <div class="add-book-button-container">
                  <button
                    class="ui labeled icon black button"
                    onClick={() => setOpen(true)}
                  >
                    <i class="plus icon"></i>Add Author
                  </button>
                </div>
              </div>
              <div class="eight wide column right-aligned">
                <div class="search-container">
                  <div class="ui ">
                    <div class="ui icon input">
                      <input
                        type="text"
                        placeholder="Search Author"
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
              <ModalHeader>
                {selectedAuthor ? "Edit Author" : "Add New Author"}
              </ModalHeader>
              <ModalContent>
                <ModalDescription>
                  <Form onSubmit={handleSubmit}>
                    <Form.Field>
                      <input
                        placeholder="Enter Author Name"
                        value={authorName}
                        onChange={(e) => setAuthorName(e.target.value)}
                        error={
                          authorName.trim() === "" && authorNameClicked
                            ? { content: "Please enter Author name", pointing: "below" }
                            : null
                        }
                      />
                      {authorName.trim() === "" && authorNameClicked && (
                        <div className="ui pointing red basic label">
                          Please enter Author name
                        </div>
                      )}
                    </Form.Field>
                    <Form.Field>
                      <TextArea
                        placeholder="Enter Biography"
                        value={biography}
                        onChange={(e) => setBiography(e.target.value)}
                      />
                    </Form.Field>
                    <Button color="green" type="submit">
                      {selectedAuthor ? "Update Author" : "Add Author"}
                    </Button>
                  </Form>
                </ModalDescription>
              </ModalContent>
            </Modal>
            <Table className="ui very basic collapsing selectable celled table sortable">
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Sl. No</Table.HeaderCell>
                  <Table.HeaderCell sorted={direction} onClick={handleSort}>
                    Author
                  </Table.HeaderCell>
                  <Table.HeaderCell>Biography</Table.HeaderCell>
                  <Table.HeaderCell>Edit</Table.HeaderCell>
                  <Table.HeaderCell>Delete</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {filteredAuthors.map((author, index) => (
                  <Table.Row key={author.author_id}>
                    <Table.Cell>{(page - 1) * pageSize + index + 1}</Table.Cell>{" "}
                    <Table.Cell>{author.name}</Table.Cell>
                    <Table.Cell>{author.biography}</Table.Cell>
                    <Table.Cell>
                      <Button
                        className="btn btn-primary btn-sm"
                        color="green"
                        size="mini"
                        onClick={() => handleEditButtonClick(author)}
                      >
                        <Icon name="edit"></Icon> Edit
                      </Button>
                    </Table.Cell>
                    <Table.Cell>
                      <Button
                        className="btn btn-primary btn-sm"
                        color="red"
                        size="mini"
                        onClick={() => handleDeleteButtonClick(author)}
                      >
                        <Icon name="delete"></Icon> Delete
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
              <Table.Footer>
                <Table.Row>
                  <Table.HeaderCell colSpan="4" textAlign="center">
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
                      disabled={authors.length < pageSize}
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
                    Are you sure you want to delete this author?
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
    </div>
  );
};

export default AuthorsList;
