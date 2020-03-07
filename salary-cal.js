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
	$(`table`).on(`click`, '.delete',removeItemFromTable);
}

function addEmployee() {
	console.log('in addEmployee');
	
	//Grab inputs from input fields and assign to global variables
	let employee = assignValues();

	//Add object to array
	employees.push(employee);

	//Append value to DOM table and use employee-id as the ID for tr elements
	appendTableDOM();

	//Calculate Total Monthly and Add to DOM
	calculateTotalMonthly();

	//Reset Values
	removeValues();

}

/*
* assigns values to global variables and returns and object for an employee
* @param {no-params}
* @returns {object}
*/
function assignValues() {
	//Assign values from DOM input
	firstName = $(`#f-name`).val();
	lastName = $(`#l-name`).val();
	id = $(`#employee-id`).val();
	title = $(`#title`).val();
	annualSalary = $(`#a-salary`).val();

	//Return object to be used in employees array
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

function appendTableDOM() {
	$(`#employees-table`).append(`
		<tr class="${id}">
			<td>${firstName}</td>
			<td>${lastName}</td>
			<td>${id}</td>
			<td>${title}</td>
			<td>${formatter.format(annualSalary)}</td>
			<td><button class="delete" id=${id}>Delete</button></td>
		</tr>`);
}

function removeItemFromTable(event) {
	//Select item by id you want to delete
	let classId = $(`.${event.target.id}`);
	
	//Remove employee from table
	classId.remove();

	//recalculate the Total Monthly
	calculateTotalMonthly();
}

function calculateTotalMonthly() {
	let total = 0;
	for(let i = 0; i < employees.length; i++) {
		console.log('employee salary is:', employees[i].annualSalary);
		total += Number(employees[i].annualSalary);
	}
	total = total/12;
	console.log('total is', total);

	//Empty DOM
	$(`span`).empty();

	//Append to DOM
	$(`span`).append(total);
}







