import React from 'react';
import './App.css';
import Timeline from 'react-calendar-timeline'
import 'react-calendar-timeline/lib/Timeline.css'
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';

momentDurationFormatSetup(moment);

const items = require('./result.json')
const groups = require('./groups.json')

const enrichData = items => {
  const sortedItems = items.sort((a,b) => moment(b.start_time) + moment(a.start_time));
  const globalStartTime = sortedItems[0].start_time;
  return sortedItems.map(item => (
    { ...item, 
      end_time_from_start: moment.duration(moment(item.end_time).diff(moment(globalStartTime))).format("mm:ss"),
      start_time_from_start: moment.duration(moment(item.start_time).diff(moment(globalStartTime))).format("mm:ss")
    }))
}

const formatTitle = t => t.split('[1m')[1];

function App() {

  return (
    <div className="App">
      {
        (items?.length && groups?.length) ? (
          <Timeline
          groups={groups.map(group => ({...group, title: formatTitle(group.title)}))}
          items={enrichData(items).map(item => ({
             ...item,
             title: formatTitle(item.title),
             start_time: moment(item.start_time),
             end_time: moment(item.end_time),
             itemProps: {
               style: {
                 color: 'black'
               },
               onDoubleClick: () => { alert(JSON.stringify(item, null, 2)) }
             },
             
            }))
            }
          defaultTimeStart={moment(items[0].start_time).add(-2, 'minute')}
          defaultTimeEnd={moment(items[items.length-1].end_time).add(2, 'minute')}
        />
        ) : <span>No data to show, Did you ran terraform-analyze successfully?</span>
      }

    </div>
  );
}

export default App;
