const btEntrar = document.querySelector('#bt-entrar');
const inputEmail = document.querySelector('#input-email');
const inputSenha = document.querySelector('#input-senha');

const fetchLogin = async (email, senha) => {
    let login = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, senha })
    })
    login = await login.json();

    return login;
}

const entrar = async (evento) => {
    const email = inputEmail.value;
    const senha = inputSenha.value;

    if (!email || !senha) {
        alert("Insira um email e uma senha válidos!");
    }

    const login = await fetchLogin(email, senha);
    const loginSection = document.querySelector('#login');
    const feedback = document.createElement('p');
    
    if (login.mensagem) {
        feedback.innerText = login.mensagem;
        loginSection.appendChild(feedback);
        
        localStorage.setItem("token", login.token)
        localStorage.setItem("admin", login.admin)
        setTimeout(() => {
            location.href = '/Alunos/alunos.html'
        }, 500)
    } else if (login.includes('desativado')) {
        feedback.innerText = login
        loginSection.appendChild(feedback);
    } else {
        const feedbackErro = 'O login levou tempo demais, tente novamente!';
        feedback.innerText = feedbackErro
        loginSection.appendChild(feedback);
    }
}

const entrarComEnter = async (evento) => {
    if (evento.key === 'Enter') {
        entrar(evento);
    }
}

const token = localStorage.getItem('token')
if (token !== 'undefined') {
    location.href = '/Alunos/alunos.html'
}

btEntrar.addEventListener('click', entrar);
inputEmail.addEventListener('keydown', entrarComEnter);
inputSenha.addEventListener('keydown', entrarComEnter);