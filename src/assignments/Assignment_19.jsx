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
}
