import { Button } from "../../components/ui/Button"
import QuestionCard from "./QuestionCard"
import * as defaults from "../../data/Constants"
import { createContext, useEffect, useState } from "react"
import useFetch from "../../components/hooks/useFetch"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"
import Container from "../../components/ui/Container"

export const StageContext = createContext()

const NewQuestions = () => {
  // Feedback ID
  const { id } = useParams()
  // Navigation
  const navigate = useNavigate()
  // State to see if the user can add more questions
  const [canAdd, setCanAdd] = useState(true)
  // Getting all the questions (GET)
  const { data, loading, error, fetchData } = useFetch(`/${id}/questions/`)
  // Number of questions
  const [numQuestions, setNumQuestions] = useState()

  // Add new question (POST)
  const add = async () => {
    // Adding a new empty question
    const context = {
      feedback: id,
    }
    await axios.post(`/${id}/questions/`, context)
    // Refreshing the data
    fetchData()
    // Adding one to the number of questions
    setNumQuestions((current) => current + 1)
  }

  // Delete a question (DELETE)
  const delete_ = async (index) => {
    // Deleting the question
    await axios.delete(`/${id}/questions/${index}/`)
    // Refreshing the data
    fetchData()
    // Subtracting one from the number of questions
    setNumQuestions((current) => current - 1)
  }

  // Updating a question (PUT)
  const update = async (index, context) => {
    await axios.put(`/${id}/questions/${index}/`, { ...context, feedback: id })
    // Refreshing the data
    fetchData()
  }

  // Checking if the user can add more questions
  useEffect(() => {
    setNumQuestions(data.length)
    numQuestions >= defaults.MAXIMUM_QUESTIONS
      ? setCanAdd(false)
      : setCanAdd(true)
  }, [data.length, numQuestions])

  // Loading and error handling
  if (loading) {
    return <p>Loading...</p>
  } else if (error) {
    return <p>{error}</p>
  }

  return (
    <Container>
      <div className="flex flex-col items-center">
        <h1>
          We offer 3 different types of feedbacks, that make the process of
          giving feedbacks for your customers, easy and fast.
        </h1>
        <h1>
          You can make {defaults.MINIMUM_QUESTIONS}-{defaults.MAXIMUM_QUESTIONS}{" "}
          questions.
        </h1>
        <small>
          Notice: You cannot make more than 1 written response. This is so that
          customers don't get bored writing essays. or even worse be too lazy to
          even write anything. So try avoidcing written responses as much as
          possible
        </small>

        {/* Questions */}
        {data.map((question, index) => (
          <StageContext.Provider
            value={{ add, delete_, update, question, index }}
            key={index}
          >
            <QuestionCard />
          </StageContext.Provider>
        ))}

        <div className="flex items-center gap-x-4">
          {/* Back button */}
          <Button text="Back" onClick={() => navigate("/new-feedbacks")} />
          {/* Adding more questions */}
          <Button disabled={!canAdd} text="Add new question" onClick={add} />
          {!canAdd && (
            <p className="mt-2 text-red-500">
              You can't add more than {defaults.MAXIMUM_QUESTIONS} questions.
            </p>
          )}
        </div>
      </div>
    </Container>
  )
}

export default NewQuestions
