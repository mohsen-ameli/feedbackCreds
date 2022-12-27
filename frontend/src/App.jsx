import { BrowserRouter, Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import NotFound from "./components/NotFound"
import Home from "./pages/home/Home"
import NewFeedback from "./pages/newFeedback/NewFeedback"
import NewQuestions from "./pages/newQuestion/NewQuestions"
import QuestionQRCode from "./pages/newQRCode/QuestionQRCode"
import Feedback from "./pages/feedback/Feedback"
import Container from "./components/ui/Container"

const App = () => {
  return <>
    <BrowserRouter>
      <Navbar />
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new-feedbacks" element={<NewFeedback />} />
          <Route path="/:id/new-questions" element={<NewQuestions />} />
          <Route path="/:id/qr-code" element={<QuestionQRCode />} />
          <Route path="/feedback-response/:uuid" element={<Feedback />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
    </BrowserRouter>
  </>
}

export default App
