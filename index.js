

const userProvidedText= document.querySelector('.input-text-typing');
const textProvidedForValidation = document.querySelector('.validate-typing-text');
const error_text = document.querySelector('.error-count');
const accuracy_text = document.querySelector('.accuracy-count');
const restart_btn = document.querySelector('.restart-btn');
const div_area = document.querySelector('.div-area');
const wpm_text = document.querySelector('.wpm-count');


let quote_text = [];
let characterTyped = 0;
let errors = 0;
let totalerrors = 0;
let totalCharacterCount = 0;
let totalWordCount = 0;
var quote = "The journey of a thousand miles begins with one step";
userProvidedText.addEventListener('click', function startTypingTest()
{
  userProvidedText.removeEventListener('click',startTypingTest);
  this.value=""; 
   
  textProvidedForValidation.textContent = "";
  quote.split('').forEach(char => {      
    const charSpan = document.createElement('span')
    charSpan.innerText = char
    textProvidedForValidation.appendChild(charSpan)
  });
  accuracy_text.textContent = `0%`;
  startCountDown(1);
});


userProvidedText.addEventListener('keyup',function(event)
{
  if (event.key === ' ' || event.key === 'Spacebar') {
    totalWordCount++;
  }
  userProvidedText.textContent = "";
   // get current input text and split it
  curr_input = userProvidedText.value;
  curr_input_array = curr_input.split('');

  console.log(curr_input_array);
 
  // increment total characters typed
  characterTyped++;
 
  errors = 0; 
  
  quoteSpanArray = textProvidedForValidation.querySelectorAll('span');
  quoteSpanArray.forEach((char, index) => {
    let typedChar = curr_input_array[index]
 
    // character not currently typed
    if (typedChar == null) {
      char.classList.remove('correct_char');
      char.classList.remove('incorrect_char');
 
      // correct character
    } else if (typedChar === char.innerText) {
      char.classList.add('correct_char');
      char.classList.remove('incorrect_char');
 
      // incorrect character
    } else {
      char.classList.add('incorrect_char');
      char.classList.remove('correct_char');
 
      // increment number of errors
      errors++;
    }
  });
 
  // display the number of errors
  error_text.textContent = errors; 
 
  // update accuracy text
  let correctCharacters = (characterTyped - (errors));
  let accuracyVal = ((correctCharacters / characterTyped) * 100);
  var valueToDisplay = (accuracyVal >= 1) ?  Math.round(accuracyVal) : 0 
  accuracy_text.textContent = `${valueToDisplay}%`;
 
  // if current text is completely typed
  // irrespective of errors
  if (curr_input.length >= quote.length) {
    userProvidedText.value = "";
    textProvidedForValidation.textContent = "";
    quote.split('').forEach(char => {      
      const charSpan = document.createElement('span')
      charSpan.innerText = char
      textProvidedForValidation.appendChild(charSpan)
    });
    console.log(characterTyped);
    totalCharacterCount += characterTyped;    
    totalWordCount++;
    totalerrors += errors;
    errors = 0;
    error_text.textContent = 0;
   // userProvidedText.removeEventListener('keyup',validateTheTextEntered);       
}
});


var downloadTimer;
function startCountDown()
{
var timeleft = 0;
 downloadTimer = setInterval(function(){
    if(timeleft >= 60 ){
      clearInterval(downloadTimer);
      DisplayTheResults();      
    }
    document.querySelector('.time-count').textContent = `${60 - timeleft}s`;
    timeleft += 1;
  }, 1000);
}

function DisplayTheResults()
{
  totalerrors += errors;
  totalCharacterCount += characterTyped;
  error_text.textContent = totalerrors;
  let correctCharacters = (totalCharacterCount - (totalerrors));
  let accuracyVal = ((correctCharacters / totalCharacterCount) * 100);
  var valueToDisplay = (accuracyVal >= 1) ?  Math.round(accuracyVal) : 0 
  accuracy_text.textContent = `${valueToDisplay}%`;
  restart_btn.style.display = 'block';

  const currentdivValue = div_area.innerHTML;
  console.log(currentdivValue);
  div_area.innerHTML = '';
  div_area.innerHTML =
  `<div class="content-box hidden_values">
  <span class="text-displayed">WPM</span>
  <span class="wpm-count count-displayed">${totalWordCount}</span>
</div>
<div class="content-box hidden_values">
  <span class="text-displayed">CPM</span>
  <span class="wpm-count count-displayed">${totalCharacterCount}</span>
</div>` + currentdivValue;
error_text.textContent = totalerrors;
}

