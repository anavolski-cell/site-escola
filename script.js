/* 🌌 BACKGROUND PARTICLES */
const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

for(let i=0;i<120;i++){
  particles.push({
    x: Math.random()*canvas.width,
    y: Math.random()*canvas.height,
    r: Math.random()*2,
    dx: (Math.random()-0.5)*1,
    dy: (Math.random()-0.5)*1
  });
}

function animateBG(){
  ctx.fillStyle="rgba(0,0,0,0.3)";
  ctx.fillRect(0,0,canvas.width,canvas.height);

  for(let p of particles){
    ctx.fillStyle="#00f7ff";
    ctx.beginPath();
    ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
    ctx.fill();

    p.x += p.dx;
    p.y += p.dy;

    if(p.x<0||p.x>canvas.width) p.dx*=-1;
    if(p.y<0||p.y>canvas.height) p.dy*=-1;
  }

  requestAnimationFrame(animateBG);
}
animateBG();

/* 🎮 QUIZ */
const data = {
  easy: [
    {q:"2 + 2 = ?", a:["3","4","5","6"], c:1, p:10},
    {q:"Capital do Brasil?", a:["SP","RJ","Brasília","BH"], c:2, p:10}
  ],
  medium: [
    {q:"8 x 7 = ?", a:["54","56","58","60"], c:1, p:20},
    {q:"Machado escreveu?", a:["Dom Casmurro","O Alquimista","1984","It"], c:0, p:20}
  ],
  hard: [
    {q:"H2O é?", a:["Gas","Água","Fogo","Metal"], c:1, p:30}
  ]
};

let level, name, list, i, score, combo;

/* 🔊 arcade sound */
function beep(f){
  let a=new (window.AudioContext||window.webkitAudioContext)();
  let o=a.createOscillator();
  o.frequency.value=f;
  o.connect(a.destination);
  o.start();
  setTimeout(()=>o.stop(),80);
}

/* shake effect */
function shake(){
  document.body.style.transform="translate("+Math.random()*10+"px)";
  setTimeout(()=>document.body.style.transform="",100);
}

function start(){
  name=document.getElementById("name").value||"Street";
  level=document.getElementById("level").value;

  list=data[level];
  i=0;
  score=0;
  combo=0;

  document.getElementById("menu").classList.add("hidden");
  document.getElementById("game").classList.remove("hidden");

  document.getElementById("player").innerText=name;

  load();
}

function load(){
  let q=list[i];

  document.getElementById("question").innerText=q.q;
  document.getElementById("answers").innerHTML="";

  q.a.forEach((t,idx)=>{
    let b=document.createElement("button");
    b.innerText=t;

    b.onclick=()=>{

      if(idx===q.c){
        combo++;
        score+=q.p*combo;
        beep(600);
      }else{
        combo=0;
        beep(200);
      }

      document.getElementById("score").innerText=score;
      document.getElementById("combo").innerText="x"+combo;

      shake();
      document.getElementById("next").classList.remove("hidden");
    };

    document.getElementById("answers").appendChild(b);
  });
}

document.getElementById("next").onclick=()=>{
  i++;
  document.getElementById("next").classList.add("hidden");

  if(i<list.length){
    load();
  }else{
    end();
  }
};

function end(){
  document.getElementById("game").classList.add("hidden");
  document.getElementById("end").classList.remove("hidden");

  document.getElementById("final").innerText =
    `${name} terminou com ${score} pontos e combo max!`;

  save();
}

/* 🏆 ranking */
function save(){
  let r=JSON.parse(localStorage.getItem("rank")||"[]");
  r.push({name,score});
  r.sort((a,b)=>b.score-a.score);
  r=r.slice(0,5);
  localStorage.setItem("rank",JSON.stringify(r));
}

(function showRank(){
  let r=JSON.parse(localStorage.getItem("rank")||"[]");
  document.getElementById("rank").innerHTML=
    r.map(x=>`<p>${x.name} - ${x.score}</p>`).join("");
})();
