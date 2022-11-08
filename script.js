const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// initialize empty array for JSON object later
let apiQuotes = [];                                 

// Loading Spinner from w3schools  https://www.w3schools.com/howto/howto_css_loader.asp
function showLoadingSpinner(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function removeLoadingSpinner(){
    quoteContainer.hidden = false;
    loader.hidden = true;
}

// Show New Quote
function newQuote(){
    showLoadingSpinner();
    // PIck a random quote from apiQuotes array using array length and random function
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    console.log("Quotes array length:   " + apiQuotes.length);
    console.log("Random quote selected: " + Math.floor(Math.random() * apiQuotes.length));
    console.log("Quote selected:");
    console.log(quote);

    // Check if Quote text is too long. If yes -> change fontsize
    if(quote.text.length>120){
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }

    quoteText.innerText = quote.text;

    // Check if Author field is blank and replace it with 'Unknown'
    if(!quote.author){
        authorText.innerText = 'Unknown';
    } else {
        authorText.innerText = quote.author;
    }
    
    removeLoadingSpinner();
}


// Get Quotes From API via asynchronous fetch request via try catch
async function getQuotes(){
    showLoadingSpinner();
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try {
        const response = await fetch(apiUrl);       // receive series of strings from server
        apiQuotes = await response.json();          // parse into a JSON object and pass into global variable named apiQuotes
        // console.log(apiQuotes);                  // test that all objects are fetched correctly
        newQuote();
    } catch (error) {
        alert(error);
        // Catch Error Here
    }
}

// Tweet Quote
function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.innerText} - ${authorText.innerText}`;
    window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Browser / Window load
getQuotes();


