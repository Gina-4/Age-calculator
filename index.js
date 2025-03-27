document.addEventListener("DOMContentLoaded", () => {
  const elements = {
    inputs: {
      day: document.getElementById("day"),
      month: document.getElementById("month"),
      year: document.getElementById("year")
    },
    titles: {
      day: document.querySelector('.input-container:nth-child(1) .date-title'),
      month: document.querySelector('.input-container:nth-child(2) .date-title'),
      year: document.querySelector('.input-container:nth-child(3) .date-title')
    },
    errors: {
      day: document.querySelector(".error-day"),
      month: document.querySelector(".error-month"),
      year: document.querySelector(".error-year")
    },
    outputs: {
      years: document.querySelector(".output-years"),
      months: document.querySelector(".output-months"),
      days: document.querySelector(".output-days")
    },
    submitBtn: document.querySelector(".submit-btn")
  };

  elements.submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    resetErrors();

    const inputs = {
      day: parseInt(elements.inputs.day.value),
      month: parseInt(elements.inputs.month.value),
      year: parseInt(elements.inputs.year.value)
    };

    if (validateInputs(inputs)) {
      calculateAndDisplayAge(inputs);
    }
  });

  function resetErrors() {
    // Clear error 
    Object.values(elements.errors).forEach(error => error.textContent = "");
    
    // Remove red styling
    Object.values(elements.inputs).forEach(input => {
      input.style.borderColor = ''; 
      input.style.borderWidth = ''; 
      input.style.borderStyle = ''; 
    });

    Object.values(elements.titles).forEach(title => {
      title.style.color = ''; 
    });
  }

  function validateInputs({ day, month, year }) {
    const currentYear = new Date().getFullYear();
    let isValid = true;

    // 
    Object.entries(elements.inputs).forEach(([key, input]) => {
      if (!input.value) {
        elements.errors[key].textContent = "This field is required";
        input.style.borderColor = 'red';
        input.style.borderWidth = '2px';
        input.style.borderStyle = 'solid';
        
        // Turns title red
        elements.titles[key].style.color = 'red';
        
        isValid = false;
      }
    });

    // amounts
    const validations = [
      { input: day, min: 1, max: 31, element: elements.inputs.day, title: elements.titles.day, error: elements.errors.day, message: "Must be a valid day" },
      { input: month, min: 1, max: 12, element: elements.inputs.month, title: elements.titles.month, error: elements.errors.month, message: "Must be a valid month" },
      { input: year, min: 1900, max: currentYear, element: elements.inputs.year, title: elements.titles.year, error: elements.errors.year, message: "Must be in the past" }
    ];

    validations.forEach(({ input, min, max, element, title, error, message }) => {
      if (input < min || input > max) {
        error.textContent = message;
        element.style.borderColor = 'red';
        element.style.borderWidth = '2px';
        element.style.borderStyle = 'solid';
        
        // Turn title red
        title.style.color = 'red';
        
        isValid = false;
      }
    });

    // red error on button
    if (isValid && !isValidDate(day, month, year)) {
      elements.errors.day.textContent = "Invalid date";
      elements.inputs.day.style.borderColor = 'red';
      elements.inputs.day.style.borderWidth = '2px';
      elements.inputs.day.style.borderStyle = 'solid';
      
      // red words
      elements.titles.day.style.color = 'red';
      
      isValid = false;
    }

    return isValid;
  }

  function isValidDate(day, month, year) {
    const date = new Date(year, month - 1, day);
    return (
      date.getFullYear() === year &&
      date.getMonth() === month - 1 &&
      date.getDate() === day
    );
  }

  function calculateAndDisplayAge({ day, month, year }) {
    const today = new Date();
    const birthDate = new Date(year, month - 1, day);

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    // calculations if birthday hasn't happened
    if (months < 0 || (months === 0 && days < 0)) {
      years--;
      months += 12;
    }

    // 
    if (days < 0) {
      const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += lastMonth.getDate();
      months--;
    }

    // results
    elements.outputs.years.textContent = years;
    elements.outputs.months.textContent = months;
    elements.outputs.days.textContent = days;
  }
});