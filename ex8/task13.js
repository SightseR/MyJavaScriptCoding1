const listAllButton = document.querySelector("#list-all");
const addButton = document.querySelector(".add");
const studentsTableBody = document.querySelector("#students tbody");

// Add a new student to the table and database
function addStudent() {
	const nameInput = document.querySelector("#name");
	const infoInput = document.querySelector("#info");
	const pointsInput = document.querySelector("#points");

	// Use default values if input fields are empty
	const name = nameInput.value.trim() || "Unknown";
	const info = infoInput.value.trim() || "No information";
	const points = parseInt(pointsInput.value) || 0;

	// Send a POST request to the back-end to add the new student
	fetch("http://localhost:3010/students", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			name: name,
			info: info,
			exercise_points: points
		})
	})
	.then(response => response.json())
	.then(student => {
		// Add the new student to the table
		addStudentToTable(student);
	})
	.catch(error => console.error(error));
}

// Add a student to the table

function addStudentToTable(student) {
	// Create a new row for the student
	const row = document.createElement("tr");

	// Create a cell for the student's name
	const nameCell = document.createElement("td");
	nameCell.textContent = student.name;
	row.appendChild(nameCell);

	// Create a cell for the student's info
	const infoCell = document.createElement("td");
	infoCell.textContent = student.info;
	row.appendChild(infoCell);

	// Create a cell for the student's exercise points
	const pointsCell = document.createElement("td");
	pointsCell.textContent = student.exercise_points || "–";
	pointsCell.classList.add("points");
	row.appendChild(pointsCell);

	// Add a class to the row if exercise points are less than 50 or null
	if (student.exercise_points === null || student.exercise_points < 50) {
		row.classList.add("low-points");
	}

	// Add a class to the row if exercise points are more than 50
	if (student.exercise_points >= 50) {
		row.classList.add("max-points");
	}

	// Add the new row to the table
	studentsTableBody.appendChild(row);
}

// Clear the table of students
function clearTable() {
	studentsTableBody.innerHTML = "";
}

// Populate the table with all students
function populateTable() {
	clearTable();

	fetch("http://localhost:3010/students")
	.then(response => response.json())
	.then(students => {
		students.forEach(student => addStudentToTable(student));
	})
	.catch(error => console.error(error));
}

// Add event listeners
listAllButton.addEventListener("click", populateTable);
addButton.addEventListener("click", addStudent);
