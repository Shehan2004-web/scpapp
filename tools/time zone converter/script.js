const timeZones = [
    { name: "Pacific Time (PT)", offset: -7 },
    { name: "Mountain Time (MT)", offset: -6 },
    { name: "Central Time (CT)", offset: -5 },
    { name: "Eastern Time (ET)", offset: -4 },
    { name: "Greenwich Mean Time (GMT)", offset: 0 },
    { name: "Central European Time (CET)", offset: 1 },
    { name: "Eastern European Time (EET)", offset: 2 },
    { name: "Indian Standard Time (IST)", offset: 5.5 },
    { name: "China Standard Time (CST)", offset: 8 },
    { name: "Japan Standard Time (JST)", offset: 9 },
    { name: "Australian Eastern Time (AET)", offset: 10 },
  ];
  
  const fromTimeZone = document.getElementById("fromTimeZone");
  const toTimeZone = document.getElementById("toTimeZone");
  const convertedTime = document.getElementById("convertedTime");
  
  timeZones.forEach((zone) => {
    let optionFrom = document.createElement("option");
    optionFrom.text = zone.name;
    optionFrom.value = zone.offset;
    fromTimeZone.add(optionFrom);
  
    let optionTo = document.createElement("option");
    optionTo.text = zone.name;
    optionTo.value = zone.offset;
    toTimeZone.add(optionTo);
  });
  
  function convertTime() {
    const timeInput = document.getElementById("time").value;
    const fromOffset = parseFloat(fromTimeZone.value);
    const toOffset = parseFloat(toTimeZone.value);
  
    if (timeInput) {
      let [hours, minutes] = timeInput.split(":");
      let date = new Date();
      date.setHours(parseInt(hours));
      date.setMinutes(parseInt(minutes));
  
      let utcHours = date.getUTCHours() + fromOffset;
      let convertedHours = utcHours + toOffset;
  
      if (convertedHours >= 24) convertedHours -= 24;
      if (convertedHours < 0) convertedHours += 24;
  
      convertedTime.innerText = `${("0" + convertedHours).slice(-2)}:${("0" + date.getMinutes()).slice(-2)}`;
    } else {
      alert("Please select a time.");
    }
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
});