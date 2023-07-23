export const URL = `${process.env.REACT_APP_API_URL}`;

export const  datePicker = (dateStr) => {
    const dateObj = new Date(dateStr);
    const formattedDate = dateObj.toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true
    });

    return formattedDate;
};



export const formatNumbers  =  (number) => {
    return number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  

  export const checkStatus = (status) => {
    const statusMessages = {
      0: "Pending - (Awaiting Approval from District Accountant)",
      1: "Pending - (Awaiting Approval from Business Hub Manager)",
      2: "Pending - (Awaiting Approval from Audit)",
      3: "Pending - (Awaiting Approval from Regional Head)",
      4: "Pending - (Awaiting Approval from HCS)",
      5: "Pending - (Awaiting Approval from CCO)",
      6: "Pending - (Awaiting Approval from MD)",
      7: "Approved By MD",
      10: "Rejected",
    };
  
    return statusMessages[status] || "Unknown Status";
  };
  


