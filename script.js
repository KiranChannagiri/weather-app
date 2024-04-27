let grantaccess = document.querySelector(".grantaccess");
let grantloactionbox= document.querySelector(".grantloaction-box");
let yweather = document.querySelector(".yweather");
let currentloaction= document.querySelector(".currentloaction");
var currentcity= document.querySelector(".currentcity");
var currentdesc = document.querySelector(".currentdesc");
grantaccess.addEventListener("click",()=>
{
    navigator.geolocation.getCurrentPosition(accesscurrentloaction,deniedlocationaccess);
    function accesscurrentloaction(position)
    {
        var laitutude = position.coords.latitude;
        var longitude = position.coords.longitude;
        grantloactionbox.classList.add("displayproperty");
        cloaction(laitutude,longitude);
        currentloaction.classList.add("dispaly");
    }
    function deniedlocationaccess()
    {
        console.log("denied access");
    }
});
async function cloaction(latitude,longitude)
{
    var apikey = "7a5f1f962038676b9fe03b6a0ddc83da";
    var lat=latitude;
    var long=longitude
    var response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${long}&localityLanguage=en`);
    var data = await response.json();
    currentcity.textContent= data.city;
    var response2 = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apikey}&units=metric`)
    var data2 = await response2.json();
    currentdesc.textContent = data2.weather[0].description;
    document.querySelector(".currentwindspeed").textContent=data2.wind.speed + " m/s";
    document.querySelector(".currenthumidity").textContent=data2.main.humidity+"%";
    document.querySelector(".currentclouds").textContent=data2.clouds.all+"%";
    document.querySelector(".currenttemperature").textContent=data2.main.temp+"°C";
};
yweather.addEventListener("click",()=>
{
    yweather.classList.add("backgroundflip");
    document.querySelector(".swheather").classList.remove("backgroundflip");
    document.querySelector(".searchweatherbox").classList.remove("visibility");
});
document.querySelector(".swheather").addEventListener("click",()=>
{
    document.querySelector(".swheather").classList.add("backgroundflip");
    yweather.classList.remove("backgroundflip");
    document.querySelector(".searchweatherbox").classList.add("visibility");
});
document.querySelector(".search").addEventListener("click",()=>
{
               if(document.querySelector(".inputcity").value == 0)
               {
                    let img=document.createElement("img");
                    console.log(img);
                    img.src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS91om5tKQBy3nhxmjLa_Qlg1q10_ujWIsFYg&usqp=CAU";
                    document.body.appendChild(img);
                    // document.querySelector(".searchdetails").classList.add("opacityzero");
                    // img.classList.add("fourzerofour");
               }
               else 
               {
                
                var apikey = "7a5f1f962038676b9fe03b6a0ddc83da";
                let city = document.querySelector(".inputcity").value;
                async function weathersearch()
                {
                    let response3 = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`);
                    let data3 =await response3.json();
                    document.querySelector(".place").textContent=document.querySelector(".inputcity").value;
                    document.querySelector(".weatherconsdition").textContent=data3.weather[0].description;
                    console.log(data3); 
                    document.querySelector(".temperature").textContent=data3.main.temp+"°C";
                    document.querySelector(".windspeed").textContent=data3.wind.speed + " m/s";
                    document.querySelector(".humidity").textContent=data3.main.humidity+"%";
                    document.querySelector(".clouds").textContent=data3.clouds.all+"%";
                    document.querySelector(".searchdetails").classList.add("opacityone");
                    // document.body.removeChild("img");
                }
               weathersearch();
            }
});

