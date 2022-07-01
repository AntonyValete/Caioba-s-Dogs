function adicionar(which) {
    const qtd = document.querySelector("input[type='number']");
    if (which == 'add' && qtd.value < 10)
        qtd.value = parseInt(qtd.value) + 1;
    else if (which == 'remove' && qtd.value > 1)
        qtd.value = parseInt(qtd.value) - 1;
}

function usuarioQualIndex() {
    if (localStorage.getItem('usuarios') == undefined) {
        window.location.href = "./index.html"
    } else {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const parametro = urlParams.get('usuario');
        window.location.href = `./index.html?usuario=${parametro}`;
    }
}

function usuarioQualCarrinho() {
    if (localStorage.getItem('usuarios') == undefined) {
        window.location.href = "./login.html"
    } else {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const parametro = urlParams.get('usuario');
        window.location.href = `./carrinho.html?usuario=${parametro}`;
    }
}

async function carrinho() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const parametro = urlParams.get('usuario');
    IDs = JSON.perse(localStorage.getItem(`IDs ${parametro}`));
    for (let i = 0; i < IDs.length; i++) {
        let response = await fetch(`https://codifica-demo-api.herokuapp.com/api/v1/products/${IDs[i]}`);

        if (response.ok) {
            let jsonResponse = await response.json();
            let prodCarrinho = document.getElementById('itemCarrinho').content.nodeClone(true);
            imgProd = prodCarrinho.querySelector('div.div.img');
            nomeProd = prodCarrinho.querySelector('div.div.p');
            preco = prodCarrinho.querySelector('div.p');
            imgProd.src = jsonResponse.img;
            nameProd = jsonResponse.nome;
            preco = jsonResponse.preco;
        }
    }
}

carrinho();