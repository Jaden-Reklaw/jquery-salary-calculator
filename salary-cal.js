//Test connection 
console.log('salary-cal.js');

//Global Variables
const employees = []; //Takes in employee as object
let firstName = '';
let lastName = '';
let id = '';
let title = '';
let annualSalary = '';

//Currency API to convert numbers to US currency
const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2
})

formatter.format(1000) // "$1,000.00"

//Ready the DOM
$(document).ready(readyNow);

//Things to run or click after teh document is ready
function readyNow() {
	$('#submit').on('click',addEmployee);
}

function addEmployee() {
	console.log('in addEmployee');
	
	//Grab inputs from input fields and assign to global variables
	let employee = assignValues();

	//Reset Values
	removeValues();

}

/*
* assigns values to global variables and returns and object for an employee
* @param {no-params}
* @returns {object}
*/
function assignValues() {
	firstName = $(`#f-name`).val();
	lastName = $(`#l-name`).val();
	id = $(`#employee-id`).val();
	title = $(`#title`).val();
	annualSalary = $(`#a-salary`).val();

	return {
		firstName: firstName, 
		lastName: lastName, 
		id: id, 
		title: title, 
		annualSalary: annualSalary
	};
}

/*
* function that reset the values of the variables on the DOM
* @params {none}
* @returns {nothing}
*/
function removeValues() {
	$(`#f-name`).val('');
	$(`#l-name`).val('');
	$(`#employee-id`).val('');
	$(`#title`).val('');
	$(`#a-salary`).val('');
}




