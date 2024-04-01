const form = document.getElementById('myForm');
const errorsContainer = document.getElementById('errors');

form.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent default form submission

  errorsContainer.innerHTML = ''; // Clear any previous errors

  let isValid = true;
  const errorMessage = [];

  const username = document.getElementById('username').value;
  const accountNumber = document.getElementById('accountNumber').value;
  const phoneNumber = document.getElementById('phoneNumber').value;

  // Check if all fields are filled
  if (!username || !accountNumber || !phoneNumber) {
    errorMessage.push('Please fill out all required fields.');
    isValid = false;
  }

  // Validate Account Number (numeric only)
  if (!/^\d+$/.test(accountNumber)) {
    errorMessage.push('Account Number must be numeric only.');
    isValid = false;
  }

  // Validate Phone Number (basic check for numbers and hyphens)
  if (!/^\d+\-?\d+$/.test(phoneNumber)) {
    errorMessage.push('Phone Number must be numeric and can contain hyphens (-).');
    isValid = false;
  }

  // Display errors if any
  if (!isValid) {
    errorsContainer.innerHTML = '<ul><li>' + errorMessage.join('</li><li>') + '</li></ul>';
  } else {
    // Form is valid, submit the form (redirect to another page)
    console.log('Form is valid! Submitting...');
    window.location.href = "two.html"; // Replace with your success page URL
  }
});
