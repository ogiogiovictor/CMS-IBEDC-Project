import React, { useState } from 'react';
import Modal from 'react-modal';
//import { useExportAssetDTMutation } from '../../redux/services/dss/dtService';
import { useExportCustomersMutation } from '../../redux/services/customer/customerService';
import { saveAs } from 'file-saver';
import { notify } from "../../utils/notify";

const Popup = ({ isOpen, onClose, title, content }) => {

     const [link, setLink] = useState(null); // State to store the download link

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [businessHub, setBusinessHub] = useState('');
    const [status, setStatus] = useState('');
    const [feeder, setFeeder] = useState('');
    const [customer, setCustomer] = useState('');
    const [injection, setInjection] = useState('');
    const [energy, setEnergy] = useState('');
    const [accountype, setAccountype] = useState('');
    const [region, setRegion] = useState('');
    const [customersearch, setSearchCustomer] = useState(''); //useState('customer_search');
    const [download, setDownload] = useState(''); 
    

      
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

    const handleAccountType = (e) => {
      setAccountype(e.target.value);
    }

    const handleSearchCustomer = (e) => {
      console.log(e.target.value);
      setSearchCustomer(e.target.value);
    }

    const handleRegion = (e) => { 
      setRegion(e.target.value);
    };  

    const handleDownload = (e) => {
      setDownload(e.target.value);
    }
    

    const [ postExport ] = useExportCustomersMutation();

      const handleSubmit = async (e) => {
        // if(!startDate || !endDate || !businessHub || !status || !region || !download){

        //   notify("danger", "Please fill all fields", 10000);
        //   alert("Please fill all fields");
        //   return;
        // }
        
          // handle form submission here
          e.preventDefault();
          let payload = null; // Define payload variable outside the if block

       

        try{
          notify("info", "Exporting data, please wait...", 10000);
          
          if(download == "download_customer"){
            payload = {
              'start_date' : startDate,
              'end_date' : endDate,
              'account_type': accountype,
              'business_hub' : businessHub,
              'download': download,
              'region' : region,
              'status' : status,
            }
          } 
          if(download == "download_transformer"){
             payload = {
              'business_hub' : businessHub,
              'status' : status,
              'region' : region,
              'add_inj_station' : injection,
              'download': download,
    
            }            
            
          }

          console.log(payload);


            // const response  = await postExport(payload).unwrap(); //for dss
             const response = await postExport(payload); // Remove .unwrap() to keep the response as-is
             const dahome = response.error.data;
             const csvData = 'data:text/csv;charset=utf-8,' + encodeURIComponent(response.error.data);
            
              const tempLink = document.createElement('a');
              tempLink.href = csvData;
              tempLink.setAttribute('download', 'export.csv');
              document.body.appendChild(tempLink);

              setLink(tempLink); // Set the download link in state
              notify("info", "Pulling data from server...", 10000);

             
              tempLink.click();
              tempLink.parentNode.removeChild(tempLink);

              if (tempLink) {
                notify("success", "Data Successfully Downloaded", 10000);
              }
          

        }catch(e){
          console.error('Export error:', e);
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
        handleStatus, handleFeeder, handleCustomer, handleInjection, handleEnergy, handleSubmit, handleAccountType, handleSearchCustomer,
        handleRegion, handleDownload)}
      {/* <button  className="btn btn-danger btn-xs"  onClick={onClose}>Close Popup</button> */}
    </Modal>
  );
};

export default Popup;
