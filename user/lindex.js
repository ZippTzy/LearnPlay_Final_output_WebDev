const landingPage = document.getElementById('landingpage');
const loginWrapper = document.getElementById('loginWrapper');
const registerWrapper = document.getElementById('registerWrapper');
const goLoginButton = document.getElementById('goLogin');
const goRegisterButton = document.getElementById('goRegister');
const showRegisterLink = document.getElementById('showRegisterLink');
const showLoginLink = document.getElementById('showLoginLink');
const goBack1 = document.getElementById('goBack1');
const goBack2 = document.getElementById('goBack2');

goLoginButton.addEventListener('click', () => {
    landingPage.style.display = 'none';
    loginWrapper.style.display = 'flex';
    registerWrapper.style.display = 'none';
});

goRegisterButton.addEventListener('click', () => {
    landingPage.style.display = 'none';
    loginWrapper.style.display = 'none';
    registerWrapper.style.display = 'flex';
});

showRegisterLink.addEventListener('click', (e) => {
    e.preventDefault();
    loginWrapper.style.display = 'none';
    registerWrapper.style.display = 'flex';
});

showLoginLink.addEventListener('click', (e) => {
    e.preventDefault();
    registerWrapper.style.display = 'none';
    loginWrapper.style.display = 'flex';
});

goBack1.addEventListener('click', () => {
    landingPage.style.display = 'flex'; 
    loginWrapper.style.display = 'none'; 
    registerWrapper.style.display = 'none'; 
});

goBack2.addEventListener('click', () => {
    landingPage.style.display = 'flex'; 
    loginWrapper.style.display = 'none'; 
    registerWrapper.style.display = 'none'; 
});
