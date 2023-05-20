import React, { useState } from 'react';
import Modal from 'react-modal';

const Popup = ({ isOpen, onClose, title, content }) => {

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleStartDateChange = (e) => {
        setStartDate(e.target.value);
      };
    
      const handleEndDateChange = (e) => {
        setEndDate(e.target.value);
      };

      const handleSubmit = () => {
        // handle form submission here
        console.log('Start Date:', startDate);
        console.log('End Date:', endDate);
        onClose();
      };

    const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          width: '500px',
          height: '250px',
        },
      };
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} style={customStyles}>
      <h3>{title}</h3><hr/>
      {content && content(handleStartDateChange, handleEndDateChange, handleSubmit)}
      {/* <button  className="btn btn-danger btn-xs"  onClick={onClose}>Close Popup</button> */}
    </Modal>
  );
};

export default Popup;
