//dom elements
const currencyElementOne = document.querySelector("#currency-one");
const amountElementOne = document.querySelector("#amount-one");
const currencyElementTwo = document.querySelector("#currency-two");
const amountElementTwo = document.querySelector("#amount-two");
const rateElement = document.querySelector(".rate");
const swap = document.querySelector(".btn");
const update = document.querySelector(".update")

//Fetch Exchange rate & update DOM
const calculate = () => {
	const currencyOneValue = currencyElementOne.value;
	const currencyTwoValue = currencyElementTwo.value;

	fetch(`https://api.exchangerate-api.com/v4/latest/${currencyOneValue}`)
		.then(res => res.json())
		.then(data => {
			const rate = data.rates[currencyTwoValue];
			rateElement.innerText = `1 ${currencyOneValue} = ${rate} ${currencyTwoValue}`;

			amountElementTwo.value = (amountElementOne.value * rate).toFixed(2);

			update.innerHTML = `<p>Last updated at: ${data.date}</p>`
		});
};

//event listerns
currencyElementOne.addEventListener("change", calculate);
amountElementOne.addEventListener("input", calculate);
currencyElementTwo.addEventListener("change", calculate);
amountElementTwo.addEventListener("input", calculate);

swap.addEventListener("click", () => {
	const tempCurrency = currencyElementOne.value;
	currencyElementOne.value = currencyElementTwo.value;
	currencyElementTwo.value = tempCurrency;

	calculate()
})