myStorage = window.localStorage;

const dayElement = document.getElementById("currentDay")
dayElement.innerText=new Date().toLocaleDateString('en', {weekday: "long" , month: 'long', day: "numeric" })

const hourElements = document.querySelectorAll(".hour");

for (el of hourElements) {
  const hour = parseInt(el.getAttribute('data-hour'), 10);
  const currentHour = moment().hour();

  if (hour < currentHour) {
    el.style.backgroundColor = '#d3d3d3';
  } else if (hour === currentHour) {
    el.style.backgroundColor = '#ff6961';
  } else if (hour > currentHour) {
    el.style.backgroundColor = '#77dd77';
  }
}

function saveScheduleItem(hour, description) {
  const rawSchedule = localStorage.getItem('schedule');
  let schedule = {};

  if (rawSchedule !== undefined) {
    schedule = JSON.parse(rawSchedule);
  }

  schedule[hour] = description;

  localStorage.setItem('schedule', JSON.stringify(schedule));
  loadSchedule();
}

function loadSchedule() {
  const rawSchedule = localStorage.getItem('schedule');
  let schedule = {};

  if (rawSchedule !== undefined) {
    schedule = JSON.parse(rawSchedule);
  }

  for (el of hourElements) {
    const hour = parseInt(el.getAttribute('data-hour'), 10);
    const description = schedule[hour];

    document.getElementById("description").innerText=description
  }
}


loadSchedule();