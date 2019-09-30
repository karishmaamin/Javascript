let AppId = "bc1b886e068635faacca8d77b5832cf5";
let units = "metric";
let searchMethod = 'q';

function searchWeather(searchTerm) {
    fetch('https://api.openweathermap.org/data/2.5/weather?id=' + searchTerm + '&APPID=' + AppId + '&units=' + units).then(result => {

        console.log(result);
        return result.json();

    }).then(result => {
        
        let date = new Date(result.dt * 1000);
        init(result, date);
        futureweather(result, date,searchTerm);
    });
}

function futureweather(result, sourceDate,searchTerm) {
   
    
        fetch('https://api.openweathermap.org/data/2.5/forecast?id=' + searchTerm +'&units=' + units +'&APPID=' + AppId ).then(result => {
    
            console.log(result);
            return result.json();
    
        }).then(result => {
            sourceDate.setDate(sourceDate.getDate() + 1)
           
           let j=0;

           var mon_sat = ["Monday","Tuesday","Wednesday","Thusday","Friday","Saturday","Sunday"];

           let array_day=new Array();
           let array_image=new Array();
           let array_temp_max=new Array();
           let array_temp_min=new Array();
           let date_array=new Array();
           let date=new Array();
           let week=new Array();
           let day=new Array();
           let array_week=new Array();
            for(i=0;i<result.list.length;i=i+8)
            {
                
                array_day[j]=result.list[i].dt;
                array_image[j]=result.list[i].weather[0].icon;
                array_temp_max[j]=result.list[i].main.temp_max;
                array_temp_min[j]=result.list[i].main.temp_min;
                j++;
            }
            console.log(array_day);

            let date_date;
            let week_week;
            for(i=0;i<array_day.length;i++)
            {
                date_date=new Date(array_day[i]*1000);
                week_week=date_date.getDay();
               
                array_week[i]=mon_sat[week_week];
            }
            console.log(date);
            console.log(array_week);

            let x=document.getElementsByClassName("futureday");
            for(i=0;i<array_week.length;i++)
            {
                x[i].innerHTML=array_week[i];
            }

            console.log(array_image);
            let y=document.getElementsByClassName("future-image");
           
           
    
            for(i=0;i<array_image.length;i++)
            {
               y[i].src= "http://openweathermap.org/img/w/" + array_image[i] + ".png";

            }

            let z=document.getElementsByClassName("future-temp");
            
            console.log(array_temp_max);
            console.log(array_temp_min);
            for(i=0;i<array_temp_max.length;i++)
            {
                z[i].innerHTML = array_temp_max[i] + '&#x2103; | ' + array_temp_min[i] + '&#x2103';
            }

           
         
           
                
        });
    
    }


   




function init(resultfromserver, date) {




    let year = date.getFullYear;
    let month = date.getMonth;
    let daynum = date.getDay;


    let iconcode = resultfromserver.weather[0].icon;
    let iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
    // Hours part from the timestamp
    let hours = date.getHours();
    let daynumber = date.getDay();
    let day;
    switch (daynumber) {
        case 0: day = "SUNDAY";
        
            break;
        case 1: day = "MONDAY";
            break;
        case 2: day = "TUESDAY";
            break;
        case 3: day = "WEDNESDAY";
            break;
        case 4: day = "THUSDAY";
            break;
        case 5: day = "FRIDAY";
            break;
        case 6: day = "SATURDAY";
            break;


    }
    let greeting;
    if (hours < 12) {
        greeting = 'Good morning';
    } else if (hours < 16) {
        greeting = 'Good afternoon';
    } else if (hours < 18) {
        greeting = 'Good evening';
    }
    else {
        greeting = 'Good night';
    }


    switch (resultfromserver.weather[0].main) {
        case 'Clouds': image = 'url("cloudy.jpeg")';
            display(resultfromserver, image, greeting, day, iconurl);
            break;

        case 'Clear': image = 'url("blue.jpeg")';
            display(resultfromserver, image, greeting, day, iconurl);

            break;
        case 'Rain':

        case 'Drizzle':

        case 'Mist': image = 'url("rain2.jpeg")';
            display(resultfromserver, image, greeting, day, iconurl);
            break;
        case 'Thunderstorm': image = 'url("storm.jpeg")';
            display(resultfromserver, image, greeting, day, iconurl);
            break;
        case 'Snow': image = 'url("snow.jpeg")';
            display(resultfromserver, image, greeting, day, iconurl);
            break;
    }
}


function currentlocation() {
    searchWeather(1277333);
}


function onClickMenu() {
    document.getElementById("menu").classList.toggle("change");
    document.getElementById("nav").classList.toggle("change");

    document.getElementById("menu-bg").classList.toggle("change-bg");
}

function menufunction() {
    document.getElementById("hamber-id").style.visibility = "hidden";
    document.getElementById("close-btn").style.visibility = "visible";
    document.getElementById("nav-menu-id").style.visibility = "visible";
}

function closemenu() {
    document.getElementById("hamber-id").style.visibility = "visible";
    document.getElementById("close-btn").style.visibility = "hidden";
    document.getElementById("nav-menu-id").style.visibility = "hidden";
}

function display(resultfromserver, image, greetings, day, iconurl) {
    document.getElementById('image').style.backgroundImage = image;
    document.getElementById('greeting').innerHTML = greetings;
    document.getElementById('place').innerHTML = resultfromserver.name;
    document.getElementById('week-day').innerHTML = day;
    document.getElementById("icon-img").src = iconurl;
    document.getElementById("temp").innerHTML = resultfromserver.main.temp_min + '&#x2103; | ' + resultfromserver.main.temp_max + '&#x2103';
}