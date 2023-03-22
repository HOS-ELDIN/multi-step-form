// sections combined
let sections = document.querySelectorAll("section");
// steps compined
let steps = document.querySelectorAll("ul li > span");

// buttons
let nextStep = document.querySelector(".next");
let goBack = document.querySelector(".go-back");

// step number
let stepNumber = 0;

//! step 1 variables
let errors = document.querySelectorAll(".error");
let inputs = document.querySelectorAll(".one input");
let inputsCheckState = false;

let faults = 0;
let regexObject = {
	1: {
		regex: /^(\w{3,})\s(\w{3,})/i,
		errorMessage: "enter first & last name",
	},
	2: {
		regex: /^.+@\w+\.\w{1,3}$/i,
		errorMessage: "enter a valid E-mail",
	},
	3: {
		regex: /^\d{9,11}$/i,
		errorMessage: "enter a valid phone number",
	},
};

//! step 2 variables
let cards = document.querySelectorAll(".card");
let plansPrices = document.querySelectorAll(".card .price");
let intervalToggle = document.getElementById("interval-toggle");
let interval = "monthly";
let intervalShort = document.querySelectorAll(".mo-yr");
let intervallong = document.querySelectorAll(".month-year");
let intervalLy = document.querySelectorAll(".monthly-yearly");
// prices collection
// prices compined
let pricesCompined = document.querySelectorAll(".price");
// plans prices
let arcadePrice = document.querySelector(".arcade.price");
let advancedPrice = document.querySelector(".advanced.price");
let proPrice = document.querySelector(".pro.price");
let extra = document.querySelectorAll(".extra");

//! step 3 variables
let addOns = document.querySelectorAll("section.three .holder label");
let addOnsInputs = document.querySelectorAll(
	"section.three .holder label input"
);
// add-on prices
// compined
let addOnsPrices = document.querySelectorAll("section.three .price");
// each
let onlinePrice = document.querySelector(".online.price");
let storagePrice = document.querySelector(".storage.price");
let profilePrice = document.querySelector(".profile.price");

//! step 4 variables
//summary object
let summary = {
	userName: "",
	userEmail: "",
	userPhone: "",
	planName: "",
	planePrice: "",
	addons: {
		1: {
			state: "false",
			price: "",
		},
		2: {
			state: "false",
			price: "",
		},
		3: {
			state: "false",
			price: "",
		},
	},
};
let total;
// page content
let pagePlanName = document.querySelector(".plan-name");
let pagePlanPrice = document.querySelector(".plan-price");
let pageAddOns = document.querySelectorAll(".summary-add-on");
let summaryAddOnPrices = document.querySelectorAll(".summary-addon-price");
let pageTotalPrice = document.querySelector(".total-price");

// change button
let changeButton = document.querySelector(".change-button");

// ! start coding
//! mangae pages
// clicking on next
nextStep.addEventListener("click", () => {
	checkInputFields();
	if (inputsCheckState) {
		forward();
		buttonsVisibility();
		manageStepsActiveState();
		appendSummaryContent();
	}
});
// clicking on go back
goBack.addEventListener("click", () => {
	backword();
	buttonsVisibility();
	manageStepsActiveState();
});
// go to the selected step
function goToSection(stepNumber) {
	sections.forEach((section) => {
		section.classList.add("hidden");
	});
	sections[stepNumber].classList.remove("hidden");
}
// go to next step
function forward() {
	stepNumber++;
	goToSection(stepNumber);
}
// back to previous step
function backword() {
	stepNumber--;
	goToSection(stepNumber);
}
// manage buttons visibility
function buttonsVisibility() {
	// go back button
	if (stepNumber > 0 && stepNumber < 4) {
		goBack.classList.remove("hidden");
	} else {
		goBack.classList.add("hidden");
	}
	// next step button
	if (stepNumber > 3) {
		nextStep.classList.add("hidden");
	}
	// change text to confirm and hover color by add class confirm
	if (stepNumber > 2) {
		nextStep.innerHTML = "Confirm";
		nextStep.classList.add("confirm");
	} else {
		nextStep.innerHTML = "Next Step";
		nextStep.classList.remove("confirm");
	}
}
// manage active state
function manageStepsActiveState() {
	sections.forEach((section, i) => {
		if (section.classList.contains("hidden")) {
			if (i < steps.length) {
				steps[i].classList.remove("active");
			}
		} else {
			if (i < steps.length) {
				steps[i].classList.add("active");
			}
		}
	});
}

//!step one
// check validation status

// dynamic check during input
inputs.forEach((input, i) => {
	input.onblur = () => {
		inputRegexCheck(
			regexObject[i + 1].regex,
			i,
			regexObject[i + 1].errorMessage
		);
	};
	input.onfocus = () => {
		errors[i].classList.add("hidden");
	};
});

// do all checks and manage check state
function checkInputFields() {
	faults = 0;
	emptyCheck();
	regexCheck();

	if (faults == 0) {
		inputsCheckState = true;
	} else {
		inputsCheckState = false;
	}
}

// check if input is empty
function emptyCheck() {
	inputs.forEach((input, i) => {
		// empty check
		if (input.value === "") {
			input.setAttribute("required", "");
			errors[i].classList.remove("hidden");
			errors[i].innerHTML = "this field is requried";
			faults++;
		} else {
			input.removeAttribute("required");
			errors[i].classList.add("hidden");
		}
	});
}

