import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Button,
  Box,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function SkinQuizPage() {
  const [open, setOpen] = useState(false);
  const [answers, setAnswers] = useState({});

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setAnswers({});
  };

  const handleChange = (event) => {
    setAnswers({ ...answers, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const mockQuestions = [
    {
      id: 1,
      question: "How does your skin feel in the morning?",
      name: "question1",
      options: [
        { value: "oily", label: "Oily" },
        { value: "dry", label: "Dry" },
        { value: "combination", label: "Combination" },
      ],
    },
    {
      id: 2,
      question: "How often do you experience breakouts?",
      name: "question2",
      options: [
        { value: "frequent", label: "Frequently" },
        { value: "sometimes", label: "Sometimes" },
        { value: "rarely", label: "Rarely" },
      ],
    },
    {
      id: 3,
      question: "How does your skin react to new skincare products?",
      name: "question3",
      options: [
        { value: "sensitive", label: "It gets irritated easily" },
        { value: "neutral", label: "No noticeable reaction" },
        { value: "resilient", label: "It handles new products well" },
      ],
    },
    {
      id: 4,
      question: "How often does your skin feel tight or dry?",
      name: "question4",
      options: [
        { value: "always", label: "Always" },
        { value: "sometimes", label: "Sometimes" },
        { value: "never", label: "Never" },
      ],
    },
  ];

  return (
    <Container
      maxWidth="100vw"
      sx={{
        padding: 5,
        backgroundImage: "url(src/assets/images/SkinQuiz/sq1.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Paper
        elevation={10}
        sx={{
          padding: 5,
          maxWidth: 800,
          textAlign: "center",
          background: "rgba(255, 255, 255, 0.9)",
          borderRadius: 4,
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontFamily: "Lora",
            fontWeight: "bold",
            color: "#333",
            mb: 3,
            display: "block",
          }}
        >
          Skin Quiz
        </Typography>

        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h5"
            fontWeight="bold"
            color="var(--primary-color)"
            gutterBottom
          >
            Which of the Skin Types® Are You?
          </Typography>
          <Typography sx={{ mb: 2, color: "#555" }}>
            Take the <strong>3-minute skin type quiz now</strong> and build a
            skin care routine with professional-grade products. You’ll be amazed
            at how great your skin will look!
          </Typography>
          <Typography sx={{ mb: 2, color: "#555" }}>
            Our free skin care quiz was developed by experts to accurately
            diagnose your skin type and recommend a custom skin care routine
            tailored to your needs.
          </Typography>
          <Typography sx={{ color: "#555" }}>
            Discover your personalized skin care routine today. Identify your
            skin type and find the best products just for you.{" "}
            <strong>
              Take the quiz now and transform the way you care for your skin!
            </strong>
          </Typography>
        </Box>

        <Button
          variant="contained"
          color="primary"
          onClick={handleOpen}
          sx={{
            fontSize: "1.2rem",
            padding: "8px 24px",
            borderRadius: 2,
            textTransform: "none",
            fontWeight: "bold",
            backgroundColor: "black",
            transition: "all 0.4s ease-out",
            ":hover": {
              background: "linear-gradient(45deg, #FF8E53, #FF6B6B)",
            },
          }}
        >
          Find My Skin Type
        </Button>
      </Paper>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle
          sx={{ fontWeight: "bold", textAlign: "center", fontFamily: "Lora" }}
        >
          Start Your Skin Quiz
        </DialogTitle>
        <DialogContent dividers>
          {mockQuestions.map((question) => (
            <FormControl
              key={question.id}
              component="fieldset"
              sx={{ mb: 2, width: "100%" }}
            >
              <FormLabel component="legend">{question.question}</FormLabel>
              <RadioGroup
                name={question.name}
                value={answers[question.name] || ""}
                onChange={handleChange}
              >
                {question.options.map((option) => (
                  <FormControlLabel
                    key={option.value}
                    value={option.value}
                    control={<Radio />}
                    label={option.label}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          ))}
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", my: 2, gap: 4 }}>
          <Button
            size="large"
            variant="outlined"
            color="black"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            size="large"
            variant="contained"
            color="primary"
            onClick={handleClose}
            sx={{ backgroundColor: "var(--primary-color)" }}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default SkinQuizPage;
