alert("Use desktop mode for best experience!");

let input = document.querySelector('#search-bar');
let button = document.querySelector('#button');
let KEY = 'be1eb80c-7d92-49f8-9545-2817d19056a0';
let notFound = document.querySelector('.not__found');
let defBox = document.querySelector('.def');
let audioBox = document.querySelector('.audio');
let loading = document.querySelector('.load');

button.addEventListener('click',(e) => handleClick(e));

function handleClick(e){
  e.preventDefault();
  defBox.innerText = '';
  audioBox.innerText = '';
  notFound.innerText = '';

  let query = input.value;

  if(query===''){
    alert('Please enter a keyword to Search!');
    return;
  }
  fetchData(query);
}

async function fetchData(query){
  loading.style.display = 'block';
  const response = await fetch(`https://www.dictionaryapi.com/api/v3/references/learners/json/${query}?key=${KEY}`);
  const data = await response.json();

  if (data.length==0){
    loading.style.display = 'none';
    audioBox.style.display = 'none';
    notFound.style.display = 'block';
    notFound.innerHTML = 'Not Found';
    return;
  }
  audioBox.style.display = 'block';
  loading.style.display = 'none';
  console.log(data);
  let defination = data[0].shortdef[0];
  defBox.innerText = defination;

  const soundData = data[0].hwi.prs[0].sound.audio;
      if(soundData) {
          fetchSound(soundData);
      }

  console.log(data);
}

function fetchSound(soundData){

  let subfolder = soundData.charAt(0);
  let soundSrc = `https://media.merriam-webster.com/soundc11/${subfolder}/${soundData}.wav?key=${KEY}`;

  let aud = document.createElement('audio');
  aud.src = soundSrc;
  aud.controls = true;
  audioBox.appendChild(aud);

}
