function openNav() {
  document.getElementById("mySidenav").style.width = "30rem";
  document.getElementById("menu-btn").style.display = "none";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("menu-btn").style.display = "block";

  }

 //check whether browser support service workers
if('serviceWorker' in navigator) {
    //wait until page loaded to avoid delaying rendering
    window.addEventListener('load', function() {
        //register service worker
        navigator.serviceWorker.register('serviceworker.js').then(
            function(registration) {
                console.log('Service worker registration successful', 
                                     registration);
            }, 
            function(err) {
                console.log('Service worker registration failed', err);
        });
    }); }