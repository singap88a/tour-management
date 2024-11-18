import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Alert,
} from "reactstrap";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { auth } from "../../firebase";
import "./TourDetails.css";
import user_img from "../../assets/images/user.png";
import { RiEditLine, RiDeleteBin6Line } from "react-icons/ri";
import BookingForm from "../Booking/Booking";

export default function TourDetails() {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    setShowLoginAlert(false);
    navigate("/login");
  };
  const handleBooking = () => {
    if (!currentUser) {
      setShowLoginAlert(true);
      return;
    }

    navigate("/booking-confirmation");
  };
  const location = useLocation();
  const { img, country, landmark, price, people, description, rating } =
    location.state;

  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [comment, setComment] = useState("");
  const [commentsList, setCommentsList] = useState([]);
  const [editingComment, setEditingComment] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);
  const [starRating, setStarRating] = useState(0);
  const [showLoginAlert, setShowLoginAlert] = useState(false);

  const currentUser = auth.currentUser;
  const userName =
    currentUser?.displayName || currentUser?.email || "User with no name";
  const userEmail = currentUser?.email
    ? currentUser.email
    : "No Email provided";

  const userPhoto = currentUser?.photoURL || user_img;

  const handlePhoneChange = (value) => setPhone(value);
  const handleDateChange = (e) => setDate(e.target.value);
  const handleCommentChange = (e) => setComment(e.target.value);

  const handleStarChange = (rating) => setStarRating(rating);

  const handleCommentSubmit = (e) => {
    e.preventDefault();

    if (!currentUser) {
      setShowLoginAlert(true);
      return;
    }

    if (comment.trim()) {
      const newComment = {
        id: new Date().getTime(),
        userName,
        userEmail,
        userPhoto,
        comment,
        rating: starRating,
        date: new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        }),
      };

      const updatedComments = [...commentsList, newComment];
      setCommentsList(updatedComments);

      localStorage.setItem(
        `commentsList-${landmark}`,
        JSON.stringify(updatedComments)
      );

      setComment("");
      setStarRating(0);
      setEditingComment(null);
    }
  };

  const handleEditComment = (commentId) => {
    const commentToEdit = commentsList.find(
      (comment) => comment.id === commentId
    );
    if (commentToEdit.userEmail === userEmail) {
      setEditingComment(commentToEdit);
      setComment(commentToEdit.comment);
      setStarRating(commentToEdit.rating);
    }
  };

  const handleUpdateComment = () => {
    if (comment.trim()) {
      const updatedComments = commentsList.map((commentData) => {
        if (commentData.id === editingComment.id) {
          return { ...commentData, comment, rating: starRating };
        }
        return commentData;
      });
      setCommentsList(updatedComments);

      localStorage.setItem(
        `commentsList-${landmark}`,
        JSON.stringify(updatedComments)
      );

      setComment("");
      setStarRating(0);
      setEditingComment(null);
    }
  };

  const handleDeleteComment = (commentId) => {
    const commentToDelete = commentsList.find(
      (comment) => comment.id === commentId
    );
    if (commentToDelete.userEmail === userEmail) {
      setCommentToDelete(commentId);
      setDeleteModal(true);
    }
  };

  const confirmDelete = () => {
    const updatedComments = commentsList.filter(
      (comment) => comment.id !== commentToDelete
    );
    setCommentsList(updatedComments);

    localStorage.setItem(
      `commentsList-${landmark}`,
      JSON.stringify(updatedComments)
    );

    setDeleteModal(false);
  };

  const cancelDelete = () => {
    setDeleteModal(false);
    setCommentToDelete(null);
  };

  useEffect(() => {
    const storedComments = localStorage.getItem(`commentsList-${landmark}`);
    if (storedComments) {
      setCommentsList(JSON.parse(storedComments));
    }
  }, [landmark]);

  const totalRatings = commentsList.reduce(
    (total, comment) => total + comment.rating,
    0
  );
  const averageRating = totalRatings / commentsList.length || 0;

  return (
    <div className="tour-details">
      <Container>
        {showLoginAlert && (
          <Modal
            isOpen={showLoginAlert}
            toggle={() => setShowLoginAlert(false)}
          >
            <ModalHeader toggle={() => setShowLoginAlert(false)}>
              Login Required
            </ModalHeader>
            <ModalBody>You need to log in to leave a comment.</ModalBody>
            <ModalFooter>
              <Button
                color="secondary"
                onClick={() => setShowLoginAlert(false)}
              >
                Close
              </Button>
              <Button
                className="go_to_login"
                color="primary"
                onClick={handleLoginRedirect}
              >
                Go to Login
              </Button>
            </ModalFooter>
          </Modal>
        )}

        <Row>
          <Col lg="9">
            <img src={img} alt={country} className="tour-details-image" />
          </Col>

          <Col className="tour-details-r" lg="3">
            <BookingForm price={price} averageRating={averageRating} />
          </Col>

          <Col className="tour-details-b p-3" lg="8">
            <h1>
              {country} - {landmark}
            </h1>

            <div className="rating-stars d-flex align-items-center gap-5">
              <span style={{ color: "orange" }}>
                {"★".repeat(Math.floor(averageRating))}{" "}
                {"☆".repeat(5 - Math.floor(averageRating))}
                <small style={{ color: "#666" }}>
                  {averageRating.toFixed(1)}
                </small>
              </span>

              <p>
                <i className="ri-account-pin-circle-fill"></i> Somewhere in{" "}
                {country}
              </p>
            </div>
            <div className="d-flex align-items-center gap-5">
              <p>
                <i className="ri-price-tag-2-line"></i> {price} / per person
              </p>
              <p>
                <i className="ri-team-line"></i> {people} people
              </p>
            </div>

            <h5>Description</h5>
            <p>{description}</p>
          </Col>
          <Col className="coment" lg="8">
            <h4>Reviews ({commentsList.length})</h4>

            <div className="star-rating">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`star ${star <= starRating ? "filled" : ""}`}
                  onClick={() => handleStarChange(star)}
                  style={{
                    cursor: "pointer",
                    fontSize: "20px",
                    color: star <= starRating ? "gold" : "gray",
                  }}
                >
                  ☆
                </span>
              ))}
            </div>

            <Form onSubmit={handleCommentSubmit}>
              <FormGroup>
                <textarea
                  value={comment}
                  onChange={handleCommentChange}
                  rows="3"
                  className="form-control"
                  placeholder="Write a comment"
                />
              </FormGroup>
              <Button type="submit" color="primary">
                {editingComment ? "Update Comment" : "Submit Comment"}
              </Button>
            </Form>

            <div className="reviews-list">
              {commentsList.length > 0 ? (
                commentsList.map((commentData, index) => (
                  <div key={index} className="review-item">
                    <div className="review-header d-flex align-items-center">
                      <img
                        src={user_img}
                        alt={commentData.userName}
                        className="review-user-photo"
                      />
                      <div className="text">
                        <h6 className="review-user-name">
                          {commentData.userName}
                        </h6>
                        <p className="review-date">{commentData.date}</p>
                        <p
                          style={{ color: "orange" }}
                          className="review-rating"
                        >
                          {"★".repeat(commentData.rating)}
                          {"☆".repeat(5 - commentData.rating)}
                        </p>
                        <h5 className="review-comment">
                          {commentData.comment}
                        </h5>
                      </div>
                    </div>

                    {commentData.userEmail === userEmail && (
                      <div className="review-actions">
                        <i
                          className="edit"
                          color="link"
                          onClick={() => handleEditComment(commentData.id)}
                        >
                          <RiEditLine />
                        </i>
                        <i
                          color="link"
                          onClick={() => handleDeleteComment(commentData.id)}
                        >
                          <RiDeleteBin6Line />
                        </i>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <p>No reviews yet. Be the first to leave one!</p>
              )}
            </div>
          </Col>
        </Row>
      </Container>

      <Modal isOpen={deleteModal} toggle={cancelDelete}>
        <ModalHeader toggle={cancelDelete}>Confirm Delete</ModalHeader>
        <ModalBody>Are you sure you want to delete this comment?</ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={cancelDelete}>
            Cancel
          </Button>
          <Button color="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
