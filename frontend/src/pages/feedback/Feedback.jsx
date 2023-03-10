import { useNavigate, useParams } from "react-router-dom"
import useFetch from "../../components/hooks/useFetch"
import Card from "../../components/ui/Card"
import MultipleChoice from "./MultipleChoice"
import TrueOrFalse from "./TrueOrFalse"
import WrittenResponse from "./WrittenResponse"
import { Button } from "../../components/ui/Button"
import Container from "../../components/ui/Container"
import { useContext, useState } from "react"
import PageTitle from "../../components/ui/PageTitle"
import useAxios from "../../components/hooks/useAxios"
import { AuthContext } from "../../context/AuthContext"

const Feedback = () => {
  const navigate = useNavigate()
  const { user } = useContext(AuthContext)
  const axiosInstance = useAxios()
  const { uuid } = useParams()
  const {
    data: questions,
    loading,
    error: err,
  } = useFetch(`/feedback-response/${uuid}/`)
  const { data: feedback } = useFetch(`/get-feedback-from-uuid/${uuid}/`)

  // Data to be submitted to the server
  const [dataToSubmit, setDataToSubmit] = useState({})
  const [error, setError] = useState()

  const submit = async (e) => {
    e.preventDefault()

    // (PUT) Submitting the data to the server
    const context = {
      feedback: feedback.id,
      response: dataToSubmit,
      is_submitted: true,
    }
    try {
      await axiosInstance.put(`/feedback-response/${uuid}/`, context)
      await axiosInstance.put(`/get-user/${user?.user_id}/`, { credit: 10 })

      navigate("/")
    } catch (error) {
      setError(error.response.data.message)
    }
  }

  // Loading and error handling
  if (loading) {
    return <p>Loading...</p>
  } else if (err) {
    return <p className="text-xl font-bold text-red-600">{err}</p>
  }

  return (
    <Container>
      <PageTitle text={feedback.name} />
      <h1>By answering these questions, you will be rewarded with 10 FC</h1>
      <h1 className="text-rose-500 font-bold">
        Please be honest, as this survey only takes a few seconds to complete.
      </h1>

      {/* Looping through each question, and making sure the question exists before showing it */}
      {questions.map((question, index) => (
        <Card key={index} className="py-24 px-4 bg-[#a5274d]">
          {/* True or false */}
          {question.question_type === "True-or-false" && (
            <TrueOrFalse
              question={question}
              setDataToSubmit={setDataToSubmit}
            />
          )}

          {/* Multiple choice */}
          {question.question_type === "Multiple-choice" && (
            <MultipleChoice
              question={question}
              setDataToSubmit={setDataToSubmit}
            />
          )}

          {/* Written response */}
          {question.question_type === "Written-response" && (
            <WrittenResponse
              question={question}
              setDataToSubmit={setDataToSubmit}
            />
          )}
        </Card>
      ))}

      {/* I put this outside, since it gave a weird bug if i had all the questions inside */}
      <form
        onSubmit={(e) => submit(e)}
        className="select-none flex flex-col items-center"
      >
        <Button
          text="Submit"
          type="submit"
          disabled={Object.keys(dataToSubmit).length !== questions.length}
        />
      </form>

      {error && <p className="text-xl font-bold text-red-600">{error}</p>}
    </Container>
  )
}

export default Feedback
