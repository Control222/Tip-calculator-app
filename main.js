const numberBill = document.getElementById('bill__input');
const numberPeople = document.getElementById('people__input');
const customTipInput = document.getElementById('custom__tip__input');
const totalTipPerPersonDisplay = document.querySelector('.tip__person');
const totalPricePerPersonDisplay = document.querySelector('.total__person');
const tipButtons = document.querySelectorAll('.tip__btn');
const resetButton = document.querySelector('.btn__reset');
const showError = document.querySelector('label span');

let selectedTipPercentage = 0;

// FUNCTION CALCULATE TIP AMOUNT
function calculateTipAmount(bill, tipPercentage) {
  return (bill * tipPercentage) / 100;
}

// FUNCTION CALCULATE TOTAL AMOUNT PER PERSON
function calculateTotalPerPerson(bill, people, tipAmount) {
  const totalAmount = bill + tipAmount;
  return totalAmount / people;
}

// FUNCTION NUMBER OF PEOPLE !== 0
numberPeople.addEventListener('change', () => {
  numPeople = Number(numberPeople.value);
  if (numPeople !== 0) {
    showError.classList.remove('error');
    numberPeople.classList.remove('error');
  } else {
    showError.classList.add('error');
    numberPeople.classList.add('error');
  }
});

// FUNCTION UPDATE DISPLAY
function updateDIsplay() {
  const bill = parseFloat(numberBill.value);
  const people = parseInt(numberPeople.value);

  if (isNaN(bill) || isNaN(people) || people <= 0) {
    totalTipPerPersonDisplay.textContent = '$0.00';
    totalPricePerPersonDisplay.textContent = '$0.00';
    return;
  }

  const tipAmount = calculateTipAmount(bill, selectedTipPercentage);
  const tipPerPerson = tipAmount / people;
  const totalPerPerson = calculateTotalPerPerson(bill, people, tipAmount);

  totalTipPerPersonDisplay.textContent = `$${tipPerPerson.toFixed(2)}`;
  totalPricePerPersonDisplay.textContent = `$${totalPerPerson.toFixed(2)}`;
}

// EVENT LISTENER FOR TIP BUTTONS
tipButtons.forEach((button) => {
  button.addEventListener('click', () => {
    selectedTipPercentage = parseFloat(button.value);
    customTipInput.value =
      ''; /* Clear custome tip input if a button is selected */
    updateDIsplay();
  });
});

// EVENT LISTENER FOR CUSTOM TIP INPUT
customTipInput.addEventListener('input', () => {
  selectedTipPercentage = parseFloat(customTipInput.value) || 0;
  updateDIsplay();
});

// EVENT LISTENER FOR NUMBER BILL & PEOPLE
numberBill.addEventListener('input', updateDIsplay);
numberPeople.addEventListener('input', updateDIsplay);

// EVENT LISTENER FOR RESET BUTTON
resetButton.addEventListener('click', () => {
  numberBill.value = '';
  numberPeople.value = '';
  customTipInput.value = '';
  selectedTipPercentage = 0;
  totalTipPerPersonDisplay.textContent = '$0.00';
  totalPricePerPersonDisplay.textContent = '$0.00';
});
