const $ = document;
const userWrapper = $.querySelector("#user-wrapper");
window.addEventListener("load", () => {
	getAllUsers();
});
let userID = null;
const deleteModal = $.querySelector("#deleteModal");
const deleteModalContent = $.querySelector("#deleteModalContent");
const coverBg = $.querySelector("#coverBg");
const acceptDeleteBtn = $.querySelector("#acceptDeleteBtn");
const deAcceptDeleteBtn = $.querySelector("#deAcceptDeleteBtn");
const editForm = $.querySelector("#edit-form");
const firstnameInput = $.querySelector("#firstname");
const lastnameInput = $.querySelector("#lastname");
const emailInput = $.querySelector("#email");
const passwordInput = $.querySelector("#password");
const editModal = $.querySelector("#editModal");
const acceptEditBtn = $.querySelector("#acceptEditBtn");
const errorFnMessage = $.querySelector("#errorFnMessage");
const errorLnMessage = $.querySelector("#errorLnMessage");
const errorEmailMessage = $.querySelector("#errorEmailMessage");
function getAllUsers() {
	fetch("http://localhost:3000/api/users/all")
		.then((res) => res.json())
		.then((users) => {
			userWrapper.innerHTML = "";
			users.forEach((user) => {
				userWrapper.insertAdjacentHTML(
					"beforeend",
					`<div class="flex items-start justify-between p-5 m-5 bg-gray-100 rounded-lg">
					<div class="text-zinc-900">
						<div class="flex items-center gap-5 mb-4">
							<div
								class="border-2 size-12 flex justify-center items-center rounded-full"
							>
								<svg class="size-10"><use href="#user"></use></svg>
							</div>
							<div>
								<div class="flex items-center gap-2">
									<span>نام :</span>
									<h2>${user.firstname}</h2>
								</div>
								<div class="flex items-center gap-2">
									<span>نام خانوادگی :</span>
									<h2>${user.lastname}</h2>
								</div>
								<div class="flex items-center gap-2">
									<span>ایمیل :</span>
									<p>${user.email}</p>
								</div>
							</div>
						</div>
					</div>
					<div class="flex flex-col gap-2 text-white">
						<button
							class="bg-red-700 h-8 w-20 rounded-full flex justify-center items-center cursor-pointer transition-colors hover:bg-red-800 outline-0 border-0"
							onclick=showDeleteModal(${user.id})
						>
							حذف
						</button>
						<button
							class="bg-blue-500 h-8 w-20 rounded-full flex justify-center items-center cursor-pointer transition-colors hover:bg-blue-800 outline-0 border-0"
							onclick=showEditModal(${user.id})

						>
							ویرایش
						</button>
					</div>
				</div>`
				);
			});
		});
}
// delete modal start
function showDeleteModal(id) {
	userID = id;
	console.log(userID);
	deleteModal.classList.replace("hidden", "flex");
	deleteModal.classList.remove("opacity-0");
	deleteModal.classList.add("opacity-100");
	coverBg.classList.remove("hidden");
}
function hideDeleteModal() {
	deleteModal.classList.replace("flex", "hidden");
	deleteModal.classList.add("opacity-0");
	deleteModal.classList.remove("opacity-100");
	coverBg.classList.add("hidden");
}
deAcceptDeleteBtn.addEventListener("click", hideDeleteModal);
acceptDeleteBtn.addEventListener("click", removeUser);
function removeUser() {
	fetch(`http://localhost:3000/api/users/remove/${userID}`, {
		method: "DELETE",
	})
		.then((res) => res.json())
		.then((data) => {
			console.log(data);
			hideDeleteModal();
			getAllUsers();
		});
}
// delete modal end

// edit modal start
function showEditModal(id) {
	userID = id;
	console.log(userID);
	editModal.classList.replace("hidden", "flex");
	editModal.classList.add("opacity-100");
	coverBg.classList.remove("hidden");
}
function hideEditModal() {
	editModal.classList.replace("flex", "hidden");
	editModal.classList.add("opacity-0");
	coverBg.classList.add("hidden");
}
acceptEditBtn.addEventListener("click", () => {
	let newUserInfo = {
		firstname: firstnameInput.value,
		lastname: lastnameInput.value,
		email: emailInput.value,
		password: passwordInput.value,
	};
	fetch(`http://localhost:3000/api/users/edit/${userID}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(newUserInfo),
	})
		.then((res) => res.json())
		.then((data) => {
			hideEditModal();
			getAllUsers();
			emptyInputs();
		});
});
editForm.addEventListener("submit", (e) => {
	e.preventDefault();
});

// window code

window.addEventListener("click", (e) => {
	// console.log(e.target);
	if (e.target.id === "coverBg") {
		hideDeleteModal();
		hideEditModal();
	}
});
function emptyInputs() {
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
