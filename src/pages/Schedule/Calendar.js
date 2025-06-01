import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import { Calendar, Views, DateLocalizer, momentLocalizer } from 'react-big-calendar';
import EventModal from './EventModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faCalendar} from '@fortawesome/free-solid-svg-icons';
import exEvents from './events';
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";

const mLocalizer = momentLocalizer(moment);

const Basic = ({ localizer = mLocalizer, ...props }) => {
  const [events, setEvents] = useState(exEvents); // initialize events
  const [modalTitle, setModalTitle] = useState('');
  const [isEventModalOpen, setisEventModalOpen] = useState(false);

  const addEvent = (blnShowModal) => {
    setModalTitle('Add Event');
    setisEventModalOpen(blnShowModal);
  };

  const addEventData = (newSession) => {
    const { title, startDate, endDate, location, instructor, description } = newSession;
    const newEvent = {
      title,
      start: new Date(startDate),
      end: new Date(endDate),
      location,
      instructor,
      title: description, 
    };
    setEvents((prevEvents) => [...prevEvents, newEvent]);
  };

  const { components, defaultDate, max, views } = useMemo(() => ({
    components: {
      timeSlotWrapper: ({ children }) => React.cloneElement(React.Children.only(children), {
        style: {
          backgroundColor: 'lightblue',
        },
      }),
    },
    defaultDate: new Date(),
    max: new Date(),
    views: Object.keys(Views).map((k) => Views[k]),
  }), []);

 
  const onEventResize = ({ event, start, end }) => {
    const updatedEvents = events.map((existingEvent) =>
      existingEvent.id === event.id ? { ...existingEvent, start, end } : existingEvent
    );
    setEvents(updatedEvents);
  };


  const onEventDrop = ({ event, start, end }) => {
    const updatedEvents = events.map((existingEvent) =>
      existingEvent.id === event.id ? { ...existingEvent, start, end } : existingEvent
    );
    setEvents(updatedEvents);
  };

  const DnDCalendar = withDragAndDrop(Calendar);

  return (
    <div style={{ height: '600px' }} {...props}>
      <div className='calender-btn-wrapper'>
        <button className='btn-add btn me-1' onClick={() => addEvent(true)}>
          <FontAwesomeIcon icon={faCalendar} /> Add Event
        </button>
        <button className='btn-add btn m-1' onClick={() => addEvent(true)}>
          <FontAwesomeIcon icon={faSave} /> Save
        </button>
      </div>

      <EventModal
        isOpen={isEventModalOpen}
        addEventData={addEventData}
        onClose={() => addEvent(false)}
        title={modalTitle}
      />

      <DnDCalendar
        defaultDate={moment().toDate()}
        defaultView="month"
        events={events}
        localizer={mLocalizer}
        onEventDrop={onEventDrop}  // event drop
        onEventResize={onEventResize}  // event resize
        resizable
        style={{ height: "100vh" }}
      />
    </div>
  );
};

Basic.propTypes = {
  localizer: PropTypes.instanceOf(DateLocalizer),
};

export default Basic;
