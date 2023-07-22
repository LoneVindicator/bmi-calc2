console.log("js running");

const heightEl = document.getElementById("height");
const weightEl = document.getElementById("weight");
const ageEl = document.getElementById("age");
const outputText = document.getElementById("output-text");
const outputCommentText = document.getElementById("output-comment-text");

const calculateButton = document.getElementById("calculate-btn")


calculateButton.addEventListener("click", function () {

  const age = ageEl.value;

    console.log(`(${weightEl.value})^2`)

    const bmi = (weightEl.value) / [(heightEl.value / 100) ^ 2]
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

    saveBMIToJSON(bmi, age)
})

function saveBMIToJSON(bmi, age) {

  const data = {
    age: age,
    bmi: bmi,
  };

  console.log(data)

  // Make an AJAX POST request to the server
  fetch('/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
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

