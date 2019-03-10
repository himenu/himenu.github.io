import Vue from 'vue'


// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.

const getLocation = async (callback) => {
  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    await navigator.geolocation.getCurrentPosition(function (position) {
      const location = `${position.coords.latitude},${position.coords.longitude}`
      callback(position)
    }, function () {
      // The Geolocation service failed
      handleLocationError(true)
    })
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false)
  }
}

const handleLocationError = (browserHasGeolocation) => {
  const error = browserHasGeolocation
    ? `The Geolocation service failed.
     It's possible that you blocked this site for tracking your location,
     please try clearing your settings and try again.`
    : `Your browser doesn't support geolocation.`;

    console.log('====================================');
    console.log(error);
    console.log('====================================');
}
export default getLocation