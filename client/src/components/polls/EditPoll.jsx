import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  IconButton,
  Paper
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { getPollById, editPoll } from "../../services/api";
import DeleteIcon from "@mui/icons-material/Delete";

const EditPoll = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPoll = async () => {
      try {
        const poll = await getPollById(id);
        setQuestion(poll.question);
        setOptions(poll.options.map((opt) => opt.text));
      } catch (err) {
        alert("Failed to load poll");
      }
    };
    fetchPoll();
  }, [id]);

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const addOption = () => setOptions([...options, ""]);
  const removeOption = (index) =>
    setOptions(options.filter((_, i) => i !== index));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await editPoll(id, { question, options });
      navigate("/dashboard");
    } catch (err) {
      alert("Failed to update poll");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          Edit Poll
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Question"
            fullWidth
            margin="normal"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />

          {options.map((opt, idx) => (
            <Box key={idx} display="flex" alignItems="center" mt={2}>
              <TextField
                label={`Option ${idx + 1}`}
                value={opt}
                onChange={(e) => handleOptionChange(idx, e.target.value)}
                fullWidth
              />
              {options.length > 2 && (
                <IconButton onClick={() => removeOption(idx)}>
                  <DeleteIcon />
                </IconButton>
              )}
            </Box>
          ))}

          <Button onClick={addOption} sx={{ mt: 2 }}>
            Add Option
          </Button>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3 }}
          >
            Save Changes
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default EditPoll;
