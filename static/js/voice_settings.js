// Senior Voice Assistant Speed & Pitch Controls
window.setVoiceCadence = function(rate, pitch) {
  localStorage.setItem("voice_rate", rate || "0.85");
  localStorage.setItem("voice_pitch", pitch || "1.0");
};
