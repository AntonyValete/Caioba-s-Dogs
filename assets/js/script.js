let contador = 1;
document.getElementById("radio1").checked = true;

setInterval(function () {
    nextImage();
}, 4000)

function nextImage() {
    contador++;
    if (contador > 4) {
        contador = 1;
    }

    document.getElementById("radio" + contador).checked = true;
}

async function addProdutos() {
    let response = await fetch("https://codifica-demo-api.herokuapp.com/api/v1/products");

    if (response.ok) {
        let jsonResponse = await response.json();
        let listaDeProdutos = document.getElementById('listaDeProdutos');

        let randomProducts = [];
        while (randomProducts.length < jsonResponse.length) {
            let n = Math.floor(Math.random() * jsonResponse.length);
            if (randomProducts.indexOf(n) === -1)
                randomProducts.push(n);
        }

        for (let i = 0; i < randomProducts.length; i++) {
            let prodCardTemplate = document.getElementById('cardDeProduto').content.cloneNode(true);
            let h5 = prodCardTemplate.querySelector('h5');
            let p = prodCardTemplate.querySelector('p');
            let img = prodCardTemplate.querySelector('img');
            let div = prodCardTemplate.querySelector('div');

            h5.innerHTML = jsonResponse[randomProducts[i]].nome;
            p.innerHTML = `R$ ${parseFloat(jsonResponse[randomProducts[i]].preco).toFixed(2)}`;
            img.src = jsonResponse[randomProducts[i]].img;
            div.className = `fil ${jsonResponse[randomProducts[i]].categoria}`;
            div.id = `${jsonResponse[randomProducts[i]].id}`
            listaDeProdutos.append(prodCardTemplate);
        }
    }
}

addProdutos();

function idItem(produto) {
    if (localStorage.getItem('usuarios') == undefined) {
        window.location.href = "./login.html"
    } else {
        let IDs = [];
        let id = produto.id;
        IDs.push(id);
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const parametro = urlParams.get('usuario');
        localStorage.setItem(`IDs ${parametro}`, (IDs));
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

function filtro(categoria) {
    let listaDeProdutos = document.getElementById('listaDeProdutos');

    if (categoria == 'banhoETosa') {
        let remove = listaDeProdutos.querySelectorAll("div.racao, div.brinquedos, div.acessoriosAlimentacao");
        if (remove[0].style.display == "none") {
            for (let i = 0; i < remove.length; i++)
                remove[i].style = "display: inline-block;";
        }
        else
            for (let i = 0; i < remove.length; i++)
                remove[i].style = "display: none;";
    }
    else if (categoria == 'Brinquedos') {
        let remove = listaDeProdutos.querySelectorAll("div.racao, div.banhoETosa, div.acessoriosAlimentacao");
        if (remove[0].style.display == "none") {
            for (let i = 0; i < remove.length; i++)
                remove[i].style = "display: inline-block;";
        }
        else
            for (let i = 0; i < remove.length; i++)
                remove[i].style = "display: none;";
    }
    else if (categoria == 'Acessorios') {
        let remove = listaDeProdutos.querySelectorAll("div.racao, div.brinquedos, div.banhoETosa");
        if (remove[0].style.display == "none") {
            for (let i = 0; i < remove.length; i++)
                remove[i].style = "display: inline-block;";
        }
        else
            for (let i = 0; i < remove.length; i++)
                remove[i].style = "display: none;";
    }
    else if (categoria == 'Racoes') {
        let remove = listaDeProdutos.querySelectorAll("div.banhoETosa, div.brinquedos, div.acessoriosAlimentacao");
        if (remove[0].style.display == "none") {
            for (let i = 0; i < remove.length; i++)
                remove[i].style = "display: inline-block;";
        }
        else
            for (let i = 0; i < remove.length; i++)
                remove[i].style = "display: none;";
    }
}

// >-------------------------------adicionar ao carrinho---------------------------<

// ainda não prosseguir com isso por conta que preciso de um botão para add ao carrinho(em desenvolvimento)

let count = 0;
// if add to cart btn clicked
$('.button').on('click', function () {
    let cart = $('.cart-item');
    // find the img of that card which button is clicked by user
    let imgtodrag = $(this).parent('.buttons').parent('.content').parent('.card').find("img").eq(0);
    if (imgtodrag) {
        // duplicate the img
        var imgclone = imgtodrag.clone().offset({
            top: imgtodrag.offset().top,
            left: imgtodrag.offset().left
        }).css({
            'opacity': '0.8',
            'position': 'absolute',
            'height': '150px',
            'width': '150px',
            'z-index': '100'
        }).appendTo($('body')).animate({
            'top': cart.offset().top + 20,
            'left': cart.offset().left + 30,
            'width': 75,
            'height': 75
        }, 1000, 'easeInOutExpo');

        setTimeout(function () {
            count++;
            $(".cart-item .item_number").text(count);
        }, 1500);

        imgclone.animate({
            'width': 0,
            'height': 0
        }, function () {
            $(this).detach()
        });
    }
});
