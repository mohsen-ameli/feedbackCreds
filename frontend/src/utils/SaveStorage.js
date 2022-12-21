const SaveStorage = (data) => {
  // Final list to be saved in the local storage
  const list_ = []

  // The current data in the local storage
  const current = JSON.parse(localStorage.getItem("feedbacks"))

  current !== null &&
    current.map((item) => {
      // The new item is not in local storage
      if (item.id !== data.id) {
        // Adding other old items to the list
        list_.push(item)
      }
    })

  // Adding the new item to the list
  list_.push(data)

  // Saving the list in the local storage
  localStorage.setItem(
    "feedbacks",
    JSON.stringify(list_.sort((a, b) => a.id - b.id))
  )
}

export default SaveStorage
