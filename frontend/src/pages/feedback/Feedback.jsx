import { useParams } from 'react-router-dom'
import useFetch from '../../components/hooks/useFetch'
import Card from '../../components/ui/Card'
import TextInput from '../../components/ui/TextInput'
import { MAXIMUM_WRITTEN_RESPONSE_LENGTH } from '../../data/Constants'

const Feedback = () => {
  const { id } = useParams()
  const { data: questions, loading: load1, error: err1 } = useFetch(`/feedback/${id}/questions`)
  const { data: feedback, loading: load2, error: err2 } = useFetch(`/feedbacks/${id}`)

  // Loading and error handling
  if (load1 || load2) {
    return <p>Loading...</p>
  } else if (err1) {
    return <p>{ err1 }</p>
  } else if (err2) {
    return <p>{ err2 }</p>
  }

  return <>
    <h1 className="text-lg">{ feedback.name } questiosns: </h1>
    <h1>By answering these questions, you will be rewarded: 10 FC</h1>

    {questions.map((question, index) =>
      <Card key={index} className="py-24 px-4">
        {question.question_type === "True-or-false" && <TrueOrFalse question={question} />}
        {question.question_type === "Multiple-choice" && <MultipleChoice question={question} />}
        {question.question_type === "Written-response" && <WrittenResponse question={question} />}

        {console.log(question[`choice_${1}`])}
      </Card>
    )}
  </>
}

const TrueOrFalse = ({ question }) => {
  return <>
    <div className="flex flex-col items-center gap-y-4 w-full">
      <h1 className="text-lg font-semibold w-full text-center">{ question.title }</h1>
      <div className="w-full flex items-center justify-around">
        <button className="bg-emerald-500 w-24 h-24 rounded-full">True</button>
        <button className="bg-rose-500 w-24 h-24 rounded-full">False</button>
      </div>
    </div>
  </>
}

const MultipleChoice = ({ question }) => {
  return <>
    <div className="flex flex-col items-center gap-y-4 w-full">
      <h1 className="text-lg font-semibold w-full text-center">{ question.title }</h1>
      <div className="w-full flex gap-x-4">
        <button className="bg-slate-600 w-full h-12 rounded-xl">{question.choice_1}</button>
        <button className="bg-slate-600 w-full h-12 rounded-xl">{question.choice_2}</button>
        <button className="bg-slate-600 w-full h-12 rounded-xl">{question.choice_3}</button>
        <button className="bg-slate-600 w-full h-12 rounded-xl">{question.choice_4}</button>
      </div>
    </div>
  </>
}

const WrittenResponse = ({ question }) => {
  return <>
    <div className="flex flex-col items-center gap-y-4 w-full">
      <h1 className="text-lg font-semibold w-full text-center">{ question.title }</h1>
      <div className="w-full flex gap-x-4">
        <textarea
          maxLength={MAXIMUM_WRITTEN_RESPONSE_LENGTH}
          className="bg-slate-600 text-white p-2 w-full h-28 max-h-28 min-h-full rounded-xl border-2 border-transparent focus:border-blue-500 focus:outline-none"
        >
        </textarea>
      </div>
    </div>
  </>
}

export default Feedback;