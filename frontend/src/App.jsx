import { BrowserRouter, Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/home/Home"
import NewFeedback from "./pages/feedback/feedback/NewFeedback"
import NewQuestions from "./pages/feedback/question/NewQuestions"

const App = () => {
  return <>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new-feedbacks" element={<NewFeedback />} />
        <Route path="/:id/new-questions" element={<NewQuestions />} />
      </Routes>
    </BrowserRouter>
  </>
}

export default App
