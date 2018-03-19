import {createSelector} from 'reselect';

const feature = 'clock';

const setDate = (state) => state[feature].date;

export const getDate = createSelector(
  setDate,
  (date) => formatDate(date)
);

export const getTime = createSelector(
    setDate,
    (date) => formatTime(date)
);

export const Greeting = createSelector(
    setDate,
    (date) => setGreeting(date)
);
function formatTime(date) {
   
    return date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
}

function formatDate(date) {
   
    return date.toLocaleDateString([], { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}

function setGreeting(date) {
    let curHr = date.getHours()
    let greeting="Hello"
    if (curHr < 12) {
       greeting = 'Good morning'
    } else if (curHr < 18) {
       greeting= 'Good afternoon'
    } else {
       greeting= 'Good evening'
    }

    return greeting;
}