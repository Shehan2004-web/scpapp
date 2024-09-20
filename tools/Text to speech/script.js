if ("speechSynthesis" in window) {
  // (A) GET HTML ELEMENTS
  var hdemo = document.getElementById("demo"),
      hvoice = document.getElementById("voice"),
      hvol = document.getElementById("vol"),
      hpitch = document.getElementById("pitch"),
      hrate = document.getElementById("rate"),
      hmsg = document.getElementById("msg"),
      hgo = document.getElementById("go");
  
  // (B) POPULATE AVAILABLE VOICES
  var voices = () => {
    speechSynthesis.getVoices().forEach((v, i) => {
      let opt = document.createElement("option");
      opt.value = i;
      opt.innerHTML = v.name;
      hvoice.appendChild(opt);
    });
  };
  voices();
  speechSynthesis.onvoiceschanged = voices;

  // (C) SPEAK
  var speak = () => {
    let msg = new SpeechSynthesisUtterance();
    msg.voice = speechSynthesis.getVoices()[hvoice.value];
    msg.text = hmsg.value;
    msg.volume = +hvol.value;
    msg.pitch = +hpitch.value;
    msg.rate = +hrate.value;
    speechSynthesis.speak(msg);
    return false;
  };
  
  // (D) ENABLE FORM
  hdemo.onsubmit = speak;
  hgo.disabled = false;
}

document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
  });
});