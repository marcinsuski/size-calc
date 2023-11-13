import { bra } from "./sizes.js";

/**
 * Sanitizes the input, safeguards against malicious code and validates the input.
 * @param {number|string} userInput The input to be sanitized and validated
 * @returns {number} a number or 0 in case of empty string or not a number
 */
function sanitizeAndValidateInput(userInput) {
	if (userInput === "") {
		return 0;
	}
	const sanitizedInput = userInput.replace(/['";:]/g, "").trim(); //trim whites and uses regex to clear any malitious characters
	const numericInput = sanitizedInput.replace(",", "."); // if user provides a number with ',' it is changed into '.' which is understood by javascript as a float number
	return !isNaN(numericInput) ? parseFloat(numericInput) : 0;
}

/**
 * Calculates the size of garments based on measurements
 * @param {string} array Type of garment = name of array of sizes.
 * @param {number} measure1 first measurement
 * @param {number} measure2 second measurement
 * @returns {number|string} size of garment
 *
 */
function findSize(sizesArray, measure1, measure2) {
	if (!sizesArray) {
		console.log("No sizes array provided.");
		return -1;
	}
	const index = sizesArray.findIndex((item) => {
		const [minUnderBust, maxUnderBust] = item.underBust; // a range of min and max values assigned to a given size
		const [minBust, maxBust] = item.Bust;
		return (
			measure1 >= minUnderBust &&
			measure1 <= maxUnderBust &&
			measure2 >= minBust &&
			measure2 <= maxBust
		);
	});

	return index !== -1 ? sizesArray[index].size : -1;
}

let firstMeasure = document.getElementById("first_measure");
let secondMeasure = document.getElementById("second_measure");
const calculateBtn = document.getElementById("calc_size_btn");
const result = document.querySelector(".result");

const findSize = () => {
	let first_measure = sanitizeAndValidateInput(firstMeasure.value);
	let second_measure = sanitizeAndValidateInput(secondMeasure.value);
	const braSize = findSize(bra, first_measure, second_measure);
	braSize !== -1
		? (result.innerHTML = `Twój rozmiar stanika to: ${braSize}`)
		: (result.innerHTML = `Nie posiadamy stanika w takim rozmiarze.`);
};

calculateBtn.addEventListener("click", findSize);
