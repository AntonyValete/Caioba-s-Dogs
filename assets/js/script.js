function adicionar(which) {
    const qtd = document.querySelector("input[type='number']");
    if (which == 'add' && qtd.value < 10)
        qtd.value = parseInt(qtd.value) + 1;
    else if (which == 'remove' && qtd.value > 1)
        qtd.value = parseInt(qtd.value) - 1;
}

