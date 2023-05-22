import React, { useState } from 'react';
import Modal from 'react-modal';
import { useExportAssetDTMutation } from '../../redux/services/dss/dtService';
import { saveAs } from 'file-saver';

const Popup = ({ isOpen, onClose, title, content }) => {

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [businessHub, setBusinessHub] = useState('');
    const [status, setStatus] = useState('');
    const [feeder, setFeeder] = useState('');
    const [customer, setCustomer] = useState('');
    const [injection, setInjection] = useState('');
    const [energy, setEnergy] = useState('');

    const handleStartDateChange = (e) => {
        setStartDate(e.target.value);
      };
    
    const handleEndDateChange = (e) => {
        setEndDate(e.target.value);
      };

    const handleBusinessHubChange = (e) => {
      setBusinessHub(e.target.value);
    }

    const handleStatus = (e) => {
      setStatus(e.target.value);
    }

    const handleFeeder = (e) => {
      setFeeder(e.target.value);
    }

    const handleCustomer = (e) => {
      setCustomer(e.target.value);
    }

    const handleInjection = (e) => {
      setInjection(e.target.value);
    }

    const handleEnergy = (e) => {
      setEnergy(e.target.value);
    }
    

    const [ postExport ] = useExportAssetDTMutation();

      const handleSubmit = async (e) => {
        // handle form submission here
        e.preventDefault();
        const payload = {
          'start_date' : startDate,
          'end_date' : endDate,
          'business_hub' : businessHub,
          'status' : status,
          'feeder' : feeder,
          'customers' : customer,
          'injection' : injection,
          'energy' : energy,
          'dt': 'export_dt',

        }

        try{
        const response  = await postExport(payload).unwrap();

        
         console.log(response);

        }catch(e){
          console.log(e)
        }

       
       // onClose();
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
          
        },
      };
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} style={customStyles}>
      <h4>{title}</h4><hr/>
      {content && content(handleStartDateChange, handleEndDateChange, handleBusinessHubChange, 
        handleStatus, handleFeeder, handleCustomer, handleInjection, handleEnergy, handleSubmit)}
      {/* <button  className="btn btn-danger btn-xs"  onClick={onClose}>Close Popup</button> */}
    </Modal>
  );
};

export default Popup;
