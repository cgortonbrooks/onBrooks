function showError(message) {
    document.getElementById('error-message').innerHTML =
        `<div class="alert alert-danger mb-0">${message}</div>`;
}
const errorMessages = {
    password: 'Incorrect password.',
    user: 'Username not found.',
    failedAuth: 'Incorrect email or password.',
};

const error = new URLSearchParams(window.location.search).get('error');
if (errorMessages[error]) {
    showError(errorMessages[error]);
}

document.getElementById('loginForm').addEventListener('submit', function (e) {
    const email = document.getElementById('floatingInput').value.trim();
    const password = document.getElementById('floatingPassword').value.trim();

    if (!email && !password) {
        e.preventDefault();
        showError('Please enter your email and password.');
    } else if (!email) {
        e.preventDefault();
        showError('Please enter your email address.');
    } else if (!password) {
        e.preventDefault();
        showError('Please enter your password.');
    }
});