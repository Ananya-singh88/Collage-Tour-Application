// Base URL for the backend API
const BASE_URL = 'http://localhost:5000/api';

// Function to show/hide sections
function showUniversity(university) {
    document.querySelectorAll('section').forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById(university).style.display = 'block';
    document.querySelector('.back-btn').style.display = 'block';
}

function hideUniversity(university) {
    document.getElementById(university).style.display = 'none';
    document.querySelector('.back-btn').style.display = 'none';
}

function showHome() {
    document.querySelectorAll('section').forEach(section => {
        section.style.display = 'none';
    });
    document.querySelector('.landing-page').style.display = 'block';
    document.querySelector('.back-btn').style.display = 'none';
}

function showEvents() {
    // Fetch and display events dynamically
    fetch(`${BASE_URL}/events`)
        .then(response => response.json())
        .then(data => {
            const eventsHtml = data.map(event => `
                <div class="event">
                    <h3>${event.name}</h3>
                    <p>${event.description}</p>
                    <p>Date: ${event.date}</p>
                </div>
            `).join('');
            document.getElementById('search-results').innerHTML = eventsHtml;
            document.getElementById('search-results').style.display = 'block';
        });
        // Function to show Admin Login Popup
function showAdminLogin() {
      document.getElementById('admin-login').style.display = 'block';
      document.getElementById('student-login').style.display = 'none';
  }
  
// Function to show the student login popup
function showLoginPage(userType) {
      if (userType === 'student') {
          document.getElementById("student-login").style.display = "block";
          document.getElementById("student-registration").style.display = "none";
      } else if (userType === 'admin') {
          document.getElementById("admin-login").style.display = "block";
      }
  }


// Function to show the student registration popup
function showRegistrationPage() {
      document.getElementById("student-registration").style.display = "block";
      document.getElementById("student-login").style.display = "none";
  }
  
  // Function to hide the student registration popup
  function hideRegistrationPage() {
      document.getElementById("student-registration").style.display = "none";
  }

  
  // Function to hide Login Popups
  function hideLoginPage() {
      document.getElementById('admin-login').style.display = 'none';
      document.getElementById('student-login').style.display = 'none';
  }
}

// Admin Login
async function adminLogin() {
      const username = document.getElementById('admin-username').value;
      const password = document.getElementById('admin-password').value;
  
      try {
          const response = await fetch(`${BASE_URL}/admin/login`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ username, password }),
          });
          const data = await response.json();
          if (data.success) {
              alert('Admin login successful!');
              window.location.href = 'admin-dashboard.html'; // Redirect to admin dashboard
          } else {
              alert('Invalid credentials');
          }
      } catch (error) {
          console.error('Error:', error);
          alert('Login failed');
      }
  }
  
  // Student Login
  async function studentLogin() {
      const username = document.getElementById('student-username').value;
      const password = document.getElementById('student-password').value;
  
      try {
          const response = await fetch(`${BASE_URL}/student/login`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ username, password }),
          });
          const data = await response.json();
          if (data.success) {
              alert('Student login successful!');
              window.location.href = 'student-dashboard.html'; // Redirect to student dashboard
          } else {
              alert('Invalid credentials');
          }
      } catch (error) {
          console.error('Error:', error);
          alert('Login failed');
      }
  }

// Function to register a new student
async function registerStudent() {
      const username = document.getElementById('reg-username').value;
      const password = document.getElementById('reg-password').value;
      const name = document.getElementById('reg-name').value;
      const email = document.getElementById('reg-email').value;
  
      try {
          const response = await fetch(`${BASE_URL}/student/register`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ username, password, name, email }),
          });
          const data = await response.json();
  
          if (data.success) {
              alert('Student registered successfully!');
              hideRegistrationPage();
          } else {
              alert(data.error || 'Registration failed');
          }
      } catch (error) {
          console.error('Error:', error);
          alert('Registration failed');
      }
  }

// Function to handle student login
async function studentLogin() {
      const username = document.getElementById('student-username').value;
      const password = document.getElementById('student-password').value;
  
      try {
          const response = await fetch(`${BASE_URL}/student/login`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ username, password }),
          });
          const data = await response.json();
  
          if (data.success) {
              alert('Student login successful!');
              window.location.href = 'student-dashboard.html'; // Redirect to student dashboard
          } else {
              alert('Invalid credentials');
          }
      } catch (error) {
          console.error('Error:', error);
          alert('Login failed');
      }
  }


// Popup Login Forms
function showLoginPage(type) {
    document.querySelectorAll('section').forEach(section => {
        section.style.display = 'none';
    });
    if (type === 'admin') {
        document.getElementById('admin-login').style.display = 'block';
    } else if (type === 'student') {
        document.getElementById('student-login').style.display = 'block';
    }
    document.querySelector('.back-btn').style.display = 'block';
}

function hideLoginPage() {
    document.querySelectorAll('section').forEach(section => {
        section.style.display = 'none';
    });
    document.querySelector('.back-btn').style.display = 'none';
}
// Sample Data (Replace with data fetched from your backend)
const search_data = [
      { type: 'event', name: 'Tech Fest', description: 'Annual tech festival at CMR University', date: '2023-11-15' },
      { type: 'event', name: 'Cultural Fest', description: 'Cultural festival at Reva University', date: '2023-12-10' },
      { type: 'college', name: 'CMR University', description: 'Lakeside campus with state-of-the-art infrastructure' },
      { type: 'college', name: 'Reva University', description: 'Known for excellent faculty and modern facilities' },
      { type: 'college', name: 'PES University', description: 'Renowned for engineering and management programs' },
      { type: 'college', name: 'IIT Delhi', description: 'Premier engineering institute in India' },
      { type: 'college', name: 'IIT Bombay', description: 'Cutting-edge research and innovation hub' },
  ];
  

  // Function to handle search input
  function handleSearch() {
      const query = document.getElementById('search-bar').value.toLowerCase();
      const resultsContainer = document.getElementById('search-results');
  
      if (query) {
          // Filter data based on the search query
          const filteredResults = sampleData.filter(item =>
              item.name.toLowerCase().includes(query) || item.description.toLowerCase().includes(query)
          );
  
          // Display results
          if (filteredResults.length > 0) {
              const resultsHtml = filteredResults.map(item => `
                  <div class="result-item" onclick="window.location.href='${item.link}'">
                      <h3>${item.name}</h3>
                      <p>${item.description}</p>
                      ${item.date ? `<p><strong>Date:</strong> ${item.date}</p>` : ''}
                  </div>
              `).join('');
              resultsContainer.innerHTML = resultsHtml;
              resultsContainer.style.display = 'block';
          } else {
              resultsContainer.innerHTML = '<p>No results found.</p>';
              resultsContainer.style.display = 'block';
          }
      } else {
          resultsContainer.style.display = 'none'; // Hide results if the search bar is empty
      }
  }
  
  // Attach the search function to the search bar input event
  document.getElementById('search-bar').addEventListener('input', handleSearch);
  // Attach the search function to the search bar input event
  document.getElementById('search-bar').addEventListener('input', handleSearch);
// for admin back button
  function goBack() {
      window.history.back(); // Navigate to the previous page
  }