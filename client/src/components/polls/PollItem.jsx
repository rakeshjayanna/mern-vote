import { Card, CardContent, Typography, Button } from "@mui/material";
import { voteOnPoll, getMe } from "../../services/api";
import { useState, useEffect } from "react";

export default function PollItem({ poll }) {
  const [voted, setVoted] = useState(false);

  useEffect(() => {
    const checkIfUserVoted = async () => {
      try {
        const user = await getMe();
        const hasVoted = poll.votedUsers.includes(user._id);
        setVoted(hasVoted);
      } catch (err) {
        console.error("Error checking vote status", err);
      }
    };

    checkIfUserVoted();
  }, [poll]);

  const handleVote = async () => {
    try {
      await voteOnPoll(poll._id, { optionIndex: 0 });
      setVoted(true);
    } catch (err) {
      alert(err.response?.data?.message || "Vote failed");
    }
  };

  return (
    <Card sx={{ m: 2, textAlign: "center" }}>
      <CardContent>
        <Typography variant="h6">{poll.options[0].text}</Typography>
        <Button
          variant="contained"
          color={voted ? "success" : "primary"}
          disabled={voted}
          onClick={handleVote}
          sx={{ mt: 2 }}
        >
          {voted ? "Voted" : "Vote"}
        </Button>
      </CardContent>
    </Card>
  );
}
