import React from 'react';

const TicketCard = ({myTickets}) => {
  console.log(myTickets)
  const { closedTicket, openTicket, totalTicket, unassigned } = myTickets.data??'';

    return (
        <div className="row">
        <div className="col-md-6 col-lg-3 grid-margin stretch-card">
          <div className="card bg-dark text-white border-0">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <i className="icon-user icon-lg"></i>
                <div className="ml-4">
                  <h4 className="font-weight-light">All Tickets</h4>
                  <h3 className="font-weight-light mb-3">{totalTicket ?? ''}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-md-6 col-lg-3 grid-margin stretch-card">
          <div className="card bg-primary text-white border-0">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <i className="link-icon icon-book-open icon-user icon-lg"></i>
                <div className="ml-4">
                  <h4 className="font-weight-light">Unassigned Tickets</h4>
                  <h3 className="font-weight-light mb-3">{unassigned ?? ''}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-md-6 col-lg-3 grid-margin stretch-card">
          <div className="card bg-danger text-white border-0">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <i className="icon-screen-desktop icon-lg"></i>
                <div className="ml-4">
                  <h4 className="font-weight-light">Closed Tickets</h4>
                  <h3 className="font-weight-light mb-3">{closedTicket ?? ''}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-3 grid-margin stretch-card">
          <div className="card bg-danger text-white border-0">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <i className="icon-screen-desktop icon-lg"></i>
                <div className="ml-4">
                  <h4 className="font-weight-light">Open Tickets</h4>
                  <h3 className="font-weight-light mb-3">{openTicket ?? ''}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
       
      </div>
    );
}

export default TicketCard;
