const supabaseClient = supabase.createClient(
    "https://thcpkomwqirnsthwsbab.supabase.co/",
    "sb_publishable_psbTX5zdREimrnH0jMnl5A_0wb1k_UE"
);


// =======================
// TEST VIDEA
// =======================

const videos = [

{
    id:1,
    title:"SirTros Minihry | Jak se připojit",
    channel:"SirTros",
    src:"video1.mp4"
},

{
    id:2,
    title:"Minecraft projekt",
    channel:"SirTros",
    src:"video2.mp4"
}

];




// =======================
// STRÁNKY
// =======================


function openPage(page){

    document.querySelectorAll(".page")
    .forEach(p=>{
        p.classList.add("hidden");
    });


    document.getElementById(page)
    .classList.remove("hidden");

}



// =======================
// PROFIL MENU
// =======================


function toggleProfile(){

    document
    .getElementById("profile")
    .classList.toggle("show");

}




// klik mimo menu zavře profil

document.addEventListener("click",function(e){

    let menu=document.getElementById("profile");

    let account=document.querySelector(".account");


    if(!account.contains(e.target)){

        menu.classList.remove("show");

    }

});





// =======================
// VIDEA
// =======================


function loadVideos(){


const box =
document.getElementById("video-list");



box.innerHTML="";



videos.forEach(video=>{


box.innerHTML+=`

<div class="video-card"
onclick="watchVideo(${video.id})">


<div class="thumbnail">

</div>


<h3>${video.title}</h3>

<p style="color:#aaa">
${video.channel}
</p>


</div>


`;

});


}







// =======================
// SLEDOVÁNÍ
// =======================



function watchVideo(id){


let video =
videos.find(v=>v.id===id);



if(!video)return;



addHistory(video);



alert(
"Přehrávám: "+video.title
);


}






// =======================
// HISTORIE
// =======================



function addHistory(video){


let history =
JSON.parse(
localStorage.getItem("history") || "[]"
);



history.unshift({

...video,

date:Date.now()

});



// bez duplicit

history =
history.filter(
(v,i,a)=>
a.findIndex(x=>x.id===v.id)===i
);




localStorage.setItem(
"history",
JSON.stringify(history)
);



cleanHistory();


loadHistory();


}






// smaže starší než 7 dní

function cleanHistory(){


let history =
JSON.parse(
localStorage.getItem("history") || "[]"
);



const week =
7*24*60*60*1000;



history =
history.filter(v=>{

return Date.now()-v.date < week;

});



localStorage.setItem(
"history",
JSON.stringify(history)
);


}







function loadHistory(){


cleanHistory();



let box =
document.getElementById("history-list");



let history =
JSON.parse(
localStorage.getItem("history") || "[]"
);



if(history.length===0){

box.innerHTML=
"Historie je prázdná.";

return;

}




box.innerHTML="";



history.forEach(v=>{


box.innerHTML+=`

<div class="video-card">

<div class="thumbnail"></div>

<h3>${v.title}</h3>

<p>${v.channel}</p>


</div>


`;

});


}






// =======================
// ODBĚRY ZATÍM
// =======================


function loadSubs(){


document.getElementById("subs-list")
.innerHTML=

"Zde budou vaše odběry 🔔";


}






// =======================
// ÚČET
// =======================


async function loadUser(){


const {data}=

await supabaseClient.auth.getUser();



if(data.user){


document.getElementById("account-name")
.innerText=
data.user.email;


}

}




async function logout(){


await supabaseClient.auth.signOut();


document.getElementById("account-name")
.innerText=
"Účet";


}




// =======================
// START
// =======================


loadVideos();

loadHistory();

loadSubs();

loadUser();
