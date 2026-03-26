/* ================= ELEMENT ================= */

const form = document.getElementById("loginForm");
const username = document.getElementById("username");
const password = document.getElementById("password");

const spinner = document.querySelector(".spinner");
const text = document.querySelector(".text");
const card = document.querySelector(".login-card");
const toggle = document.querySelector(".toggle");
const button = document.querySelector(".login-btn");

/* ================= USER LOGIN SEMENTARA ================= */

const USER = "admin";
const PASS = "12345";

/* ================= AUTO FOCUS ================= */

window.addEventListener("load", () => {

username.focus();

const savedUser = localStorage.getItem("rememberUser");

if(savedUser){
username.value = savedUser;
}

});

/* ================= PASSWORD TOGGLE ================= */

toggle.addEventListener("click", () => {

const icon = toggle.querySelector("i");

if(password.type === "password"){

password.type = "text";
icon.classList.remove("fa-eye");
icon.classList.add("fa-eye-slash");
toggle.classList.add("active");

}else{

password.type = "password";
icon.classList.remove("fa-eye-slash");
icon.classList.add("fa-eye");
toggle.classList.remove("active");

}

});

/* ================= ENTER KEY LOGIN ================= */

document.addEventListener("keydown", (e) => {

if(e.key === "Enter"){
form.requestSubmit();
}

});

/* ================= FORM LOGIN ================= */

form.addEventListener("submit", function(e){

e.preventDefault();

/* prevent double click */

if(button.classList.contains("loading")) return;

button.classList.add("loading");

text.style.display = "none";
spinner.style.display = "block";
button.disabled = true;

/* simpan username */

localStorage.setItem("rememberUser", username.value);

/* simulasi proses login */

setTimeout(()=>{

if(username.value === USER && password.value === PASS){

/* simpan status login */

localStorage.setItem("login","true");

/* masuk dashboard */

window.location.href = "../../index.html";

}else{

spinner.style.display = "none";
text.style.display = "block";

button.disabled = false;
button.classList.remove("loading");

/* animasi error */

card.classList.add("shake");

setTimeout(()=>{
card.classList.remove("shake");
},600);

alert("Username atau Password salah");

}

},1200);

});