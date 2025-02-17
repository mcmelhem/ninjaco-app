import React, { Fragment, useMemo } from 'react'
import PropTypes from 'prop-types'

import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment'
import {
  Calendar,
  Views,
  DateLocalizer,
  momentLocalizer,
} from 'react-big-calendar'
import events from './events'
import * as dates from './dates'

const mLocalizer = momentLocalizer(moment)

const ColoredDateCellWrapper = ({ children }) =>
  React.cloneElement(React.Children.only(children), {
    style: {
      backgroundColor: 'lightblue',
    },
  })

/**
 * We are defaulting the localizer here because we are using this same
 * example on the main 'About' page in Storybook
 */
export default function Basic({
  localizer = mLocalizer,
  showDemoLink = true,
  ...props
}) {
  const { components, defaultDate, max, views } = useMemo(
    () => ({
      components: {
        timeSlotWrapper: ColoredDateCellWrapper,
      },
      defaultDate: new Date(),
      max: dates.add(dates.endOf(new Date(2025, 17, 1), 'day'), -1, 'hours'),
      views: Object.keys(Views).map((k) => Views[k]),
    }),
    []
  )

  return (
   
      <div style={{height: "600px"}} {...props}>
        <Calendar
          components={components}
          defaultDate={defaultDate}
          events={events}
          localizer={localizer}
          max={max}
          showMultiDayTimes
          step={60}
          views={['month', 'week', 'day', 'agenda']}
        />
      </div>
    
  )
}
Basic.propTypes = {
  localizer: PropTypes.instanceOf(DateLocalizer),
  showDemoLink: PropTypes.bool,
}