import { BrowserRouter, Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import NotFound from "./components/NotFound"
import Home from "./pages/home/Home"
import NewFeedback from "./pages/newFeedback/NewFeedback"
import NewQuestions from "./pages/newQuestion/NewQuestions"
import QuestionQRCode from "./pages/newQRCode/QuestionQRCode"
import Feedback from "./pages/feedback/Feedback"
import Login from "./pages/authentication/login/Login"
import AuthContextProvider from "./context/AuthContext"
import PrivateRoute from "./utils/PrivateRoute"
import Signup from "./pages/authentication/signup/Signup"

const App = () => {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Navbar />
        <Routes>
          {/* Home */}
          <Route path="/" element={<Home />} />

          {/* New feedback */}
          <Route
            path="/new-feedbacks"
            element={
              <PrivateRoute>
                <NewFeedback />
              </PrivateRoute>
            }
          />

          {/* New questions */}
          <Route
            path="/:id/new-questions"
            element={
              <PrivateRoute>
                <NewQuestions />
              </PrivateRoute>
            }
          />

          {/* New QR-Codes */}
          <Route
            path="/:id/qr-code"
            element={
              <PrivateRoute>
                <QuestionQRCode />
              </PrivateRoute>
            }
          />

          {/* Feedabcks response */}
          <Route
            path="/feedback-response/:uuid"
            element={
              <PrivateRoute>
                <Feedback />
              </PrivateRoute>
            }
          />

          {/* Login */}
          <Route path="/login" element={<Login />} />

          {/* Signup */}
          <Route path="/signup" element={<Signup />} />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  )
}

export default App
