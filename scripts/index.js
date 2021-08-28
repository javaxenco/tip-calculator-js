// input selectors
const inputs = document.querySelectorAll("input[type='number']");
const customInput = document.querySelector(".custom");

//amount
const amount = document.querySelectorAll(".amount");
let tipAmount = amount[0];
let totalAmount = amount[1];

//button
const resetButton = document.querySelector(".reset-button");

//radio
const radios = document.querySelectorAll(".radio-wrapper");

customInput.addEventListener("input", () => {
  radios.forEach((el) => {
    el.classList.remove("active");
  });
});

radios.forEach((el) => {
  el.addEventListener("click", () => {
    radios.forEach((el) => {
      el.classList.remove("active");
    });

    el.classList.add("active");
    inputs[1].value = el.firstElementChild.value;
    recalculate();
  });
});

inputs.forEach((el) => {
  el.addEventListener("input", function () {
    if (el.value.trim() == "" || el.value <= 0) {
      el.classList.remove("correct");
      el.classList.add("incorrect");
      resetButton.classList.add("disabled");
      return;
    }

    el.classList.remove("incorrect");
    el.classList.add("correct");

    recalculate();
  });
});

function recalculate() {
  const bill = +inputs[0].value;
  const tip = +inputs[1].value;
  const people = +inputs[2].value;

  let validator = true;

  tips = (bill * (tip / 100)) / people;
  tips = Math.round(tips * 100) / 100;

  total = (bill + bill * (tip / 100)) / people;
  total = Math.round(total * 1000) / 1000;

  inputs.forEach((el) => {
    if (el.value.trim() == "" || el.value <= 0) {
      validator = false;
    }
  });

  if (validator) {
    resetButton.classList.remove("disabled");
    tipAmount.textContent = `$${tips}`;
    totalAmount.textContent = `$${total}`;
  }
}

resetButton.addEventListener("click", () => {
  tipAmount.textContent = 0;
  totalAmount.textContent = 0;

  radios.forEach((el) => {
    el.classList.remove("active");
  });

  inputs.forEach((el) => {
    el.value = "";
    el.classList.remove("correct");
    el.classList.remove("incorrect");
  });
});
