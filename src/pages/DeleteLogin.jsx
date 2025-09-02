import React, { useState } from "react";

export function DeleteLogin() {
  const [email, setEmail] = useState("");
  const [details, setDetails] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // פשוט שולח ל-mailto
    window.location.href = `mailto:avihayr123@walla.com?subject=Data Deletion Request&body=Email: ${email}%0D%0ADetails: ${details}`;
  };

  return (
    <div style={styles.container}>
      <h1>Delete Personal Data</h1>
      <p>
        If you want your personal data to be retrieved or deleted from the Rarebnb app,
        please submit a request using the form below or by emailing us directly.
      </p>

      <h2>Submit a Data Deletion Request</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label>Email Address:</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />

        <label>Additional Details (optional):</label>
        <textarea
          rows={4}
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          style={styles.textarea}
        />

        <button type="submit" style={styles.button}>
          Submit Deletion Request
        </button>
      </form>

      <p>After receiving your request, we will delete all your personal data within 30 days.</p>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "600px",
    margin: "50px auto",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    lineHeight: 1.5,
    textAlign: "left",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginTop: "20px",
    marginBottom: "20px",
  },
  input: {
    padding: "10px",
    fontSize: "1rem",
  },
  textarea: {
    padding: "10px",
    fontSize: "1rem",
  },
  button: {
    padding: "10px",
    fontSize: "1rem",
    backgroundColor: "#ff5a5f",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },
};