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
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  
