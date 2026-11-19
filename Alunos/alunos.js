const fetchAlunos = async (token) => {
    let todosOsAlunos = await fetch('http://localhost:3000/alunos', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    todosOsAlunos = await todosOsAlunos.json();

    return todosOsAlunos;
};

const renderAlunos = async () => {
    const token = localStorage.getItem('token');
    const listaAlunos = await fetchAlunos(token);

    if (Object.keys(listaAlunos).includes('erro')) {
        alert('Sessão expirada, faça login novamente!')
        localStorage.setItem('token', 'undefined');
        location.href = '/';
    }

    const album = document.querySelector('#album');
    
    listaAlunos.forEach((aluno) => {
        const cardAluno = document.createElement('div');
        const nomeAluno = document.createElement('h3');
        nomeAluno.innerText = aluno.nome;
        cardAluno.appendChild(nomeAluno);
        const emailAluno = document.createElement('p');
        emailAluno.innerText = aluno.email;
        cardAluno.appendChild(emailAluno);
        cardAluno.classList.add('card-aluno');
        album.appendChild(cardAluno);
    });
}

renderAlunos();