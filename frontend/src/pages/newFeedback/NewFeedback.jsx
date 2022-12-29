import useAxios from "../../components/hooks/useAxios"
import useFetch from "../../components/hooks/useFetch"
import { Button } from "../../components/ui/Button"
import Container from "../../components/ui/Container"
import PageTitle from "../../components/ui/PageTitle"
import FeedbackCard from "./FeedbackCard"

const NewFeedback = () => {
  // Fetch all feedbacks
  const { data, loading, error, fetchData } = useFetch("/feedbacks")
  const axiosInstance = useAxios()

  // Add new feedback (POST)
  const add = async () => {
    // Adding a new empty feedback
    await axiosInstance.post(`/feedbacks/`)
    // Refreshing the data
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
      <div className="flex flex-col items-center">
        <PageTitle text="Feedback Form" />
        <h1>
          Create a feedback for your item/service. For example, if you own a
          coffee shop, you might want a feedback for your iced caps.
        </h1>

        {data?.map((feedback, index) => (
          <FeedbackCard
            key={index}
            index={index}
            feedback={feedback}
            reFetch={fetchData}
          />
        ))}

        <Button text="Add new feedback" onClick={add} />
      </div>
    </Container>
  )
}

export default NewFeedback
