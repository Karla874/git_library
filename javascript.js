const library = document.querySelector(".stand tbody");
const bookbox = document.querySelector(".bookForm");
//Forms
const boxtitle = document.querySelector("#title");
const boxauthor = document.querySelector("#author");
const boxgenre = document.querySelector("#genre");
const boxread = document.querySelector("#read");
boxgenre.selectedIndex = 0;
boxread.selectedIndex = 0;

const myLibrary = [
	{"label":"86 Vol. 1, A War Without Casualties","author":"Asato Asato","genre":"Mecha","read":"Yes"},
	{"label":"86 Vol. 2, Run Through the Battlefront","author":"Asato Asato","genre":"Mecha","read":"No"},
	{"label":"Re:Zero Vol.1, The Waste Heat of the Beginning","author":"Tappei Nagatsuki","genre":"Fantasy","read":"No"},
	{"label":"Schindler's List","author":"Steven Zaillian","genre":"War","read":"Yes"}
];

function Book (title, author, genre, read) {
	this.label = title;
	this.author = author;
	this.genre = genre;
	this.read = read;
 }

const cambiocolor = function (color) {
	color.addEventListener("click", function() {
		if (color.style.color=="green") {
			color.innerHTML="✘"
			color.style.color="red";
		} else {
			color.innerHTML="✔"
			color.style.color="green";
		}
	});
}
const borrar = function (del) {
	del.addEventListener("click", function() {
		del.closest('tr').remove();
	});
}

const addBook = function (libro) {
	let nuevoLibro = document.createElement("tr");
	let sku = crypto.randomUUID();
	libro.id = sku;

	let valor = "";
	if (libro.read=="Yes")  {
		valor = "<td class='reading' style='color:green'>✔</td>";
	} else {
		valor = "<td class='reading' style='color:red'>✘</td>";
	}

	nuevoLibro.innerHTML = "<td><div id='deleteBook'>⨯</div>"+libro.label+"</td><td>"+libro.author+"</td><td>"+libro.genre+"</td>"+valor;
	library.appendChild(nuevoLibro);

	readStatusElement = nuevoLibro.querySelector('.reading');
	cambiocolor(readStatusElement); // Add Listener
	elementoBorrar = nuevoLibro.querySelector('#deleteBook');
	borrar(elementoBorrar);
}

myLibrary.forEach(book => addBook(book));

const displayPop = function() {
	bookbox.style.display = "block";
}
const closePop = function() {
	boxtitle.value = "";
	boxauthor.value = "";
	boxgenre.selectedIndex = "";
	boxread.selectedIndex = "";
	bookbox.style.display = "none";
}

document.getElementById("addBook").addEventListener("click", displayPop);
document.getElementById("close").addEventListener("click", closePop);
document.getElementById("addplease").addEventListener("click", function() {
	const form = document.getElementById('formulario');

	if (!form.reportValidity()) {
		event.preventDefault();  // Prevent form submission if invalid
		return; // Don't proceed if the form is not valid
	}

	let newBook = new Book(
		boxtitle.value, // title
		boxauthor.value, // author
		boxgenre.value,  // genre
		boxread.value    // read status
	);
	addBook(newBook); // Add the new book to the library
	
	closePop(); // Close the form and reset fields
});