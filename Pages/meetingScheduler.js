function displayMeeting(meeting, index) {
  const meetingList = document.getElementById("meetingList");
  const meetingItem = document.createElement("li");

  const meetingName = document.createElement("h3");
  meetingName.textContent = `Meeting: ${meeting.meetingName}`;
  meetingItem.appendChild(meetingName);

  const meetingDate = document.createElement("p");
  meetingDate.textContent = `Date: ${meeting.meetingDate}`;
  meetingItem.appendChild(meetingDate);

  const meetingTime = document.createElement("p");
  meetingTime.textContent = `Time: ${meeting.startTime} - ${meeting.endTime}`;
  meetingItem.appendChild(meetingTime);

  const roomLocation = document.createElement("p");
  roomLocation.textContent = `Room: ${meeting.roomLocation}`;
  meetingItem.appendChild(roomLocation);

  const supervisor = document.createElement("p");
  supervisor.textContent = `Supervisor: ${meeting.supervisor}`;
  meetingItem.appendChild(supervisor);

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.className = "delete-button";
  deleteButton.onclick = function () {
    deleteMeeting(index);
    meetingList.removeChild(meetingItem);
  };
  meetingItem.appendChild(deleteButton);

  meetingList.appendChild(meetingItem);
}

function loadMeetings() {
  const storedMeetings = localStorage.getItem("meetings");
  if (storedMeetings) {
    const meetings = JSON.parse(storedMeetings);
    meetings.forEach(displayMeeting);
  } else {
    return [];
  }
}

function saveMeeting(meeting) {
  const storedMeetings = localStorage.getItem("meetings");
  let meetings;
  if (storedMeetings) {
    meetings = JSON.parse(storedMeetings);
  } else {
    meetings = [];
  }

  meetings.push(meeting);
  localStorage.setItem("meetings", JSON.stringify(meetings));
}

// Delete a meeting
function deleteMeeting(index) {
  const storedMeetings = localStorage.getItem("meetings");
  let meetings;
  if (storedMeetings) {
    meetings = JSON.parse(storedMeetings);
  } else {
    meetings = [];
  }

  meetings.splice(index, 1);
  localStorage.setItem("meetings", JSON.stringify(meetings));
}

document
  .getElementById("meetingForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const meeting = {
      meetingName: document.getElementById("meetingName").value,
      meetingDate: document.getElementById("meetingDate").value,
      startTime: document.getElementById("startTime").value,
      endTime: document.getElementById("endTime").value,
      roomLocation: document.getElementById("roomLocation").value,
      supervisor: document.getElementById("supervisor").value,
    };

    saveMeeting(meeting);
    displayMeeting(meeting);

    document.getElementById("meetingForm").reset();
  });

loadMeetings();

function goBack() {
  window.history.back();
}
