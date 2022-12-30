import { Button } from "../../components/ui/Button"
import QuestionCard from "./QuestionCard"
import * as defaults from "../../data/Constants"
import { createContext, useEffect, useState } from "react"
import useFetch from "../../components/hooks/useFetch"
import { useNavigate, useParams } from "react-router-dom"
import Container from "../../components/ui/Container"
import PageTitle from "../../components/ui/PageTitle"
import useAxios from "../../components/hooks/useAxios"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"

export const StageContext = createContext()

// TODO: Export the context to a different file

const NewQuestions = () => {
  const axiosInstance = useAxios()
  // Feedback ID
  const { id } = useParams()
  const navigate = useNavigate()
  // State to see if the user can add more questions
  const [canAdd, setCanAdd] = useState(true)
  const [numQuestions, setNumQuestions] = useState()
  const [questions, setQuestions] = useState([])
  // Getting all the questions (GET)
  const { data, loading, error, fetchData } = useFetch(`/${id}/questions/`)
  const { data: feedback } = useFetch(`/feedbacks/${id}/`)

  useEffect(() => {
    setQuestions(data)
    console.log("first")
  }, [data])

  // Add new question (POST)
  const add = async () => {
    // Adding a new empty question
    const context = {
      feedback: id,
    }
    await axiosInstance.post(`/${id}/questions/`, context)
    // Refreshing the data
    fetchData()
    // Adding one to the number of questions
    setNumQuestions((current) => current + 1)
  }

  // Delete a question (DELETE)
  const delete_ = async (index) => {
    // Deleting the question
    await axiosInstance.delete(`/${id}/questions/${index}/`)
    // Refreshing the data
    fetchData()
    // Subtracting one from the number of questions
    setNumQuestions((current) => current - 1)
  }

  // Updating a question (PUT)
  const update = async (index, context) => {
    await axiosInstance.put(`/${id}/questions/${index}/`, {
      ...context,
      feedback: id,
    })
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

  // Drag and drop
  const onDragEnd = (result) => {
    if (!result.destination) return
    const items = Array.from(questions)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)
    setQuestions(items)
  }

  // Loading and error handling
  if (loading) {
    return <p>Loading...</p>
  } else if (error) {
    return <p>{error}</p>
  }

  return (
    <Container>
      <PageTitle text={`${feedback.name} Questions`} />
      <div className="flex flex-col items-center">
        <h1 className="mt-4 text-md font-bold">
          You can make {defaults.MINIMUM_QUESTIONS}-{defaults.MAXIMUM_QUESTIONS}{" "}
          questions.
        </h1>
        <small className="my-4">
          Notice: You cannot make more than 1 written response. This is so that
          customers don't get bored writing essays. or even worse be too lazy to
          even write anything. So try avoidcing written responses as much as
          possible
        </small>

        {/* Questions */}
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="Questions">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="w-full select-none"
                style={{ minHeight: `${numQuestions * 140}px` }}
              >
                {questions.map((question, index) => (
                  <Draggable
                    key={question.id}
                    draggableId={question.id.toString()}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="w-full h-full"
                      >
                        {/* <div className="w-full h-[50px] bg-blue-400 my-2">
                          hey
                        </div> */}
                        <StageContext.Provider
                          value={{ add, delete_, update, question, index }}
                        >
                          <QuestionCard />
                        </StageContext.Provider>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        <div className="flex flex-col items-center">
          <div className="flex gap-x-4">
            {/* Back button */}
            <Button text="Back" onClick={() => navigate("/new-feedbacks")} />

            {/* Adding more questions */}
            <Button disabled={!canAdd} text="Add new question" onClick={add} />
          </div>

          {/* Error message */}
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
