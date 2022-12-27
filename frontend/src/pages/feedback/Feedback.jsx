import { useParams } from 'react-router-dom'
import useFetch from '../../components/hooks/useFetch'
import Card from '../../components/ui/Card'
import MultipleChoice from './MultipleChoice'
import TrueOrFalse from './TrueOrFalse'
import WrittenResponse from './WrittenResponse'
import { Button } from "../../components/ui/Button"
import { useState } from 'react'

const Feedback = () => {
  const { uuid } = useParams()
  const { data: questions, loading: load1, error: err1 } = useFetch(`/feedback-response/${uuid}/`)
  const { data: feedback } = useFetch(`/get-feedback-from-uuid/${uuid}/`)

  // Data to be submitted to the server
  const [dataToSubmit, setDataToSubmit] = useState({})

  const submit = (e) => {
    e.preventDefault()
    console.log("Submitting...", dataToSubmit)

    // TODO: Submit the data to the server
    // await axios(`/feedback/${id}/questions`, dataToSubmit)
  }

  console.log(questions)

  // Loading and error handling
  if (load1) {
    return <p>Loading...</p>
  } else if (err1) {
    return <p className="text-xl font-bold text-red-600">{ err1 }</p>
  }

  return <>
    <h1 className="text-2xl font-semibold text-center">{ feedback.name }</h1>
    <h1>By answering these questions, you will be rewarded with 10 FC</h1>
    <h1 className="text-rose-500 font-bold">Please be honest, as this survey only takes a few seconds to complete.</h1>

    {questions.map((question, index) => question?.question_type &&
      <Card key={index} className="py-24 px-4 bg-[#a5274d]">
        {question.question_type === "True-or-false" && <TrueOrFalse question={question} setDataToSubmit={setDataToSubmit} />}
        {question.question_type === "Multiple-choice" && <MultipleChoice question={question} setDataToSubmit={setDataToSubmit} />}
        {question.question_type === "Written-response" && <WrittenResponse question={question} setDataToSubmit={setDataToSubmit} />}
      </Card>
    )}

    <form onSubmit={e => submit(e)} className="select-none flex flex-col items-center">
      <Button text="Submit" type="submit" disabled={(Object.keys(dataToSubmit).length !== questions.length)} />
    </form>
  </>
}

export default Feedback;