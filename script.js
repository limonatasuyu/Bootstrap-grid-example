var col_wid_slider;

window.onload = function() {

col_wid_slider = new Slider89(document.getElementById("col_width_slider"), {

	min: 0,
	max: 13,
	value: 0,
	width: 200,
	taskMouseUp: change_width

});

let add_row = document.querySelector(".add_row_button").firstChild;
let delete_row = document.querySelector(".delete_row_button").firstChild;
let add_col = document.querySelector(".add_column_button").firstChild;
let delete_col = document.querySelector(".delete_column_button").firstChild;
let width_slider = document.querySelector("#col_width_slider");

var row_num = 0;
var col_num = 0;

var selected_width = "";


// EventListener and function for it for adding a row ===============================================================================================
add_row.addEventListener("click", () => {

	row_num += 1;
	col_num += 1;

	var div_string = `<div class=row id=row_num-${row_num} onclick="javascript:select_row(this.id);"><div class=col id ="col_num-${col_num}" onclick="javascript:select_col(this.id);" style="border: 2px solid black;"><button style="width: 100%;">A column</button></div></div>`;

	document.querySelector(".result_visual .container").innerHTML += div_string;

});

// EventListener and function for it for deleting a row =============================================================================================
delete_row.addEventListener("click", () => {

	if (selected_row == null) {
		alert("First select a column from a row");
	} else { 
		document.querySelector(`#${selected_row}`).remove();
		selected_row = null;
	};

});


// EventListener and function for it for adding a column ============================================================================================
add_col.addEventListener("click", () => {

	if (selected_row == null) {
		alert("First select a column from a row");
	} else {

		col_num += 1;
		var new_column_string = `<div class=col id="col_num-${col_num}" onclick="javascript:select_col(this.id);" style="border: 2px solid black;"><button style="width: 100%;">A column</button></div>`;

		document.querySelector(`#${selected_row}`).innerHTML += new_column_string;
	};

});

// EventListener and function for it for deleting a column ==========================================================================================
delete_col.addEventListener("click", () => {

	if (selected_row == null) {
		alert("First select a column from a row");
	} else { 
		document.querySelector(`#${selected_col}`).remove();
		selected_row = null;
	};

});


};


// Creating some variables outside functions cause they're gonna be using inside other functions
var selected_row;
var selected_col;
var selected_type;

// Function for selecting a row as id name of particular row ========================================================================================
// id_name will come from onclick function on particular element
function select_row(id_name) {

	selected_row = id_name;

};

// Function for selecting a column as id name of particular column ==================================================================================
// id_name will come from onclick function on particular element
function select_col(id_name) {

	selected_col = id_name;

	// Creating a class_name variable for also selecting particular element's class name 
	var class_name = document.querySelector(`#${selected_col}`).className;

	// Executing the functions for seeing the col_type and col_width of selected column on controllers
	change_controller_type(class_name);
	change_controller_width(class_name);
	
	selected_type = "";
	selected_width = ""; 

};

// Function for the col_type of selected column on controllers ======================================================================================
function change_controller_width(class_name) {
	
	if (selected_col != undefined) {

		var class_chars = class_name.split('');

		var new_value;
		
		if (class_chars[class_chars.length - 1] == "o") {
		
			new_value = 13;
		
		} else if (isNaN(parseInt(class_chars[class_chars.length - 2])) != true) {

			new_value = parseInt(class_chars[class_chars.length - 2] + class_chars[class_chars.length - 1]);

		} else if (isNaN(parseInt(class_chars[class_chars.length - 1])) != true) {

			new_value  = parseInt(class_chars[class_chars.length - 1]);

		} else {

			new_value = 0;

		};

		col_wid_slider.newValues({value: new_value})
	
	};
};

// Function for the col_type of selected column on controllers ======================================================================================
function change_controller_type(class_name) {

	var class_chars = class_name.split('');
	var col_type_values = ["sm", "md", "lg", "xl"]

	if (class_chars.length == 3) {

		document.getElementById("None_type").checked = true;

	} else {

		if (isNaN(parseInt(class_chars[4]))) {

			for (var value_ of col_type_values) {
				if (value_ == class_chars[4] + class_chars[5] ) {
					document.getElementById(value_ + "_type").checked = true;
					break;
				};
			};
		} else {
		
			document.getElementById("None_type").checked = true;
		
		};
	};
};

// Function for changing width of a column ==========================================================================================================
function change_width() {

	var new_width = col_wid_slider.value;
	console.log(new_width);

	if (new_width != 0 && new_width != 13) {

		if (selected_row == null) {
		alert("First select a column from a row");
		col_wid_slider.newValues({value: 0})
		return;
		} else { 

		selected_width = "-" + String(new_width);
		};

	} else if (new_width == 13) {

		selected_width = "-auto";

	} else {
		selected_width = "";

	};

	if (selected_type == undefined) {
		selected_type = "";
	};
	
	document.querySelector(`#${selected_col}`).className = "col" + selected_type + selected_width;
	
	document.querySelector(`#${selected_col}`).firstChild.innerHTML = document.querySelector(`#${selected_col}`).className;
	
};

// Function for selecting column type like md, xl, etc. =============================================================================================
function change_column_type() {

	if (selected_row == null) {
		alert("First select a column from a row");
	} else { 
		// The querySelectorAll() method returns all elements that matches a CSS selector(s).

		// Creating a variable that'll be all of the radio buttons that they name is col_type in order to
		// figure out which radio button is checked
		var radioButtons = document.querySelectorAll('input[name="col_type"]:checked');

		// Creating a for loop for all radio buttons in radioButtons variable
		for (var radioButton of radioButtons) {
		// If the radio button in process is checked,
			if (radioButton.checked) {
				// then the selected type is it
				selected_type = radioButton.value;
				// Breaking the loop cause we already find which radio button is checked
				break;
			}
		}

		document.querySelector(`#${selected_col}`).className = "col" + selected_type + selected_width;
		document.querySelector(`#${selected_col}`).firstChild.innerHTML = document.querySelector(`#${selected_col}`).className;
	};
	
};

