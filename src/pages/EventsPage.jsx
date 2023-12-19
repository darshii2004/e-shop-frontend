import React from "react";
import { useSelector } from "react-redux";
import EventCard from "../components/Events/EventCard";
import Header from "../components/Layout/Header";
import Loader from "../components/Layout/Loader";
import NoDataFound from "./NoDataFound";
const EventsPage = () => {
  const { allEvents, isLoading } = useSelector((state) => state.events);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Header activeHeading={4} />
          {allEvents.length > 0 ? (
            <EventCard active={true} data={allEvents && allEvents[0]} />
          ) : (
            <NoDataFound message="No Event Found" />
          )}
        </div>
      )}
    </>
  );
};

export default EventsPage;
