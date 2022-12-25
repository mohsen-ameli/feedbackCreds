import { useParams } from 'react-router-dom'
import QRCode from "react-qr-code";


const QuestionQRCode = () => {
  const { id } = useParams()
  const value = (process.env.NODE_ENV === 'development' ? "http://localhost:3000/" : "https://feedbackCreds.vercel.app/") + `feedback/${id}/questions/`

  console.log(value)

  return <>
    <h1>Scan this QRCode to see the questionnaire.</h1>
    <div className="">
      <QRCode value={value} className="w-[200px] h-[200px]" />
    </div>
  </>
}
 
export default QuestionQRCode;