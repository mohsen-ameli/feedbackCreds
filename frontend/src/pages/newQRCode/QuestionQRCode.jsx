import { Link, useParams } from "react-router-dom"
import QRCode from "react-qr-code"
import { Button } from "../../components/ui/Button"
import useFetch from "../../components/hooks/useFetch"
import Container from "../../components/ui/Container"
import PageTitle from "../../components/ui/PageTitle"
import useAxios from "../../components/hooks/useAxios"

const QuestionQRCode = () => {
  const axiosInstance = useAxios()
  const { id } = useParams()
  // Getting all FeedbackResponses, aka QRCodes
  const { data, loading, error, fetchData } = useFetch(
    `/feedback-responses/${id}/`
  )
  const { data: feedback } = useFetch(`/feedbacks/${id}/`)

  // Creating a new QRCode
  const createQRCode = async () => {
    await axiosInstance.post(`/feedback-responses/${id}/`)
    fetchData()
  }

  // Loading and error handling
  if (loading) {
    return <p>Loading...</p>
  } else if (error) {
    return <p>{error}</p>
  }

  return (
    <Container>
      <PageTitle text={`QR-codes for ${feedback.name}`} />

      <h1>
        These are unique QR-codes, for single instance uses. They will expire,
        once the customer has scanned and submitted their feedback.
      </h1>

      <div className="grid grid-cols-3 gap-6 my-8">
        {data.map((feedback, index) => {
          // Setting the QRCode value
          let value
          if (process.env.NODE_ENV === "development") {
            value = `http://192.168.0.173:3000/feedback-response/${feedback.id}/`
          } else {
            value = `https://feedback-cards.vercel.app/feedback-response/${feedback.id}/`
          }

          return (
            <Link
              className="cursor-pointer w-fit h-fit"
              to={`/feedback-response/${feedback.id}`}
              key={index}
            >
              <QRCode value={value} className="w-full h-full" />
              {feedback.is_submitted && <h1>filled</h1>}
            </Link>
          )
        })}
      </div>

      <Button text="Generate new QR-code" onClick={createQRCode} />
    </Container>
  )
}

export default QuestionQRCode
