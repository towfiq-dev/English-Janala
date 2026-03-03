const url1 = 'https://openapi.programming-hero.com/api/levels/all'
const loadLesson = () =>{
  fetch(url1)
  .then(response=> response.json())
  .then(json=> displayLesson(json.data))
}

const loadLevelWord =(id)=>{
  const url2 =`https://openapi.programming-hero.com/api/level/${id}`
  fetch(url2)
  .then(response=> response.json())
  .then(data=> displayLevelWord(data.data))
}
const wordContainer = document.getElementById('word-container')
wordContainer.innerHTML = ''
// {
//   id : 76,
//   level
//   word
//   meaning
//   pronunciation
// }
const displayLevelWord =(words)=>{
  words.forEach((word) => {
    const card = document.createElement('div')
    card.innerHTML = `
    <div class="shadow-sm text-center bg-sky-100 col-span-full rounded-xl py-10 px-5 space-y-4 font-bangla">
        <h2 class="font-bold text-2xl">${word.word}</h2>
        <p class="font-semibold">${word.pronunciation}</p>
        <div class="text-2xl font-medium font-bangla">${word.meaning}</div>
        <div class="flex justify-between items-center">
          <button class="btn bg-[#1a91ff10] hover:bg-[#1a91ff80]"><i class="fa-solid fa-circle-info"></i></button>
          <button class="btn bg-[#1a91ff10] hover:bg-[#1a91ff80]"><i class="fa-solid fa-volume-high"></i></button>
        </div>
      </div>
    `
    wordContainer.appendChild(card)
  });
}
//loadLevelWord()

const displayLesson = (lessons) =>{
const levelContainer = document.getElementById('level-container')
levelContainer.innerHTML = ''
for(const lesson of lessons){
  const btnDiv = document.createElement('div')
  btnDiv.innerHTML = `
  <button onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary">
  <i class="fa-solid fa-circle-question"></i>
  Lesson- ${lesson.level_no}</button>
  `
  levelContainer.appendChild(btnDiv)
}
}
loadLesson()