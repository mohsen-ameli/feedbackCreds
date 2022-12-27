import { useEffect, useState } from "react";
import playConfetti from "../../components/hooks/playConfetti";
import Clicky from "../../components/ui/Clicky";
import Title from "../../components/ui/Title"

const MultipleChoice = ({ question, setDataToSubmit }) => {
  const [saved, setSaved] = useState(null)
  const handleClick = (e, num) => {playConfetti(e); setSaved(num)}

  // Saving the data to submit
  useEffect(() => {
    const data = {}
    
    // If user has selected an option
    if (saved !== null) {
      // Save the data
      (data[question.id] = saved)
      setDataToSubmit(current => ({...current, ...data}))
    }
  }, [saved])

  return <>
    <div className="flex flex-col items-center gap-y-8 w-full">
      <Title title={question.title} />
      <div className="w-full flex gap-x-4">
        <Clicky
          onClick={e => handleClick(e, 0)}
          className={"bg-slate-600 w-full h-12 rounded-xl flex items-center justify-center " + (saved === 0 ? "shadow-selected" : "shadow-none")}
        >
          <h1>{question.choice_1}</h1>
        </Clicky>
        <Clicky
          onClick={e => handleClick(e, 1)}
          className={"bg-slate-600 w-full h-12 rounded-xl flex items-center justify-center " + (saved === 1 ? "shadow-selected" : "shadow-none")}
        >
          <h1>{question.choice_2}</h1>
        </Clicky>
        <Clicky
          onClick={e => handleClick(e, 2)}
          className={"bg-slate-600 w-full h-12 rounded-xl flex items-center justify-center " + (saved === 2 ? "shadow-selected" : "shadow-none")}
        >
          <h1>{question.choice_3}</h1>
        </Clicky>
        <Clicky
          onClick={e => handleClick(e, 3)}
          className={"bg-slate-600 w-full h-12 rounded-xl flex items-center justify-center " + (saved === 3 ? "shadow-selected" : "shadow-none")}
        >
          <h1>{question.choice_4}</h1>
        </Clicky>
      </div>
    </div>
  </>
}
 
export default MultipleChoice;