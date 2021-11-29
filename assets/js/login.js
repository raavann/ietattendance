//change email border when selected
const email = document.querySelector('input[type="email"]');
const h = document.querySelector('h1');
const emailDiv = document.getElementById('email-field');
email.addEventListener('focus', (event)=>{
    emailDiv.style.borderColor = 'rgb(113, 169, 219)';
    emailDiv.style.boxShadow = '0px 0px 5px rgb(113, 169, 219)';
});

email.addEventListener('blur', (event)=>{
    emailDiv.style.borderColor = 'black';
    emailDiv.style.boxShadow = 'none';
});


// change password border when selected
const password = document.querySelector('input[type="password"]');

const passDiv = document.getElementById('password-field');
password.addEventListener('focus', (event)=>{
    passDiv.style.borderColor = 'rgb(113, 169, 219)';
    passDiv.style.boxShadow = '0px 0px 5px rgb(113, 169, 219)';
});

password.addEventListener('blur', (event)=>{
    passDiv.style.borderColor = 'black';
    passDiv.style.boxShadow = 'none';
});