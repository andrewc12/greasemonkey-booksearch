// ==UserScript==
// @name         Goodreads Plus
// @namespace    https://greasyfork.org/en/users/78880
// @version      0.2
// @description  Add "Search MAM" button to Goodreads
// @author       Slengpung
// @include      https://www.goodreads.com/*
// @grant        none
// ==/UserScript==

'use strict';

console.log("[G+] Tweaking Goodreads...");

let page = window.location.pathname.split('/')[1];

if(page === 'book'){
	let bookTitle = getBookTitle(document.getElementById("bookTitle"));
	let mamSearchUrl = "https://www.myanonamouse.net/tor/browse.php?tor[text]=" + bookTitle;

	// Add 'Search MAM' button
	let buttonBar = document.getElementById("buyButtonContainer");
	if (buttonBar === null) {
		buttonBar = document.getElementById("asyncBuyButtonContainer");
	}
	if (buttonBar !== null) {
        let buttonUl  = buttonBar.getElementsByTagName("ul");
        if (buttonUl !== null){
            let mamButton = document.createElement("li");
            mamButton.innerHTML = '<a id="mamLink" href="' + mamSearchUrl + '" target="_blank" class="buttonBar">Search MAM</a>';
            mamButton.className = "Button";
            buttonUl[0].appendChild(mamButton);
            console.log("[G+] 'Search MAM' button added!");
        }
    }
}else if(page === 'review'){
	let bookList = document.querySelectorAll('#booksBody .title div a');
	// Loop over all the books
	for(let i=0; i<bookList.length; i++){
		let mamSearchUrl = "https://www.myanonamouse.net/tor/browse.php?tor[text]=" + getBookTitle(bookList[i]);
		// Add 'Search MAM' button
		let newLink = document.createElement('a');
		let linkText = document.createTextNode('[Search MAM]');
		newLink.appendChild(linkText);
		newLink.setAttribute('href',mamSearchUrl);
		newLink.setAttribute('style','color:#b3b3b3;font-style:italic');
        let parentNode = bookList[i].parentNode;
        if (parentNode !== null) {
            let parentNode2 = parentNode.parentNode;
            if (parentNode2 !== null) {
                parentNode2.appendChild(newLink);
            }
        }
	}
	console.log("[G+] 'Search MAM' buttons added!");
}

// Grab book title (and only title) from the element
function getBookTitle(el){
	let bookTitle = el.innerHTML.trim().split('<', 1)+'';
	console.log("Book title: " + bookTitle.trim());
	return bookTitle.trim();
}
