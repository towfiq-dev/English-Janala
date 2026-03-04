const createElements = (arr) => {
  if (!arr || arr.length === 0) return '<span class="text-gray-400">None</span>';
  const htmlElements = arr.map((el) => `<span class="badge badge-ghost m-1">${el}</span>`)
  return htmlElements.join(' ');
}
const manageSpinner =(status)=>{
  if(status === true){
    document.getElementById('spinner').classList.remove('hidden')
    document.getElementById('word-container').classList.add('hidden')
  }

  else{
    document.getElementById('word-container').classList.remove('hidden')
    document.getElementById('spinner').classList.add('hidden')
  }
}

const url1 = 'https://openapi.programming-hero.com/api/levels/all'
const loadLesson = () =>{
  fetch(url1)
  .then(response=> response.json())
  .then(json=> displayLesson(json.data))
  .catch(err => console.error("Error loading lessons:", err));
}

const removeActive =()=>{
  const lessonButtons = document.querySelectorAll('.lesson-btn')
  lessonButtons.forEach((btn)=>{btn.classList.remove('active')})
}

const loadLevelWord =(id)=>{
  manageSpinner(true)
  const url2 =`https://openapi.programming-hero.com/api/level/${id}`
  fetch(url2)
  .then(response=> response.json())
  .then(data=> {
    removeActive()
    const clickBtn = document.getElementById(`lesson-btn-${id}`)
    clickBtn.classList.add('active')
    displayLevelWord(data.data)
  })
  .catch(err => console.error("Error loading words:", err));
}

const loadWordDetail = (id)=>{
  const url3 = `https://openapi.programming-hero.com/api/word/${id}`
  // const response = await fetch(url3)

  // const details = await response.json()

  // displayWordDetails(details.data)

  fetch(url3)
  .then(response=> response.json())
  .then(detail=> displayWordDetails(detail.data))
}
const displayWordDetails = (word)=>{
  const detailsBox = document.getElementById('details-container')
  detailsBox.innerHTML = `
  <div class="">
      <h2 class="text-2xl font-bold">${word.word}(<i class="fa-solid fa-microphone-lines"></i>: ${word.pronunciation})</h2>
    </div>
    <div>
      <h2 class="font-bold">Meaning</h2>
      <p>${word.meaning}</p>
    </div>
    <div>
      <h2 class="font-bold">Example</h2>
      <p>${word.sentence}</p>
    </div>
    <div>
      <h2 class="font-bold">Synonyms</h2>
      <div class ="">${createElements(word.synonyms)}</div>
    </div>
  `
  document.getElementById('word_modal').showModal()
}

const displayLevelWord =(words)=>{
const wordContainer = document.getElementById('word-container')
wordContainer.innerHTML = ''
if (words.length === 0) {
  wordContainer.innerHTML = `
  <div class="text-center col-span-full rounded-xl py-10 space-y-6 font-bangla">
        <img class="mx-auto" src="./assets/alert-error.png" alt="">
        <p class="text-xl font-medium text-gray-400">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
        <h2 class="font-bold text-4xl">নেক্সট Lesson এ যান</h2>
  `

  manageSpinner(false)
  return
}

  words.forEach((word) => {
    const card = document.createElement('div')
    card.innerHTML = `
    <div class="shadow-sm text-center bg-white rounded-xl py-10 px-5 space-y-4 h-full border border-gray-100">
        <h2 class="font-bold text-2xl">${word.word? word.word: 'কোন শব্দ খোঁজে পাউয়া যায়নি'}</h2>
        <p class="font-semibold">${word.pronunciation? word.pronunciation: 'কোন pronunciation খোঁজে পাউয়া যায়নি'}</p>
        <div class="text-2xl font-medium font-bangla">${word.meaning? word.meaning: 'কোন অর্থ খোঁজে পাউয়া যায়নি'}</div>
        <div class="flex justify-between items-center">
          <button onclick="loadWordDetail(${word.id})" class="btn bg-[#1a91ff10] hover:bg-[#1a91ff80]"><i class="fa-solid fa-circle-info"></i></button>
          <button class="btn bg-[#1a91ff10] hover:bg-[#1a91ff80]"><i class="fa-solid fa-volume-high"></i></button>
        </div>
      </div>
    `

    wordContainer.appendChild(card)
  });
  manageSpinner(false)
}

const displayLesson = (lessons) =>{
const levelContainer = document.getElementById('level-container')
levelContainer.innerHTML = ''
for(const lesson of lessons){
  const btnDiv = document.createElement('div')
  btnDiv.innerHTML = `
  <button id="lesson-btn-${lesson.level_no}"  onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn">
  <i class="fa-solid fa-circle-question"></i>
  Lesson- ${lesson.level_no}</button>
  `
  levelContainer.appendChild(btnDiv)
}
}
loadLesson()

document.getElementById('btn-search')
.addEventListener('click', ()=>{
  removeActive();
  const input = document.getElementById('input-search')
  const output = input.value.trim().toLowerCase()
  const ur4 = 'https://openapi.programming-hero.com/api/words/all'
  fetch(ur4)
  .then(response=> response.json())
  .then(search=> {
    const allWords = search.data
    const filterWords = allWords.filter((word)=>
    word.word.toLowerCase().includes(output))
    displayLevelWord(filterWords)
  })
})

const handleGetStarted = () => {
    const nameInput = document.querySelector('input[placeholder="Enter Your Name"]');
    const passwordInput = document.querySelector('input[placeholder="Enter Your Password"]');
    const loginCard = document.querySelector('.card-body');

    // আগের ফর্মের ডিজাইনটি একটি ভেরিয়েবলে সেভ করে রাখা
    const originalForm = loginCard.innerHTML; 
    const userName = nameInput.value.trim();

    if (userName === "") {
        alert("অনুগ্রহ করে আপনার নাম লিখুন!");
        return;
    }

    loginCard.innerHTML = `
        <div class="text-center py-5 animate-pulse">
            <h3 class="text-2xl font-bold text-primary">Welcome, ${userName}!</h3>
            <p class="font-bangla text-gray-500 mt-2">আপনার শেখার যাত্রা শুভ হোক।</p>
        </div>
    `;

    setTimeout(() => {
        loginCard.innerHTML = originalForm;
        const newBtn = document.getElementById('btn-get-started');
        if(newBtn){
            newBtn.addEventListener('click', handleGetStarted);
        }
    }, 5000); 
};

const initialBtn = document.getElementById('btn-get-started');
if(initialBtn){
    initialBtn.addEventListener('click', handleGetStarted);
}