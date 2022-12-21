const GetFeedbackItem = (index) => {
  const object = JSON.parse(localStorage.getItem("feedbacks"))
  const defaultValue = object ? object[index] : ""
  return defaultValue
}

export default GetFeedbackItem
