import { useEffect, useState } from "react"
import playConfetti from "../../components/hooks/playConfetti"
import Clicky from "../../components/ui/Clicky"
import Title from "../../components/ui/Title"

const MultipleChoice = ({ question, setDataToSubmit }) => {
  const [saved, setSaved] = useState(null)

  // Handling each button click
  const handleClick = (e, num) => {
    playConfetti(e)
    setSaved(num)
  }

  // Saving the data to submit
  useEffect(() => {
    const data = {}

    // If user has selected an option
    if (saved !== null) {
      // Save the data
      data[question.id] = saved
      setDataToSubmit((current) => ({ ...current, ...data }))
    }
  }, [saved])

  return (
    <div className="flex flex-col items-center gap-y-8 w-full">
      <Title title={question.title} />
      <div className="w-full flex gap-x-4">
        {question.choices.map((choice, index) => (
          <Clicky
            key={index}
            onClick={(e) => handleClick(e, index)}
            className={
              "bg-slate-600 w-full h-12 rounded-xl flex items-center justify-center " +
              (saved === index ? "shadow-selected" : "shadow-none")
            }
          >
            <h1>{choice}</h1>
          </Clicky>
        ))}
      </div>
    </div>
  )
}

export default MultipleChoice
