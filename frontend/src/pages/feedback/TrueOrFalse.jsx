import { useEffect, useState } from "react"
import playConfetti from "../../components/hooks/playConfetti"
import Clicky from "../../components/ui/Clicky"
import Title from "../../components/ui/Title"

const TrueOrFalse = ({ question, setDataToSubmit }) => {
  const [happy, setHappy] = useState(null)

  // Saving the data to submit
  useEffect(() => {
    const data = {}

    // If user has selected an option
    if (happy !== null) {
      // Save the data
      data[question.id] = happy === 1 ? true : false
      setDataToSubmit((current) => ({ ...current, ...data }))
    }
  }, [happy])

  return (
    <div className="flex flex-col items-center gap-y-8 w-full">
      <Title title={question.title} />
      <div className="w-full flex items-center justify-around text-lg">
        <Clicky
          onClick={(e) => {
            playConfetti(e)
            setHappy(1)
          }}
          className={
            "rounded-full " + (happy === 1 ? "shadow-selected" : "shadow-none")
          }
        >
          <i className="fa-solid fa-face-laugh-beam p-1 text-[5rem] rounded-full text-emerald-400"></i>
        </Clicky>

        <Clicky
          onClick={() => setHappy(0)}
          className={
            "rounded-full " + (happy === 0 ? "shadow-selected" : "shadow-none")
          }
        >
          <i className="fa-solid fa-face-frown p-1 text-[5rem] rounded-full text-rose-400"></i>
        </Clicky>
      </div>
    </div>
  )
}

export default TrueOrFalse
