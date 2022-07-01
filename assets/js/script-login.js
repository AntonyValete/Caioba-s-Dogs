if (localStorage.getItem('usuarios') == undefined) {
    var usuarios = [];
}
else
    usuarios = JSON.parse(localStorage.getItem('usuarios'));

async function login() {
    const email = document.querySelector('input[type=email]').value;
    const senha = document.querySelector('input[type=password]').value;

    const resposta = await fetch("https://codifica-demo-api.herokuapp.com/api/v1/users/login", {
        method: "POST",
        body: JSON.stringify({
            email: email,
            senha: senha
        }),
        headers: {
            "Content-Type": "application/json"
        }
    });

    let usuario = email.slice(0, email.indexOf('@'));
    if (usuarios.indexOf(usuario) == -1) {
        usuarios.push(usuario);
        const json = await resposta.json();
        alert(json.mensagem);
    } else {
        alert("Usuário já está logado");
    }
    if (resposta.ok) {
        window.location.href = `./index.html?usuario=${usuario}`;
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
    }
}

