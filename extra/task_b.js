const calculateBMI = () => {
    const massInput = document.getElementById("mass");
    const heightInput = document.getElementById("height");
    const resultDiv = document.getElementById("result");
    const errorMessageDiv = document.getElementById("error-message");
    const progressBar = document.getElementById("progress-bar");
    const indicator = document.getElementById("indicator");

    const mass = Number(massInput.value);
    const height = Number(heightInput.value) / 100;

    if (isNaN(mass) || isNaN(height)) {
      resultDiv.innerHTML = "";
      errorMessageDiv.innerHTML = "Please enter valid values for mass and height.";
      indicator.style.top = "0%";
      return;
    }

    if (mass < 2 || mass > 250 || height < 0.25 || height > 3) {
      resultDiv.innerHTML = "";
      errorMessageDiv.innerHTML = "Please enter valid values for mass and height.";
      indicator.style.top = "0%";
      return;
    }

    const bmi = mass / (height * height);
    resultDiv.innerHTML = `Your BMI is ${bmi.toFixed(2)}.`;

    if (bmi > 24.9) {
      progressBar.style.background = "linear-gradient(to top, red 0%, red 100%)";
      indicator.style.top = "0%";
    } else if (bmi > 18.5) {
      progressBar.style.background = "linear-gradient(to top, green 0%, green 100%)";
      indicator.style.top = "50%";
    } else {
      progressBar.style.background = "linear-gradient(to top, red 0%, red 100%)";
      indicator.style.top = "100%";
    }

    errorMessageDiv.innerHTML = "";
  };

  const calculateBtn = document.getElementById("calculate-btn");
  calculateBtn.addEventListener("click", calculateBMI);
