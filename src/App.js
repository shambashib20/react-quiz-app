import React from 'react'
import { useGlobalContext } from './context'

import SetupForm from './SetupForm'
import Loading from './Loading'
import Modal from './Modal'
function App() {
  // involking our context to extract values from it.
  const {
    waiting,
    loading,
    questions,
    index,
    correct,
    nextQuestion,
    checkAnswer,
  } = useGlobalContext()
  if (waiting) { // if waiting is true
    return <SetupForm /> // return the SetupForm component.
  }
  if (loading) {
    return <Loading />
  }
  // destructurizing properties from a question object.
  const { question, incorrect_answers, correct_answer } = questions[index]
  // const answers = [...incorrect_answers, correct_answer]

  // randomize the correct answer position.
  // first destructuring our incorrect_answers array to extract the values.
  let answers = [...incorrect_answers]
  // generating random index number from 0 to 3 and rounding it down.
  const tempIndex = Math.floor(Math.random() * 4)
  // logic
  if (tempIndex === 3) { // if the random number generated, is 3
    answers.push(correct_answer)
  } else { // when 0, 1 and 2 are generated
    answers.push(answers[tempIndex]) // pushing element of certain index to the end of array.
    answers[tempIndex] = correct_answer // in that specific index, putting the correct_answer.
  }
  return (
    <main>
      <Modal />
      <section className='quiz'>
        <p className='correct-answers'>
          correct answers : {correct}/{index}
        </p>
        <article className='container'>
          {/* 
          dangerouslySetInnerHTML is React’s replacement for using innerHTML in the browser DOM.
          you have to type out dangerouslySetInnerHTML and 
          pass an object with a __html key, to remind yourself that it’s dangerous.
           */}
          <h2 dangerouslySetInnerHTML={{ __html: question }} />
          <div className='btn-container'>
            {answers.map((answer, index) => {
              // for every answer I'm displaying the button.
              // and onclick we are checking if the answer for that button is true or false.
              return (
                <button
                  key={index}
                  className='answer-btn'
                  onClick={() => checkAnswer(correct_answer === answer)}
                  dangerouslySetInnerHTML={{ __html: answer }}
                />
              )
            })}
          </div>
        </article>
        <button className='next-question' onClick={nextQuestion}>
          next question
        </button>
      </section>
    </main>
  )
}

export default App
