import { BrowserRouter, Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/home/Home"
import NewFeedback from "./pages/feedback/NewFeedback"

const App = () => {
  return <>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new-feedback" element={<NewFeedback />} />
      </Routes>
    </BrowserRouter>
  </>
}

export default App
