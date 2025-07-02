let $ = document;
const firstnameInput = $.querySelector("#firstname");
const lastnameInput = $.querySelector("#lastname");
const emailInput = $.querySelector("#email");
const passwordInput = $.querySelector("#password");
const loginForm = $.querySelector("#login-form");
const errorFnMessage = $.querySelector("#errorFnMessage");
const errorLnMessage = $.querySelector("#errorLnMessage");
const errorEmailMessage = $.querySelector("#errorEmailMessage");
let submitted = false;
loginForm.addEventListener("submit", (e) => {
	submitted = true;
	e.preventDefault();
	let newUserInfo = {
		firstname: firstnameInput.value,
		lastname: lastnameInput.value,
		email: emailInput.value,
		password: passwordInput.value,
	};
	fetch("http://localhost:3000/api/users", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(newUserInfo),
	})
		.then((res) => {
			res.json();
		})
		.then((data) => {
			console.log(data);
			emptyValue();
		});
});
function emptyValue() {
	firstnameInput.value = "";
	lastnameInput.value = "";
	emailInput.value = "";
	passwordInput.value = "";
}
//////////////////////////////////
// firstname valid

function firstnameValid(value) {
	const regexFirstName = /[a-zA-Zا-ی]{3,}/g;
	return regexFirstName.test(value);
}
firstnameInput.addEventListener("change", (e) => {
	const value = e.target.value;
	console.log(value);
	if (value.length >= 1 && !firstnameValid(value)) {
		console.log("error");
		errorFnMessage.classList.remove("hidden");
		errorFnMessage.innerHTML = `نام شما باید حداقل 3 کاراکتر و از حروف فارسی یا انگلیسی استفاده شود.`;
	} else {
		errorFnMessage.classList.add("hidden");
	}
	if (submitted && value.length === 0) {
		errorFnMessage.innerHTML = `لطفا نام خود را وارد کنید.`;
		errorFnMessage.classList.remove("hidden");
	}
});

// lastname valid
function lastnameValid(value) {
	const regexLastName = /[a-zA-Zا-ی]{3,}/g;
	return regexLastName.test(value);
}
lastnameInput.addEventListener("change", (e) => {
	const value = e.target.value;
	console.log(value);
	if (value.length >= 1 && !lastnameValid(value)) {
		console.log("error");
		errorLnMessage.classList.remove("hidden");
		errorLnMessage.innerHTML = `نام خانوادگی شما باید حداقل 3 کاراکتر و از حروف فارسی یا انگلیسی استفاده شود.`;
	} else {
		errorLnMessage.classList.add("hidden");
	}
	if (submitted && value.length === 0) {
		errorLnMessage.innerHTML = `لطفا نام خانوادگی خود را وارد کنید.`;
		errorLnMessage.classList.remove("hidden");
	}
});

// email valid

function emailValid(value) {
	const regexEmail = /\w{3,}@gmail.com/g;
	return regexEmail.test(value);
}
emailInput.addEventListener("change", (e) => {
	const value = e.target.value;
	console.log(value);
	if (value.length > 0 && !emailValid(value)) {
		console.log("error");
		errorEmailMessage.classList.remove("hidden");
		errorEmailMessage.innerHTML = `لطفا یک ایمیل معتبر وارد کنید.`;
	} else {
		errorEmailMessage.classList.add("hidden");
	}
	if (submitted && value.length === 0) {
		errorLnMessage.innerHTML = `لطفا نام خانوادگی خود را وارد کنید.`;
		errorLnMessage.classList.remove("hidden");
	}
});
