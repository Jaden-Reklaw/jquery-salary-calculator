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
	console.log('first name is: ',firstName);
	console.log('last name is: ',lastName);
	console.log('id is: ',id);
	console.log('title is: ',title);
	console.log('annual salary is: ',annualSalary);
	console.log('Employee is', employee);

}

function assignValues() {
	firstName = $(`#f-name`).val();
	lastName = $(`#l-name`).val()
	id = $(`#employee-id`).val()
	title = $(`#title`).val()
	annualSalary = $(`#a-salary`).val()

	return {
		firstName: firstName, 
		lastName: lastName, 
		id: id, 
		title: title, 
		annualSalary: annualSalary
	};
}




