import React, { useState } from "react";
import { createPoll } from "../../services/api";

const CreatePoll = () => {
  const [candidate, setCandidate] = useState("");

  const handleCreate = async () => {
    if (!candidate.trim()) {
      alert("Candidate name is required");
      return;
    }

    try {
      const res = await createPoll({
        question: candidate.trim(), // this is the poll title
        options: [candidate.trim()] // only 1 candidate allowed
      });

      alert("Poll created successfully");
      setCandidate("");
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || "Error creating poll");
    }
  };

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h2>Add Candidate</h2>
      <input
        type="text"
        placeholder="Candidate Name"
        value={candidate}
        onChange={(e) => setCandidate(e.target.value)}
        style={{ padding: "0.5rem", width: "300px", margin: "10px 0" }}
      />
      <br />
      <button onClick={handleCreate} style={{ padding: "0.5rem 1rem" }}>
        CREATE
      </button>
    </div>
  );
};

export default CreatePoll;
