function adicionar(which) {
    const qtd = document.querySelector("input[type='number']");
    if (which == 'add' && qtd.value < 10)
        qtd.value = parseInt(qtd.value) + 1;
    else if (which == 'remove' && qtd.value > 1)
        qtd.value = parseInt(qtd.value) - 1;
}

async function addProdutos() {
    let response = await fetch("https://codifica-demo-api.herokuapp.com/api/v1/products");

    if (response.ok) {
        let jsonResponse = await response.json();
        let prodCardTemplate = document.getElementById('cardDeProduto').content.cloneNode(true);
        let h2 = prodCardTemplate.querySelector('h2');
        let p = prodCardTemplate.querySelector('p');
        let img = prodCardTemplate.querySelector('img');
        let listaDeProdutos = document.getElementById('listaDeProdutos');

        let randomProducts = [];
        while (randomProducts.length < jsonResponse.length) {
            let n = Math.floor(Math.random() * jsonResponse.length);
            if (randomProducts.indexOf(n) === -1)
                randomProducts.push(n);
        }

        for (let i = 0; i < randomProducts.length; i++) {
            h2.innerHTML = jsonResponse[randomProducts[i]].nome;
            p.innerHTML = `R$ ${jsonResponse[randomProducts[i]].preco}`;
            img.src = jsonResponse[randomProducts[i]].img;
            listaDeProdutos.append(prodCardTemplate);
        }
    }
}

addProdutos();

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