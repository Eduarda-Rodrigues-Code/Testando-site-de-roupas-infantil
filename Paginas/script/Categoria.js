    fetch('Header.html')
    .then(res => res.text())
    .then(html => document.getElementById('header-container').innerHTML = html);

  fetch('footer.html')
    .then(res => res.text())
    .then(html => document.getElementById('footer-container').innerHTML = html)
    .catch(err => console.error('Erro ao carregar o footer:', err));

  fetch('ESTAÇÕES.html')
    .then(res => res.text())
    .then(html => document.getElementById('ESTAÇÕES-container').innerHTML = html);


  // Modal
  let imagensProduto = [];
  let imagemAtual = 0;

  function abrirModal(produto) {
    imagensProduto = [produto.imagem];
    imagemAtual = 0;

    document.getElementById("modalImagem").src = imagensProduto[imagemAtual];
    document.getElementById("modalNome").textContent = produto.nome;
    document.getElementById("modalPreco").textContent = produto.preco;
    document.getElementById("modalDescricao").textContent = produto.descricao;

    // Tamanhos
    const tamanhosContainer = document.getElementById("modalTamanhos");
    tamanhosContainer.innerHTML = "";
    if (produto.tamanhos?.length) {
      produto.tamanhos.forEach(tamanho => {
        const btn = document.createElement("button");
        btn.textContent = tamanho;
        btn.className = "btn-tamanho";
        btn.onclick = () => {
          document.querySelectorAll(".btn-tamanho").forEach(b => b.classList.remove("selecionado"));
          btn.classList.add("selecionado");
        };
        tamanhosContainer.appendChild(btn);
      });
    }

    // Cores
    const coresContainer = document.getElementById("modalCores");
    coresContainer.innerHTML = "";
    produto.cores.forEach(cor => {
      const span = document.createElement("span");
      span.className = "cor-bolinha";
      span.style.backgroundColor = cor;
      span.onclick = () => {
        document.querySelectorAll(".cor-bolinha").forEach(b => b.classList.remove("selecionado"));
        span.classList.add("selecionado");
      };
      coresContainer.appendChild(span);
    });

    document.getElementById("modalBg").style.display = "flex";
  }

  function fecharModal() {
    document.getElementById("modalBg").style.display = "none";
  }

  // Ação do botão comprar no modal
  document.querySelector(".comprar-modal").addEventListener("click", () => {
    const nome = document.getElementById("modalNome").textContent;
    const preco = document.getElementById("modalPreco").textContent;
    const descricao = document.getElementById("modalDescricao").textContent;
    const imagem = document.getElementById("modalImagem").src;

    const tamanhoSelecionado = document.querySelector(".btn-tamanho.selecionado");
    const corSelecionada = document.querySelector(".cor-bolinha.selecionado");

    if (!tamanhoSelecionado || !corSelecionada) {
      alert("Por favor, selecione um tamanho e uma cor antes de comprar.");
      return;
    }

    const produto = {
      nome,
      preco,
      descricao,
      imagem,
      tamanho: tamanhoSelecionado.textContent,
      cor: corSelecionada.style.backgroundColor
    };

    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    carrinho.push(produto);
    localStorage.setItem("carrinho", JSON.stringify(carrinho));

    alert(`${nome} adicionado ao carrinho!`);
    fecharModal();
  });
