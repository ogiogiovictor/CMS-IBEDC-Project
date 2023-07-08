import React, {Fragment, useState, useEffect} from 'react';
import TicketCard from './ticketcard';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { useGetAllTicketsQuery } from '../../redux/services/ticket/ticketService';
import { setTicket, setDataTicket } from './ticketSlice';
import PageLoader from '../spinner/loader';
import DataTable from '../datatable';
import { notify } from "../../utils/notify";



const Tickets = () => {

  const [currentPage, setCurrentPage] = useState(1);
  const { tickets, ticketData } = useSelector((state) => state.tickets) || [];

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, isFetching, isUninitialized, refetch, error, dataUpdatedAt } = useGetAllTicketsQuery( 
    { pageNo: currentPage },  //{ cacheTime: 0 }
  );

  if (error) {
    console.log(error);
    notify("error", error.data.data);
    navigate(`/errorpage`);
  }

  console.log(data);

 

  useEffect(() => {
    if (currentPage && data) {
      refetch();
      dispatch(setTicket(data));
      dispatch(setDataTicket(data?.data?.tickets?.data));
    }
  }, [data, refetch, currentPage, dispatch]);

  console.log(data);

  const columns = [
    { title: "Date Created", field: "created_at" },
    { title: "TicketNo", field: "ticket_no" },
    { title: "Category", field: "category_id" },
    { title: "Classification", field: "classification" },
    { title: "Business Hub", field: "location_id" },
    { title: "Status", field: "status" },
  ];

  const handleActionClick = (ticketData) => {
    navigate(`/details/${ticketData.ticket_no}`, { 
      state: { 
        rowData: ticketData, 
        rowTitle: 'Ticket Information',
        rowSubTitle: ticketData.ticket_no,
        routeName: '/tickets'
       } });
    window.scrollTo(0, 0);
  };


    return (
        <Fragment>
        <TicketCard myTickets={tickets} />

        {isUninitialized ? <PageLoader /> : ''}

        {isFetching ? <PageLoader /> : 

        <div className="row">
       <div className="col-md-12 grid-margin grid-margin-md-0 stretch-card">
         <div className="card">
           <div className="card-body">
             <h4 className="card-title">All Tickets &nbsp;
             <button class="btn btn-icons btn-rounded btn-secondary" onClick={() => refetch()}><span class="icon-refresh"></span></button>
             </h4>
           
             <div class="form-group d-flex">
                  <input type="text" class="form-control" placeholder="Search Power Transformers(s)..." />
                  <button type="submit" class="btn btn-primary ml-3">Search</button>
            </div>


            <DataTable 
              data={ticketData}
              columns={columns}
              pagination
              currentPage={currentPage}
              totalCount={data?.data?.tickets?.total|| 1}
              pageSize={data?.data?.tickets?.per_page || 1}
              onPageChange={(page) => setCurrentPage(page)}
              onActionClick={handleActionClick}
            />

            
           </div>


         </div>
       </div>
       
     </div>
  }
   </Fragment>
    );
}

export default Tickets;