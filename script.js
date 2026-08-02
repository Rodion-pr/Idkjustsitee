// ==========================================
//      С ДНЁМ РОЖДЕНИЯ, МАША ❤️
// ==========================================

// ---------- Элементы ----------

const loader = document.getElementById("loader");
const quiz = document.getElementById("quiz");
const finish = document.getElementById("finish");

const startBtn = document.getElementById("startBtn");

const typing = document.getElementById("typing");
const progress = document.getElementById("progressBar");

const question = document.getElementById("question");
const answers = document.getElementById("answers");
const counter = document.getElementById("counter");

const memeArea = document.getElementById("memeArea");
const memeImage = document.getElementById("memeImage");
const memeText = document.getElementById("memeText");

const gift = document.getElementById("gift");
const giftModal = document.getElementById("giftModal");
const closeGift = document.getElementById("closeGift");

// ---------- Звуки ----------

const clickSound = document.getElementById("clickSound");
const successSound = document.getElementById("successSound");
const errorSound = document.getElementById("errorSound");
const partySound = document.getElementById("partySound");

// ---------- Вопросы ----------

const questions = [
  {
    question:"Тебя действительно зовут Маша? ❤️",
    answers:["Да 😄","Наверное...","Сегодня я принцесса 👑"],
    meme:"img/cat.png",
    text:"Личность подтверждена 😎"
  },
  {
    question:"Сегодня тебе исполнилось...",
    answers:["18 🎉","17+1 😂","Всегда 18"],
    meme:"img/happy.png",
    text:"Возраст успешно обновлён ✔"
  },
  {
    question:"Что сегодня обязательно нужно сделать?",
    answers:["Съесть торт 🎂","Веселиться 🥳","И то и другое 😎"],
    meme:"img/cake.png",
    text:"Отличный выбор!"
  },
  {
    question:"Кто сегодня самая красивая?",
    answers:["Маша ❤️","Конечно Маша","Без вариантов Маша"],
    meme:"img/popcat.png",
    text:"Система полностью согласна."
  },
  {
    question:"Какое настроение?",
    answers:["🔥 Отличное","😁 Лучшее","💜 Максимально счастливое"],
    meme:"img/doge.png",
    text:"Настроение подтверждено."
  },
  {
    question:"Сколько торта нужно сегодня?",
    answers:["🍰 Один кусочек","🎂 Половину","😈 Весь"],
    meme:"img/cake.png",
    text:"Правильного ответа нет. Нужно два торта."
  },
  {
    question:"Ты готова получить поздравление?",
    answers:["Да ❤️","Очень","Конечно"],
    meme:"img/cat.png",
    text:"Остался последний шаг..."
  }
];

// ---------- Переменные ----------

let current = 0;

// ---------- Печатающийся текст ----------

const loadingText =
"Подключение к праздничной системе...\nПроверка личности...\nПроверка уровня красоты...\n";

let index = 0;

function typeWriter(){
  if(index < loadingText.length){
    typing.textContent += loadingText.charAt(index);
    index++;
    setTimeout(typeWriter,40);
  }
}

// ---------- Загрузка ----------

let width = 0;

const loadInterval = setInterval(()=>{
  width++;
  progress.style.width = width + "%";

  if(width>=100){
    clearInterval(loadInterval);
    startBtn.style.display="inline-block";
  }
},35);

// ---------- Запуск ----------

startBtn.addEventListener("click",()=>{
  clickSound.play();
  loader.classList.add("hidden");
  quiz.classList.remove("hidden");
  showQuestion();
});

typeWriter();

// ---------- Показ вопроса ----------

function showQuestion(){
  memeArea.style.display="none";

  const q = questions[current];

  question.innerHTML = q.question;
  counter.innerHTML = `${current+1} / ${questions.length}`;

  answers.innerHTML="";

  q.answers.forEach(answer=>{
    const button=document.createElement("button");
    button.className="answer";
    button.innerHTML=answer;
    button.onclick=()=>chooseAnswer(q);
    answers.appendChild(button);
  });
}

// ==========================================
//        ОБРАБОТКА ОТВЕТОВ
// ==========================================

function chooseAnswer(q){

    clickSound.currentTime = 0;
    clickSound.play();

    document.querySelector(".card").classList.add("shake");

    setTimeout(()=>{
        document.querySelector(".card").classList.remove("shake");
    },400);

    memeImage.src = q.meme;
    memeText.innerHTML = q.text;

    memeArea.style.display = "block";

    successSound.currentTime = 0;
    successSound.play();

    createHearts();

    setTimeout(()=>{

        current++;

        if(current >= questions.length){
            finishQuiz();
            return;
        }

        showQuestion();

    },2200);
}

// ==========================================
//          СЕРДЕЧКИ
// ==========================================

function createHearts(){
    for(let i=0;i<12;i++){
        const heart=document.createElement("div");
        heart.className="heart";
        heart.innerHTML="💖";
        heart.style.left=Math.random()*100+"vw";
        heart.style.animationDuration=(3+Math.random()*4)+"s";
        heart.style.fontSize=(20+Math.random()*25)+"px";

        document.body.appendChild(heart);

        setTimeout(()=>{
            heart.remove();
        },7000);
    }
}

