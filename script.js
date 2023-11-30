// COURTESY COMMENTS! Put your name here or you will lose 20 points.
// Julia Caro
// May 3, 2023

// All the manipulated DOM elements
const apodTitle = document.querySelector('#apodTitle');
const apodDate = document.querySelector('#apodDate');
const description = document.querySelector('#apod-description');
// Defining a baseURL
const baseURL = 'https://api.nasa.gov/planetary/apod?api_key=';
// Defining the api key
const apiKey = 'HFvtQYnQ7MPdsT3GTNMFBhcPnxfUhgJ4kebmaUGG';

// Fetching the APOD data; fetch is using the baseURL + apiKey as the url it's using
fetch(baseURL + apiKey)
	.then(response => {
		// If the response is not ok
		if (!response.ok) {
			// Handler throws an error if the request did not succeed
			throw new Error(`HTTP error: ${response.status}`);
		} 
		// If the request succeeded, the handler fetches the response as a json object and returns the promise returned by response.json()
		return response.json();
	})
		.then((json) => showApod(json)) // This uses the showAPOD function further down on the json at this point in the fetch
		.catch((error) => console.error(`Fetch problem: ${error.message}`)); // If there is an error, put this error message in the console

// Function for what the data should do; called upon in the fetch API written above
function showApod(data) {
	// The title of the apod is the title from the data
	apodTitle.innerHTML = data.title;
	// The apod date is the date from the data
	apodDate.innerHTML = data.date;

	// If part of an 'If else if' statement; the documentation said that there could be video or image media used in their APOD so this is checking which type of media is being shown. This is so the body code shows only the relevant media div for the day, instead of both media divs at the same time.
	if(data.media_type === 'video') { // If the data's media type is strictly equal to video
		document.querySelector('iframe').src = data.url // Get the iframe video url from the data
		document.querySelector('.image-div').classList.add('hidden') // Add the hidden attribute to the image div to hide it
		document.querySelector('.video_div').classList.toggle('hidden') // Toggle the hidden attribute off of the video div
	} else if(data.media_type === 'image') { // If the data's media type is strictly equal to image
		document.querySelector('img').src = data.hdurl // Get the image url from the data
		document.querySelector('.image-div').classList.toggle('hidden') // Toggle the hidden attribute off of the image div
		document.querySelector('.video-div').classList.add('hidden') // Add the hidden attribute to the video div to hide it
	}
	
	// The description is the explanation from the data
	description.innerHTML = data.explanation;
}