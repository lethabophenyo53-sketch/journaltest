let page = 0;
const pages = document.querySelectorAll(".page");

let entries = JSON.parse(localStorage.getItem("entries")) || [];

function login(){
  document.getElementById("login").classList.add("hidden");
  document.getElementById("cover").classList.remove("hidden");
}

function enterApp(){
  document.getElementById("cover").classList.add("hidden");
  document.getElementById("home").classList.remove("hidden");
  renderEntries();
}

function newEntry(){
  document.getElementById("home").classList.add("hidden");
  document.getElementById("journal").classList.remove("hidden");
}

function backHome(){
  document.getElementById("settings").classList.add("hidden");
  document.getElementById("home").classList.remove("hidden");
}

function openSettings(){
  document.getElementById("home").classList.add("hidden");
  document.getElementById("settings").classList.remove("hidden");
}

function next(){
  pages[page].classList.remove("active");
  page = Math.min(page+1, pages.length-1);
  pages[page].classList.add("active");
}

function prev(){
  pages[page].classList.remove("active");
  page = Math.max(page-1,0);
  pages[page].classList.add("active");
}

function saveEntry(){
  const story = document.getElementById("story").value;
  const closing = document.getElementById("closing").value;

  entries.push({story, closing});
  localStorage.setItem("entries", JSON.stringify(entries));

  alert("Saved!");
}

function renderEntries(){
  const box = document.getElementById("entries");
  box.innerHTML = "";

  entries.forEach((e,i)=>{
    box.innerHTML += `
      <div>
        <p>${e.story}</p>
        <button onclick="deleteEntry(${i})">Delete</button>
      </div>
    `;
  });
}

function deleteEntry(i){
  entries.splice(i,1);
  localStorage.setItem("entries", JSON.stringify(entries));
  renderEntries();
}

function finish(){
  document.getElementById("journal").classList.add("hidden");
  document.getElementById("home").classList.remove("hidden");
  renderEntries();
}

function rain(emoji){
  for(let i=0;i<20;i++){
    let d=document.createElement("div");
    d.className="fall";
    d.innerText=emoji;
    d.style.left=Math.random()*window.innerWidth+"px";
    document.body.appendChild(d);
    setTimeout(()=>d.remove(),3000);
  }
}

function exportPDF(){
  window.print();
}
