/* ================= OPEN MODAL ================= */
function logout(){
    playSound();
    document.getElementById("logoutModal").classList.add("active");
}


/* ================= CLOSE ================= */
function closeLogout(){
    document.getElementById("logoutModal").classList.remove("active");

}


/* ================= CONFIRM ================= */
function confirmLogout(){
    playSound();
    document.getElementById("logoutModal").classList.remove("active");
    document.getElementById("logoutLoader").classList.add("active");
    setTimeout(()=>{
        localStorage.removeItem("login");
        localStorage.removeItem("rememberUser");
        window.location.href = "/assets/login/login.html";
    },1200);

}

/* ================= SOUND ================= */
function playSound(){
    const sound = document.getElementById("logoutSound");
    if(sound){
        sound.currentTime = 0;
        sound.play().catch(()=>{});
    }

}


/* ================= CLICK OUTSIDE ================= */
window.addEventListener("click",(e)=>{
    const modal = document.getElementById("logoutModal");
    if(e.target === modal){
        modal.classList.remove("active");
    }

});



























/* ================= 3D TILT ================= */

const box = document.querySelector(".logout-box");

document.addEventListener("mousemove",(e)=>{

    if(!box) return;

    const x = (window.innerWidth / 2 - e.clientX) / 25;
    const y = (window.innerHeight / 2 - e.clientY) / 25;

    box.style.setProperty('--rx', `${y}deg`);
box.style.setProperty('--ry', `${x}deg`);

});


/* ================= CURSOR GLOW ================= */

const glow = document.querySelector(".cursor-glow");

document.addEventListener("mousemove",(e)=>{

    glow.style.left = e.clientX + "px";
    glow.style.top = e.clientY + "px";

});


/* ================= PARTICLE GENERATOR ================= */

const icons = ["🧬","💉","🩺","💊","🏥"];

const container = document.getElementById("particles");

for(let i=0;i<25;i++){

    let span = document.createElement("span");

    span.innerHTML = icons[Math.floor(Math.random()*icons.length)];

    span.style.left = Math.random()*100 + "%";
    span.style.animationDuration = (5 + Math.random()*10) + "s";

    container.appendChild(span);

}


/* ================= SOUND ================= */

function playClick(){

    const s = document.getElementById("clickSound");
    if(s){
        s.currentTime = 0;
        s.play().catch(()=>{});
    }

}

function playLogout(){

    const s = document.getElementById("logoutSound");
    if(s){
        s.currentTime = 0;
        s.play().catch(()=>{});
    }

}


/* ================= VIBRATION ================= */

function vibrate(){

    if(navigator.vibrate){
        navigator.vibrate(50);
    }

}


/* ================= UPDATE LOGOUT ================= */

function logout(){

    playClick();
    vibrate();

    document.getElementById("logoutModal").classList.add("active");

}

function confirmLogout(){

    playLogout();
    vibrate();

    document.getElementById("logoutModal").classList.remove("active");
    document.getElementById("logoutLoader").classList.add("active");

    setTimeout(()=>{

        localStorage.removeItem("login");
        localStorage.removeItem("rememberUser");

        window.location.href = "/assets/login/login.html";

    },1200);

}