import { Button } from "../../components/ui/Button"
import QuestionCard from "./QuestionCard"
import * as defaults from "../../data/Constants"
import { createContext, useEffect, useState } from "react"
import useFetch from "../../components/hooks/useFetch"
import { useNavigate, useParams } from "react-router-dom"
import Container from "../../components/ui/Container"
import PageTitle from "../../components/ui/PageTitle"
import useAxios from "../../components/hooks/useAxios"
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core"
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"

export const StageContext = createContext()

// TODO: Export the context to a different file

const NewQuestions = () => {
  const axiosInstance = useAxios()
  // Feedback ID
  const { id } = useParams()
  const navigate = useNavigate()
  // State to see if the user can add more questions
  const [canAdd, setCanAdd] = useState(true)
  const [numQuestions, setNumQuestions] = useState([])
  const [questions, setQuestions] = useState([])
  // Getting all the questions (GET)
  const { data, loading, error, fetchData } = useFetch(`/${id}/questions/`)
  const { data: feedback } = useFetch(`/feedbacks/${id}/`)

  useEffect(() => {
    setQuestions(data)
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

  // dnd-kit
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragEnd = (event) => {
    const { active, over } = event

    if (active.id !== over.id) {
      setQuestions((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id)
        const newIndex = items.findIndex((item) => item.id === over.id)

        return arrayMove(items, oldIndex, newIndex)
      })
    }
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

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={questions}
            strategy={verticalListSortingStrategy}
          >
            {/* Questions */}
            {questions.map((question, index) => (
              <StageContext.Provider
                key={question.id}
                value={{ add, delete_, update, question, index }}
              >
                <QuestionCard />
              </StageContext.Provider>
            ))}
          </SortableContext>
        </DndContext>

        {/* <div className="w-full h-10 my-4 bg-blue-500">{question}</div> */}

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
