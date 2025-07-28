document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const errorMsg = document.getElementById('error-msg');

    if (username === 'Akshat' && password === 'Akshat@2') {
        errorMsg.textContent = '';
        
        window.location.href = 'main.html'; 
    } else {
        errorMsg.textContent = 'Invalid username or password.';
    }
});

function togglePassword() {
    const passwordInput = document.getElementById('password');
    const icon = document.querySelector('.toggle-password');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        icon.textContent = '🙈'; // Change icon when visible
    } else {
        passwordInput.type = 'password';
        icon.textContent = '👁️'; // Change icon when hidden
    }
}

