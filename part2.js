const form = document.querySelector(".registration-form");
const inputs = document.querySelectorAll(".form-field input, .form-field select");
const submitButton = document.querySelector(".submit-button");

if (form && submitButton) {
  const messages = {
    "first-name": {
      valueMissing: "Please enter your first name.",
      patternMismatch: "Please enter letters only."
    },
    "last-name": {
      valueMissing: "Please enter your last name.",
      patternMismatch: "Please enter letters only."
    },
    "birth-date": {
      valueMissing: "Please enter your date of birth.",
      rangeOverflow: "Student must be at least 16 years old."
    },
    college: {
      valueMissing: "Please choose a college."
    },
    major: {
      valueMissing: "Please choose a major."
    },
    phone: {
      valueMissing: "Please enter your phone number.",
      patternMismatch: "Please enter exactly 10 digits."
    },
    email: {
      valueMissing: "Please enter your email address.",
      typeMismatch: "Please enter a valid email address."
    },
    guests: {
      valueMissing: "Please enter the number of guests.",
      rangeUnderflow: "Please enter a number of at least 1."
    }
  };

  function getErrorMessage(input) {
    const inputMessages = messages[input.id];

    for (const rule in inputMessages) {
      if (input.validity[rule]) {
        return inputMessages[rule];
      }
    }

    return "";
  }

  function validateInput(input) {
    const field = input.parentElement;
    const errorMessage = input.nextElementSibling;
    const valid = input.checkValidity();

    input.classList.toggle("is-invalid", !valid);
    field.classList.toggle("show-error", !valid);
    errorMessage.textContent = valid ? "" : getErrorMessage(input);

    return valid;
  }

  function updateSubmitButton() {
    submitButton.disabled = !Array.from(inputs).every((input) => input.checkValidity());
  }

  function handleInput(event) {
    validateInput(event.target);
    updateSubmitButton();
  }

  inputs.forEach((input) => {
    input.addEventListener("input", handleInput);
    input.addEventListener("change", handleInput);
  });

  form.addEventListener("submit", (event) => {
    let firstInvalidInput = null;

    inputs.forEach((input) => {
      if (!validateInput(input) && !firstInvalidInput) {
        firstInvalidInput = input;
      }
    });

    if (firstInvalidInput) {
      event.preventDefault();
      firstInvalidInput.focus();
    }
  });

  form.addEventListener("reset", () => {
    setTimeout(() => {
      inputs.forEach((input) => {
        input.classList.remove("is-invalid");
        input.parentElement.classList.remove("show-error");
        input.nextElementSibling.textContent = "";
      });

      submitButton.disabled = true;
    }, 0);
  });

  updateSubmitButton();
}
