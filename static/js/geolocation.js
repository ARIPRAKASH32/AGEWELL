// Geolocation SOS Coordinates Tagger
function captureLocationForSOS(formEl) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((pos) => {
      formEl.querySelector("[name=lat]").value = pos.coords.latitude;
      formEl.querySelector("[name=lng]").value = pos.coords.longitude;
    });
  }
}
