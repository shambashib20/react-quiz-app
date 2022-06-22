import React from 'react'
import { useGlobalContext } from './context'

const Modal = () => {
  // involking the useGlobalContext.
  // destructuring the necessery keys from our context.
  const { isModalOpen, closeModal, correct, questions } = useGlobalContext()
  return (
    <div
      className={`${
        isModalOpen ? 'modal-container isOpen' : 'modal-container'
      }`}
    >
      <div className='modal-content'>
        <h2>Bravo!</h2>
        <p>
          You got {((correct / questions.length) * 100).toFixed(0)}% of
          questions correctly this time.
        </p>
        <button className='close-btn' onClick={closeModal}>
          play again
        </button>
      </div>
    </div>
  )
}

export default Modal
