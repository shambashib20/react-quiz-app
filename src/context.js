import axios from 'axios'
import React, { useState, useContext, useEffect } from 'react'
// following table object will have categories and equivalant numbers.
const table = {
  sports: 21,
  history: 23,
  politics: 24,
  computers: 18,
  videogame: 15,
  math: 19
}

const API_ENDPOINT = 'https://opentdb.com/api.php?'

const url = ''
const tempUrl =
  'https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple'
const AppContext = React.createContext()
// AppProvider function will have all of the states
const AppProvider = ({ children }) => {
  // all of the states
  const [waiting, setWaiting] = useState(true)
  const [loading, setLoading] = useState(false)
  const [questions, setQuestions] = useState([])
  const [index, setIndex] = useState(0)
  const [correct, setCorrect] = useState(0)
  const [error, setError] = useState(false)
  // following state variable will hold an object hat has 3 properties.
  // all of the properties are having default values.
  const [quiz, setQuiz] = useState({
    amount: 10,
    category: 'sports',
    difficulty: 'easy',
  })
  const [isModalOpen, setIsModalOpen] = useState(false)
  // fetching the questions using axios.
  const fetchQuestions = async (url) => {
    setLoading(true)
    setWaiting(false)
    const response = await axios(url).catch((err) => console.log(err))
    if (response) {
      // accessing the array of objects, where each object represents a question.
      const data = response.data.results
      if (data.length > 0) { // if some data found
        setQuestions(data) // setting the data array of objects to questions state variable.
        setLoading(false)
        setWaiting(false)
        setError(false)
      } else { // if no data was found.
        setWaiting(true)
        setError(true) // show the error message
      }
    } else {
      setWaiting(true)
    }
  }
  // nextQuestion method will simply increment the index state variable value by 1
  const nextQuestion = () => {
    setIndex((oldIndex) => {
      // incrementing the index by 1
      const index = oldIndex + 1
      if (index > questions.length - 1) { // if we reached to the last question
        openModal() // the modal for showing the score
        return 0 // will go back to 0 index
      } else {
        return index
      }
    })
  }
  // value is going to be a boolean value
  const checkAnswer = (value) => {
    if (value) { // if value is true
      // correct is incremented by 1.
      setCorrect((oldState) => oldState + 1)
    }
    // regardless the answer is correct or not, we move onto the next question.
    nextQuestion() // we go to the next question.
  }
  // just changing the isModalOpen value to 
  const openModal = () => {
    setIsModalOpen(true)
  }
  const closeModal = () => {
    setWaiting(true)
    setCorrect(0) // correct is set back to 0.
    setIsModalOpen(false)
  }
  // following method will change the setup form field values individually.
  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    
    // using spread operator, keeping the old values,
    // while adding this particular name and value dynamically.
    setQuiz({ ...quiz, [name]: value })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    // destructurizing the quiz state variable, that stores an object.
    const { amount, category, difficulty } = quiz
    // constructing dynamic URL from user input.
    // table[category] fetches the specific category number from the table object.
    const url = `${API_ENDPOINT}amount=${amount}&difficulty=${difficulty}&category=${table[category]}&type=multiple`
    fetchQuestions(url) // finally fetching the questions.
  }

  return (
    <AppContext.Provider
      value={{
        waiting,
        loading,
        questions,
        index,
        correct,
        error,
        isModalOpen,
        nextQuestion,
        checkAnswer,
        closeModal,
        quiz,
        handleChange,
        handleSubmit,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