// loop on inputs to check
function regexCheck() {
	inputs.forEach((input, i) => {
		inputRegexCheck(
			regexObject[i + 1].regex,
			i,
			regexObject[i + 1].errorMessage
		);
	});
}
// function to check the a selected input
function inputRegexCheck(regex, i, errorMessage) {
	if (inputs[i].value !== "") {
		if (regex.test(inputs[i].value) == false) {
			inputs[i].setAttribute("required", "");
			inputs[i].classList.remove("good");
			errors[i].classList.remove("hidden", "valid");
			errors[i].innerHTML = errorMessage;
			faults++;
		} else {
			inputs[i].removeAttribute("required");
			inputs[i].classList.add("good");
			errors[i].classList.remove("hidden");
			errors[i].classList.add("valid");
			errors[i].innerHTML = "ok";
		}
	}
}

//! step two
// manage cards activity
cards.forEach((card, i) => {
	card.addEventListener("click", () => {
		cards.forEach((e) => {
			e.classList.remove("active");
		});
		// console.log(cards[i]);
		cards[i].classList.add("active");
	});
});

// manage content month or year
// interval toggle
intervalToggle.onclick = () => {
	manageInterval(intervalToggle.checked);
	changePricesOnInterval(interval);
};

// manage interval state
function manageInterval(checkState) {
	if (checkState === true) {
		interval = "yearly";
		intervalShort.forEach((e) => {
			e.innerHTML = "yr";
		});
		intervallong.forEach((e) => {
			e.innerHTML = "year";
		});
		intervalLy.forEach((e) => {
			e.innerHTML = "yearly";
		});
	} else {
		interval = "monthly";
		intervalShort.forEach((e) => {
			e.innerHTML = "mo";
		});
		intervallong.forEach((e) => {
			e.innerHTML = "month";
		});
		intervalLy.forEach((e) => {
			e.innerHTML = "monthly";
		});
	}
}

// function to change page content
changePricesOnInterval(interval);
function changePricesOnInterval(interval) {
	if (interval === "yearly") {
		pricesCompined.forEach((e) => {
			e.innerHTML *= 10;
		});
		extra.forEach((e) => {
			e.classList.remove("hidden");
		});
	} else if (interval === "monthly") {
		// plans prices
		arcadePrice.innerHTML = 9;
		advancedPrice.innerHTML = 12;
		proPrice.innerHTML = 15;
		extra.forEach((e) => {
			e.classList.add("hidden");
		});

		// add-on prices
		onlinePrice.innerHTML = 1;
		storagePrice.innerHTML = 2;
		profilePrice.innerHTML = 2;
	}
}

//! step 3
// manage add-ons activity
addOns.forEach((addOn, i) => {
	addOn.addEventListener("click", (clicked) => {
		if (addOnsInputs[i].checked) {
			addOns[i].classList.toggle("active");
		}
	});
});

//! step 4
// build summary
function buildSummaryObject() {
	// add user data to summary object
	summary.userName = inputs[0].value;
	summary.userEmail = inputs[1].value;
	summary.userPhone = inputs[2].value;

	//get plan name and plan price from selection
	let activePlan = document.querySelector(".card.active");
	let activePlanPrice = document.querySelector(".card.active .price");
	if (activePlan != null) {
		//add plan name and plan price to summary object
		summary.planName = activePlan.dataset.plan;
		summary.planePrice = activePlanPrice.innerHTML;
	}

	// add addon state and price to summary object
	for (let i = 0; i < addOns.length; i++) {
		// add addon state to summary object
		summary.addons[i + 1].state = addOns[i].classList.contains("active")
			? true
			: false;
		// add addon price to summary object
		summary.addons[i + 1].price = addOnsPrices[i].innerHTML;
	}

	console.log(summary);
}
//calculating total
function calculateTotal() {
	// calculate total
	let optionOnePrice = summary.addons[1].state ? summary.addons[1].price : 0;
	let optiontwoPrice = summary.addons[2].state ? summary.addons[2].price : 0;
	let optionthreePrice = summary.addons[3].state ? summary.addons[3].price : 0;
	total =
		parseInt(summary.planePrice) +
		parseInt(optionOnePrice) +
		parseInt(optiontwoPrice) +
		parseInt(optionthreePrice);

	// add total to summary
	summary.total = total;
}

function appendSummaryContent() {
	buildSummaryObject();
	calculateTotal();

	// add content to page
	//add plan name and price
	pagePlanName.innerHTML = summary.planName;
	pagePlanPrice.innerHTML = summary.planePrice;

	// manage add ons on summary page
	for (let i = 0; i < addOns.length; i++) {
		// add on state
		summary.addons[i + 1].state
			? pageAddOns[i].classList.remove("hidden")
			: pageAddOns[i].classList.add("hidden");
		// add on price
		summaryAddOnPrices[i].innerHTML = summary.addons[i + 1].price;
	}

	// add total to page
	pageTotalPrice.innerHTML = summary.total;
}
// manage change button click
changeButton.addEventListener("click", () => {
	stepNumber = 1;
	goToSection(stepNumber);
	buttonsVisibility();
	manageStepsActiveState();
});
