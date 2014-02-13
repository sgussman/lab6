'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	$('.project a').click(addProjectDetails);
	$('#colorBtn').click(randomizeColors);
}

/*
 * Make an AJAX call to retrieve project details and add it in
 */
function addProjectDetails(e) {
	// Prevent following the link
	e.preventDefault();

	var project = $(this).closest('.project');
	console.log(project);
	// Get the div ID, e.g., "project3"
	var projectID = $(this).closest('.project').attr('id');
	// get rid of 'project' from the front of the id 'project3'
	var idNumber = projectID.substr('project'.length);

	console.log("User clicked on project " + idNumber);
	var URL = "/project/" + idNumber;
	console.log("URL: " + URL);
	$.get(URL, addProject);

}

/*
 * Make an AJAX call to retrieve a color palette for the site
 * and apply it
 */
function randomizeColors(e) {
	$.get("/palette", getColors);
}

function addProject(result) {
	console.log(result);
	var projectHTML = "<a href='#' class = 'thumbnail'>" + 
		"<img src= '" + result['image'] + "' class = 'image'>" 
		+ '<p>' + result['title'] + '</p>' + 
		'<p><small>' + result['date'] + '</small></p></a>';
	console.log(projectHTML);
	
	$("#project" + result['id'] + " .details").html(result['summary']);
}

function getColors (result) {
	var colors = result.colors.hex;
	$("body").css('background-color', colors[0]);
	$('.thumbnail').css('background-color', colors[1]);
	$('h1, h2, h3, h4, h5, h5').css('color', colors[2]);
	$('p').css('color', colors[3]);
	$('.project img').css('opacity', .75);
}