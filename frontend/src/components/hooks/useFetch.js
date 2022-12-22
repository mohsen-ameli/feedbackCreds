import axios from "axios"
import { useEffect, useState } from "react"

const useFetch = (url) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchData = async () => {
    try {
      const response = await axios.get(url)
      if (response.status === 200) {
        setData(response.data)
      }
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    let isCancelled = false
    fetchData()
    return () => {
      isCancelled = true
    }
  }, [url])

  return { data, loading, error, fetchData }
}

export default useFetch
