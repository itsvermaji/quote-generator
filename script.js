const quoteContainer = document.getElementById("quote-container")
const quoteText = document.getElementById("quote")
const authorText = document.getElementById("author")
const twitterBtn = document.getElementById("twitter")
const newQuoteBtn = document.getElementById("new-quote")
const loader = document.getElementById("loader");


function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
    if(!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;   
    }
}

// Get Quote from API
async function getQuote() {
    showLoadingSpinner();
    
    const proxyURL = "https://cors-anywhere.herokuapp.com/";
    const apiURL = "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";

    try {
        const response = await fetch(proxyURL + apiURL);
        const data = await response.json();
        console.log(data);

        // if Author is blank, add "Unknown"
        if(data.quoteAuthor === "") {
            authorText.innerText = "- Unknown";
        } else {
            authorText.innerText = '-' + data.quoteAuthor;
        }

        // Reduce font size for long fonts
        if(data.quoteText.length > 50) {
            quoteText.classList.add("long-quote")
        } else {
            quoteText.classList.remove("long-quote")
        }

        quoteText.innerText = data.quoteText;
        
        // stop loader and show code
        removeLoadingSpinner();

    } catch (err) {
        getQuote();
        console.log("Whoops! no quote", err);
    }

}

// Tweet Quote
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterURL = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterURL, '_blank');

}

// Event Listeners
newQuoteBtn.addEventListener("click", getQuote);
twitterBtn.addEventListener("click", tweetQuote);

// On Load
getQuote();
// showLoadingSpinner();