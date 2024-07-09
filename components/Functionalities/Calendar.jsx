'use client';

import { useEffect, useState, useContext } from "react";
import { Calendar, dayjsLocalizer } from "react-big-calendar";
import dayjs from "dayjs";
import '../../node_modules/react-big-calendar/lib/css/react-big-calendar.css';
import { TeamDataContext } from "../../components/Functionalities/Context";
import { apiPath } from "../../utils/api";
import DeleteTimeOff from "../../components/Functionalities/DeleteTimeOff";
import "../../components/Functionalities/styles/calender.css";


const MyCalendar = () => {
  const localizer = dayjsLocalizer(dayjs);
  const { teams, members } = useContext(TeamDataContext);
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      const teamCode = window.location.pathname.split("/").pop();
      const team = teams.find((team) => team.team_code === teamCode);

      if (!team) return;

      const teamMembers = members.filter((member) => member.team_id === team.id);

      try {
        const response = await fetch(apiPath(`/timeoff`));
        const eventsData = await response.json();
        const teamMemberIds = teamMembers.map((member) => member.id);
        const teamEvents = eventsData.filter((event) =>
          teamMemberIds.includes(event.member_id)
        );

        const formattedEvents = teamEvents.map((event) => {
          const member = teamMembers.find(
            (member) => member.id === event.member_id
          );
          return {
            id: event.id,
            start: new Date(event.start_date),
            end: new Date(event.end_date),
            title: member ? `${member.first_name} ${member.last_name}` : "",
            description: event.description,
            backgroundColor: member ? member.color : "#000000",
            memberName: member
              ? `${member.first_name} ${member.last_name}`
              : "",
          };
        });

        setEvents(formattedEvents);

      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    if (teams.length && members.length) {
      fetchEvents();
    }
  }, [teams, members]);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  const onDeleteConfirmation = () => {
    setEvents(events.filter((event) => event.id !== selectedEvent.id));
    setSelectedEvent(null);
  };

  const handleCloseDialog = () => {
    setSelectedEvent(null);
  };

  return (
    <div className="calender-container">
      <Calendar
        popup={false}
        localizer={localizer}
        events={events}
        onSelectEvent={handleEventClick}
        views={["month", "week"]}
        eventPropGetter={(event, start, end, isSelected) => {
          const style = {
            borderRadius: "10px",
            border: "none",
            backgroundColor: event.backgroundColor,
          };
          return { style };
        }}
        style={{
          height: "35em",
          width: "100%",
        }}
      />
      {selectedEvent && (
        <DeleteTimeOff
          eventId={selectedEvent.id}
          eventDescription={selectedEvent.description}
          memberName={selectedEvent.memberName}
          onDelete={onDeleteConfirmation}
          onCloseDialog={handleCloseDialog}
        />
      )}
    </div>
  );
};

export default MyCalendar;
