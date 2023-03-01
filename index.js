const form = document.getElementById("registration-form");
const tableBody = document.getElementById("entries-table-body");

// Load entries from local storage
const entries = JSON.parse(localStorage.getItem("entries")) || [];
for (const entry of entries) {
  const newRow = tableBody.insertRow();
  const nameCell = newRow.insertCell();
  const emailCell = newRow.insertCell();
  const passwordCell = newRow.insertCell();
  const dobCell = newRow.insertCell();
  const acceptedTermsCell = newRow.insertCell();
  nameCell.textContent = entry.name;
  emailCell.textContent = entry.email;
  passwordCell.textContent = entry.password;
  dobCell.textContent = entry.dob;
  acceptedTermsCell.textContent = entry.acceptedTerms;
}

form.addEventListener("submit", (event) => {
  event.preventDefault(); // stop form submission
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const dob = document.getElementById("dob").value;
  const acceptedTerms = document.getElementById("accepted-terms").checked;

  if (!name || !email || !password || !dob || !acceptedTerms) {
    alert("Please fill in all the fields.");
    return false;
  }

  const dobDate = new Date(dob);
  const dobYear = dobDate.getFullYear();
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const age = currentYear - dobYear;
  if (age < 18 || age > 55) {
    alert("You must be between 18 and 55 years old to register.");
    return false;
  }

  // Check if email is valid
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.match(emailRegex)) {
    alert("Please enter a valid email address.");
    return false;
  }

  const entry = { name, email, password, dob, acceptedTerms };

  // Add new entry to the table
  const newRow = tableBody.insertRow();
  const nameCell = newRow.insertCell();
  const emailCell = newRow.insertCell();
  const passwordCell = newRow.insertCell();
  const dobCell = newRow.insertCell();
  const acceptedTermsCell = newRow.insertCell();
  nameCell.textContent = name;
  emailCell.textContent = email;
  passwordCell.textContent = password;
  dobCell.textContent = dob;
  acceptedTermsCell.textContent = acceptedTerms;

  // Add new entry to local storage
  entries.push(entry);
  localStorage.setItem("entries", JSON.stringify(entries));

  form.reset();

  return false;
});
