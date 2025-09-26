import {
  Button,
  Card,
  CardContent,
  Container,
  Typography,
  Box,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Assignment_19() {
  const [questions, setQuestions] = useState([]); //stores API data
  const [currentIndex, setCurrentIndex] = useState(0); //tracks the current question
  const [score, setScore] = useState(0); //tracks the user’s score
  const [isFinished, setIsFinished] = useState(false); //determines when the quiz ends

  useEffect(() => {
    axios
      .get("https://apis.dnjs.lk/objects/quiz.php")
      .then((res) => setQuestions(res.data))
      .catch((err) => console.error("Error fetching quiz:", err));
  }, []);

  // handle anwer selection
  const handleAnswerClick = (answerIndex) => {
    const currentQuestion = questions[currentIndex];

    //chack if the answer is correct
    if (answerIndex === currentQuestion.correct) {
      setScore((prev) => prev + 1);
    }

    // move to next question
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  if (questions.length === 0) {
    return (
      <Container>
        <Typography variant="h6">Loading quiz...</Typography>
      </Container>
    );
  }

  if (isFinished) {
    return (
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Card>
          <CardContent>

            <Typography variant="h5">
              Quiz Finished
              </Typography>

            <Typography variant="h6">
              Your Score: {score} out of {questions.length}
            </Typography>

          </CardContent>
        </Card>
      </Container>
    );
  }

  const currentQuestion = questions[currentIndex];
  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Card>
        <CardContent>

          <Typography variant="h6">
            Question {currentIndex + 1} of {questions.length}
          </Typography>

          <Typography variant="h5">
            {currentQuestion.question}
            </Typography>

          <Box mt={2}>
            {currentQuestion.answers.map((answer, index) => (
              <Button
                key={index}
                variant="contained"
                fullWidth
                sx={{ mb: 1 }}
                onClick={() => handleAnswerClick(index)}
              >
                {answer}
              </Button>
            ))}
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}
