import React, {Fragment, useState, useEffect} from 'react';
import TicketCard from './ticketcard';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { useGetAllTicketsQuery } from '../../redux/services/ticket/ticketService';
import { useSearchAssetDTMutation } from '../../redux/services/dss/dtService';
import { setTicket, setDataTicket } from './ticketSlice';
import PageLoader from '../spinner/loader';
import DataTable from '../datatable';
import { notify } from "../../utils/notify";



const Tickets = () => {

  const [currentPage, setCurrentPage] = useState(1);
  const { tickets, ticketData } = useSelector((state) => state.tickets) || [];

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { type } = useParams();
  //Everything to click card and update state
  const [updatedType, setUpdatedType] = useState(type); 

   //Everything Search State
   const [searchQuery, setSearchQuery] = useState('');
   const [hiddenFieldValue, setHiddenFieldValue] = useState('tickets');

  const { data, isFetching, isUninitialized, refetch, error, dataUpdatedAt } = useGetAllTicketsQuery( 
    { userQuery: updatedType, pageNo: currentPage },  //{ cacheTime: 0 }
  );

  console.log(data);

  if (error) {
    console.log(error);
    notify("error", error.data.data);
    navigate(`/errorpage`);
  }

  console.log(data);

 

  useEffect(() => {
    if (currentPage && data) {
      //refetch();
      dispatch(setTicket(data));

     // dispatch(setDataTicket(data?.data?.tickets?.data));

      let newData = data?.data?.tickets?.data;

      if (type) {
        if (type === 'closed' || type === 'All' || type === 'Open' || type === 'Unassigned') {
          newData = newData.filter(ticket => ticket.status === type);
        }
      }

      dispatch(setDataTicket(newData));

      /*
      type === "closed" && dispatch(setDataTicket(data?.data?.tickets?.data));
      type === "All" && dispatch(setDataTicket(data?.data?.tickets?.data));
      type === "Open" && dispatch(setDataTicket(data?.data?.tickets?.data));
      type === "Unassigned" && dispatch(setDataTicket(data?.data?.tickets?.data));
      */
    }
  }, [data, currentPage, type, updatedType, dispatch]);

  console.log(data);

  const columns = [
    { title: "Date Created", field: "created_at" },
    { title: "TicketNo", field: "ticket_no" },
    { title: "Category", field: "category_name" },
    { title: "Classification", field: "classification" },
    { title: "Business Hub", field: "location_name" },
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

  const onhandleStateChange = (data) => {
    const updatedType = data;
    setUpdatedType(updatedType);
  }

  const [postSearch ] = useSearchAssetDTMutation();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    performSearch(searchQuery);
  }


  const performSearch = async (searchQuery) =>  {
    const payload = {
      Tickets: searchQuery,
      type: hiddenFieldValue
    };

    if(!payload.Tickets){
      notify("error", "Please enter a search query");
      return null;
    }

    try {
         
      const result = await postSearch(payload).unwrap();
      console.log(result)
      setCurrentPage(1);
      dispatch(setDataTicket(result));

    } catch (error) {
      notify("error", error.data);
      console.log(error.data);
      // Handle any error that occurs during the search
    }

  }

    return (
        <Fragment>
        <TicketCard myTickets={tickets} onFilterStatusChange={onhandleStateChange} />

        {isUninitialized ? <PageLoader /> : ''}

        {isFetching ? <PageLoader /> : 

        <div className="row">
       <div className="col-md-12 grid-margin grid-margin-md-0 stretch-card">
         <div className="card">
           <div className="card-body">
             <h4 className="card-title">All Tickets &nbsp;
             <button class="btn btn-icons btn-rounded btn-secondary" onClick={() => refetch()}><span class="icon-refresh"></span></button>
             </h4>


             <div class="row">
                      <div class="col-md-12">
                          <form onSubmit={handleSearchSubmit}>
                            <div class="form-group d-flex">
                        
                            <input type="text" 
                            value={searchQuery} 
                            onChange={(e) => setSearchQuery(e.target.value)} 
                            name="search_ticket"
                              className="form-control" placeholder="Search Tickets..." />

                              <input type="hidden"  value={hiddenFieldValue} 
                              onChange={(e) => setHiddenFieldValue(e.target.value)}
                              className="form-control" />
                                <button type="submit" className="btn btn-primary ml-3">Search</button>
                            </div>
                          </form>
                      </div>

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