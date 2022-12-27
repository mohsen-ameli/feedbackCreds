import { Link, useParams } from 'react-router-dom'
import QRCode from "react-qr-code";
import { Button } from '../../components/ui/Button'
import axios from 'axios';
import useFetch from '../../components/hooks/useFetch';

const QuestionQRCode = () => {
  const { id } = useParams()
  // Getting all FeedbackResponses, aka QRCodes
  const {data, loading, error, fetchData} = useFetch(`/feedback-responses/${id}/`)

  // TODO: 1: check if the feedback id and qr code represent the same Feedback
  // TODO: 2: Check if the QRCode has expired (if the user has already submitted their feedback)

  const createQRCode = async () => {
    await axios.post(`/feedback-responses/${id}/`)
    fetchData()
  }

  return <>
    {/* <h1>QRCode for {  }</h1> */}
    <h1>This is a unique QRCode, for one single instance use. It will expire, once the user has scanned and submitted their feedback.</h1>
    
    <p className="text-xl font-bold">
      $0/mo Free Tier: 2 feedbacks, 60 QR-Codes/mo
    </p>
    <p className="text-xl font-bold">
      $10/mo Mid Tier: 20 feedbacks, 5000 QR-Codes/mo
    </p>
    <p className="text-xl font-bold">
      $100/mo Pro Tier: 200 feedbacks, Infinite (≈∞) QR-Codes/mo
    </p>

    <div className="grid grid-cols-3 gap-6 my-8">
      {data.map((feedback, index) => 
        <Link className="cursor-pointer w-fit h-fit" to={`/feedback-response/${feedback.id}`} key={index}>
          <QRCode value={`/feedback-response/${feedback.id}`} className="w-full h-full" />
          {feedback.response !== "" && <h1>filled</h1>}
        </Link>
      )}
    </div>

    <Button text="Generate new QRCode" onClick={createQRCode} />
  </>
}
 
export default QuestionQRCode;