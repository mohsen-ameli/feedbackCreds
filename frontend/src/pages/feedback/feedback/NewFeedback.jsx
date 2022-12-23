import axios from "axios"
import useFetch from "../../../components/hooks/useFetch"
import { Button } from "../../../components/ui/Button"
import Container from "../../../components/ui/Container"
import FeedbackCard from "./FeedbackCard"

const NewFeedback = () => {
  // Fetch all feedbacks
  const {data, loading, error, fetchData} = useFetch("http://localhost:8000/feedbacks")

  // Add new feedback (POST)
  const add = async () => {
    // Adding a new empty feedback
    await axios.post(`http://localhost:8000/feedbacks/`)
    // Refreshing the data
    fetchData()
  }

  // Loading and error handling
  if (loading) {
    return <p>Loading...</p>
  } else if (error) {
    return <p>{ error }</p>
  }

  return <>
    <Container className="flex flex-col items-center">
      <h1 className="text-3xl mb-4">Feedback Form</h1>
      <h1>Create a feedback for your item/service. For example, if you own a coffee shop, you might want a feedback for your iced caps.</h1>

      {data?.map((feedback, index) => (
        <FeedbackCard key={index} index={index} feedback={feedback} reFetch={fetchData} />
      ))}

      <Button text="Add new feedback" onClick={add} />
    </Container>
  </>
}
 
export default NewFeedback;