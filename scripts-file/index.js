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
      <h2 class="font-bold">zdfxgzxcv</h2>
      <p>zdfgv</p>
    </div>
    <div>
      <h2 class="font-bold">Synonym</h2>
      <span class="btn">zdfhvb</span>
      <span class="btn">zdfcv</span>
      <span class="btn">zdfgv</span>
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
        <p class="text-xl font-medium text-gray-400">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
        <h2 class="font-bold text-4xl">নেক্সট Lesson এ যান</h2>
  `
  return
}
  words.forEach((word) => {
    const card = document.createElement('div')
    card.innerHTML = `
    <div class="shadow-sm text-center bg-white col-span-full rounded-xl py-10 px-5 space-y-4">
        <h2 class="font-bold text-2xl">${word.word? word.word: 'কোন শব্দ খোঁজে পাউয়া যায়নি'}</h2>

        <p class="font-semibold">${word.pronunciation? word.pronunciation: 'কোন pronunciation খোঁজে পাউয়া যায়নি'}</p>

        <div class="text-2xl font-medium font-bangla">${word.meaning? word.meaning: 'কোন অর্থ খোঁজে পাউয়া যায়নি'}</div>

        <div class="flex justify-between items-center">
          <button onclick="loadWordDetail(${word.id})" class="btn bg-[#1a91ff10] hover:bg-[#1a91ff80]"><i class="fa-solid fa-circle-info"></i></button>
          <button class="btn bg-[#1a91ff10] hover:bg-[#1a91ff80]"><i class="fa-solid fa-volume-high"></i></button>
        </div>
      </div>
    `
    wordContainer.appendChild(card)
  });
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