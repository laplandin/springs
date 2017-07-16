
var myHeader = document.querySelector(".headroom");
// construct an instance of Headroom, passing the element
var headroom = new Headroom(myHeader, {
    "offset": 205,
    "tolerance": 5
});
// initialise
headroom.init();