// ==========================================
//       ФОНОВЫЕ ЧАСТИЦЫ
// ==========================================

function createParticles(){
    const bg=document.getElementById("particles");

    setInterval(()=>{
        const p=document.createElement("span");
        p.style.left=Math.random()*100+"vw";
        p.style.animationDuration=(6+Math.random()*8)+"s";
        p.style.width=(5+Math.random()*12)+"px";
        p.style.height=p.style.width;

        bg.appendChild(p);

        setTimeout(()=>{
            p.remove();
        },15000);
    },250);
}

createParticles();

// ==========================================
//      ФИНАЛ
// ==========================================

function finishQuiz(){
    quiz.classList.add("hidden");
    finish.classList.remove("hidden");
    partySound.play();
    startConfetti();
}

// ==========================================
//          КОНФЕТТИ
// ==========================================

function startConfetti(){
    const duration = 12000;
    const end = Date.now() + duration;

    const interval = setInterval(()=>{
        confetti({
            particleCount:8,
            angle:60,
            spread:70,
            origin:{x:0}
        });

        confetti({
            particleCount:8,
            angle:120,
            spread:70,
            origin:{x:1}
        });

        if(Date.now() > end){
            clearInterval(interval);
        }
    },250);
}

// ==========================================
//      КНОПКА "ПОЛУЧИТЬ ПОДАРОК"
// ==========================================

let runCounter = 0;

gift.addEventListener("mouseover",()=>{
    if(runCounter < 5){
        moveGiftButton();
    }
});

gift.addEventListener("click",()=>{
    if(runCounter < 5){
        errorSound.currentTime = 0;
        errorSound.play();

        moveGiftButton();

        runCounter++;

        return;
    }

    openGift();
});

// ==========================================
//      УБЕГАЮЩАЯ КНОПКА
// ==========================================

function moveGiftButton(){
    // берём реальные размеры кнопки, а не захардкоженные числа —
    // так она не будет вылезать за края экрана на разных устройствах
    const margin = 10; // запас от края экрана
    const btnWidth = gift.offsetWidth;
    const btnHeight = gift.offsetHeight;

    const maxX = Math.max(window.innerWidth - btnWidth - margin, margin);
    const maxY = Math.max(window.innerHeight - btnHeight - margin, margin);

    const x = margin + Math.random() * (maxX - margin);
    const y = margin + Math.random() * (maxY - margin);

    gift.style.position = "fixed";
    gift.style.left = x + "px";
    gift.style.top = y + "px";
    gift.style.margin = "0"; // сбрасываем margin-top:30px, чтобы не влиял на позицию
}

// ==========================================
//         ОТКРЫТИЕ ПОДАРКА
// ==========================================

function openGift(){
    clickSound.currentTime = 0;
    clickSound.play();

    gift.style.position = "";

    giftModal.classList.remove("hidden");

    startConfetti();
    createHearts();
}

// ==========================================
//      ЗАКРЫТЬ ПОЗДРАВЛЕНИЕ
// ==========================================

closeGift.addEventListener("click",()=>{
    clickSound.currentTime = 0;
    clickSound.play();

    giftModal.classList.add("hidden");
});

// ==========================================
//          СЛУЧАЙНЫЕ СООБЩЕНИЯ
// ==========================================

const compliments = [
"✨ Сегодня ты выглядишь на 100/10",
"👑 Корона уже ждёт тебя",
"🎂 Торт начинает переживать",
"🐱 Все котики поздравляют Машу",
"🌸 Сегодня главный праздник",
"💖 Уровень красоты: превышен",
"🥳 Настроение: великолепное",
"🎉 Система желает счастья"
];

setInterval(()=>{
    const note = document.createElement("div");

    note.innerHTML = compliments[Math.floor(Math.random()*compliments.length)];

    note.style.position = "fixed";
    note.style.top = "30px";
    note.style.left = "50%";
    note.style.transform = "translateX(-50%)";
    note.style.padding = "15px 25px";
    note.style.background = "rgba(255,255,255,.18)";
    note.style.backdropFilter = "blur(15px)";
    note.style.borderRadius = "15px";
    note.style.color = "white";
    note.style.fontWeight = "700";
    note.style.zIndex = "9999";
    note.style.animation = "fadeUp .6s";

    document.body.appendChild(note);

    setTimeout(()=>{
        note.remove();
    },2500);
},12000);

// ==========================================
//      ГОРЯЧИЕ КЛАВИШИ
// ==========================================

document.addEventListener("keydown",(e)=>{
    if(e.key==="Enter"){
        createHearts();
    }

    if(e.key===" "){
        startConfetti();
    }
});

// ==========================================
//      ФИНАЛЬНЫЙ ЛОГ
// ==========================================

console.log("🎉 Сайт успешно загружен.");
console.log("❤️ С Днём Рождения, Маша!");
console.log("🥳 Приятного праздника!");