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

export default function Assignment_20() {
  const [questions, setQuestions] = useState([]); // stores API data
  const [currentIndex, setCurrentIndex] = useState(0); // tracks the current question
  const [score, setScore] = useState(0); // tracks the user’s score
  const [isFinished, setIsFinished] = useState(false); // determines when the quiz ends
  const [userAnswers, setUserAnswers] = useState([]); // stores selected answers
  const [reviewIndex, setReviewIndex] = useState(0); // tracks current review question

  useEffect(() => {
    axios
      .get("https://apis.dnjs.lk/objects/quiz.php")
      .then((res) => setQuestions(res.data))
      .catch((err) => console.error("Error fetching quiz:", err));
  }, []);

  // handle answer selection
  const handleAnswerClick = (answerIndex) => {
    const currentQuestion = questions[currentIndex];

    // record user answer
    setUserAnswers((prev) => [...prev, answerIndex]);

    // check if the answer is correct
    if (answerIndex === currentQuestion.correct) {
      setScore((prev) => prev + 1);
    }

    // move to next question or finish
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsFinished(true);
      setReviewIndex(0); // reset for review
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
    const reviewQuestion = questions[reviewIndex];
    const userAnswer = userAnswers[reviewIndex];

    return (
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Card>
          <CardContent>
            <Typography variant="h5">Quiz Finished</Typography>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Your Score: {score} out of {questions.length}
            </Typography>

            {/* Review Section */}
            <Typography variant="h6">
              Review Question {reviewIndex + 1} of {questions.length}
            </Typography>

            <Box mt={2}>
              {reviewQuestion.answers.map((answer, index) => {
                let color = "black"; // default

                if (index === reviewQuestion.correct) {
                  color = "green"; // correct answer
                }

                if (index === userAnswer && userAnswer !== reviewQuestion.correct) {
                  color = "red"; // wrong selected answer
                }

                return (
                  <Typography
                    key={index}
                    sx={{ color: color, fontWeight: "bold", mb: 1 }}
                  >
                    {answer}
                  </Typography>
                );
              })}
            </Box>

            <Typography variant="h6" sx={{ mt: 2 }}>
              {reviewQuestion.question}
            </Typography>

            <Box mt={2} display="flex" justifyContent="space-between">
              <Button
                variant="outlined"
                disabled={reviewIndex === 0}
                onClick={() => setReviewIndex((prev) => prev - 1)}
              >
                Last
              </Button>
              <Button
                variant="outlined"
                disabled={reviewIndex === questions.length - 1}
                onClick={() => setReviewIndex((prev) => prev + 1)}
              >
                Next
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Container>
    );
  }

  // Quiz in progress
  const currentQuestion = questions[currentIndex];
  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Card>
        <CardContent>
          <Typography variant="h6">
            Question {currentIndex + 1} of {questions.length}
          </Typography>

          <Typography variant="h5" sx={{ mt: 2 }}>
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
