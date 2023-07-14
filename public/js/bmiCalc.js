console.log("js running");

const height = document.getElementById("height");
const weight = document.getElementById("weight");
const outputText = document.getElementById("output-text");
const outputCommentText = document.getElementById("output-comment-text");

const calculateButton = document.getElementById("calculate-btn")


calculateButton.addEventListener("click", function () {

    console.log(`(${weight.value})^2`)

    const bmi = (weight.value) / [(height.value / 100) ^ 2]
    let category = "";

    if (bmi < 18.5) {
        category = 'Underweight';
    } else if (bmi >= 18.5 && bmi < 25) {
        category = 'Normal weight';
    } else if (bmi >= 25 && bmi < 30) {
        category = 'Overweight';
    } else {
        category = 'Obese';
    }

    outputText.innerText = `Your BMI is : ${bmi}`
    outputCommentText.innerText = `You are ${category}`

    saveBMIToJSON(bmi);
})

function saveBMIToJSON(bmi) {
  const data = {
    bmi,
    timestamp: new Date().toISOString()
  };

  // Make an AJAX POST request to the server
  fetch('/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => {
      if (response.ok) {
        console.log('BMI data saved successfully!');
      } else {
        console.error('Error saving BMI data:', response.status);
      }
    })
    .catch(error => {
      console.error('Error saving BMI data:', error);
    });
}
