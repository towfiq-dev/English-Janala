const url = 'https://openapi.programming-hero.com/api/levels/all'
const loadLesson = () =>{
  fetch(url)
  .then(response=> response.json())
  .then(json=> displayLesson(json.data))
}

const displayLesson = (lessons) =>{
const levelContainer = document.getElementById('level-container')
levelContainer.innerHTML = ''
for(const lesson of lessons){
  const btnDiv = document.createElement('div')
  btnDiv.innerHTML = `
  <button class="btn btn-outline btn-primary">
  <i class="fa-solid fa-circle-question"></i>
  Lesson- ${lesson.level_no}</button>
  `
  levelContainer.appendChild(btnDiv)
}
}
loadLesson()