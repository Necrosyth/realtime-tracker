const socket=io()

navigator.geolocation.watchPosition((position)=>{
    console.log(position.coords)
    const {latitude,longitude}=position.coords;

    socket.emit('send-Location',{latitude,longitude})

},(err)=>{
    console.log(err)
},
{
    enableHighAccuracy:true,
    timeout:5000,
    maximumAge:0
})

const map=L.map("map").setView([0, 0], 16)
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors"
}).addTo(map)

const markers={}

socket.on('recieve-Location',(data)=>{
    const {id,latitude,longitude}=data;
    map.setView([latitude,longitude])

    if(markers[id]){
        markers[id].setLatLng([latitude,longitude]) }
    else{
        markers[id]=L.marker([latitude,longitude]).addTo(map)
    }
})
