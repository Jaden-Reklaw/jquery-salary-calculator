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

//Ready the DOM
$(document).ready(readyNow);

//Things to run or click after teh document is ready
function readyNow() {
	$('#submit').on('click',addEmployee);
	$(`table`).on(`click`, '.delete',removeItemFromTable);
}

function addEmployee() {
	//Grab inputs from input fields and assign to global variables
	let employee = assignValues();

	//What to do if inputs are filled
	if(inputValidator()) {
		//Add object to array
		employees.push(employee);

		//Append value to DOM table and use employee-id as the ID for tr elements
		appendTableDOM();

		//Calculate Total Monthly and Add to DOM
		calculateTotalMonthly();

		//Reset Values
		removeValues();
	} else {
		//What to do if they are not filled
		removeValues();
	}
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

	//Remove employee from employees array
	removeEmployee(event.target.id);

	//recalculate the Total Monthly
	calculateTotalMonthly();
}

function calculateTotalMonthly() {
	let total = 0;
	for(let i = 0; i < employees.length; i++) {
		total += Number(employees[i].annualSalary);
	}

	if(total/12 >= 20000) {
		total = formatter.format(total/12);

		//Empty DOM
		$(`span`).empty();

		//Append to DOM
		$(`span`).append(total);

		//Add class to span
		$(`span`).addClass('alert');

	} else {
	//if it is below $20,000
		total = formatter.format(total/12);

		//Empty DOM
		$(`span`).empty();

		//Append to DOM
		$(`span`).append(total);

		//Incase alert class has been add remove it if total monthly cost is less then $20,000
		if($("span").attr("class") === 'alert') {
			$(`span`).removeClass('alert');
		}
	}	
}

function removeEmployee(person) {
	for (let i = 0; i < employees.length; i++) {
		if(employees[i].id === person) {
			employees.splice(i, 1);
			return true;
		}
	}
	return false;
}

function inputValidator() {
	//Check if input are empty
	if(firstName === '' || lastName === '' || id === '' || title === '' || annualSalary === '') {
		alert('You must fill in first name, last name, id, title, and annual salary');
		return false;
	}

	//Check id against employees array on object property id
	for (var i = 0; i < employees.length; i++) {
		if(employees[i].id === id){
			alert('ID matches someone that already exists in the employees array database');
			return false;
		}
	}
	return true;
}









