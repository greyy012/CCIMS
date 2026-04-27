import React from "react";
import "../styles/s_feedback.css";
import { useNavigate } from "react-router-dom";

function FeedbackPage({setPage}) {

  const navigate = useNavigate();
  

  const handleSubmit = (e) => {
  e.preventDefault();

  const newFeedback = {
    id: Date.now(),
    rating: e.target[0].value,
    message: e.target[1].value
  };

  const oldData = JSON.parse(localStorage.getItem("feedbacks")) || [];

  oldData.push(newFeedback);

  localStorage.setItem("feedbacks", JSON.stringify(oldData));

  alert("Feedback Submitted Successfully!");

  // optional reset
  e.target.reset();
};

  return (
    <div className="feedback-container">

      <div className="feedback-box">

        <h2>Feedback</h2>

        <form onSubmit={handleSubmit}>

          {/* Rating */}
          <label>Rating</label>
          <select required>
            <option value="">Select Rating</option>
            <option> 1</option>
            <option> 2</option>
            <option> 3</option>
            <option> 4</option>
            <option> 5</option>
          </select>

          {/* Message */}
          <label>Your Feedback</label>
          <textarea
            placeholder="Write your feedback..."
            rows="4"
            required
          ></textarea>

          {/* Buttons */}
          <div className="btn-group">

            <button type="submit">Submit</button>

            <button
              type="button"
              className="back-btn"
              onClick={() => setPage("home")}
            >
              Back
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default FeedbackPage;