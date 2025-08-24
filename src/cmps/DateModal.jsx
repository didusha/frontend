// DateModal.jsx
import Modal from 'react-modal'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

Modal.setAppElement('#root')

export function DateModal({ isOpen, onClose }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Select Date"
      style={{
        content: {
          maxWidth: '600px',
          margin: 'auto',
          padding: '1em',
          borderRadius: '10px',
          height: '350px'
        },
      }}
    >
      <DatePicker inline monthsShown={2} />
      <button
        onClick={onClose}
        style={{
          marginTop: '10px',
          padding: '0.5em 1em',
          border: 'none',
          borderRadius: '5px',
          backgroundColor: '#ff385c',
          color: 'white',
          cursor: 'pointer',
        }}
      >
        Close
      </button>
    </Modal>
  )
}
