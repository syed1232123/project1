document.getElementById('loginForm').addEventListener('submit', async (event) => {
  event.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const response = await fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  });

  const data = await response.json();
  console.log(data);

  if (response.ok) {
    // Show the success login alert
    const successAlert = document.querySelector('.loginsuccess-alert');
    successAlert.style.display = 'block';

    // Scroll to the top of the page to ensure the alert is visible
    window.scrollTo(0, 0);

    // Set a timer to hide the success alert after 3 seconds
    setTimeout(() => {
      successAlert.style.display = 'none';
      // Redirect to page2.html after successful login
      window.location.href = 'page2.html';
    }, 1000); // 3000 milliseconds = 3 seconds
  } else {
    // Show the custom login alert
    const loginAlert = document.querySelector('.loginfail-alert');
    loginAlert.style.display = 'block';

    // Scroll to the top of the page to ensure the alert is visible
    window.scrollTo(0, 0);

    // Set a timer to hide the alert after 3 seconds
    setTimeout(() => {
      loginAlert.style.display = 'none';
    }, 3000); // 3000 milliseconds = 3 seconds
  }
});
