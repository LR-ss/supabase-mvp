import { supabase } from "../shared/supabase.js";

let editandoId = null;

const form = document.getElementById("form");
const nome = document.getElementById("nome");
const preco = document.getElementById("preco");
const imagem = document.getElementById("imagem");
const lista = document.getElementById("lista");

async function carregarProdutos() {

    const { data, error } = await supabase
        .from("produtos")
        .select("*")
        .order("id");

    console.log("DATA:", data);
    console.log("ERROR:", error);

    if (error) {
        console.error(error);
        alert(error.message);
        return;
    }

    lista.innerHTML = "";

    data.forEach(produto => {

        const div = document.createElement("div");
        div.className = "item";

        div.innerHTML = `
            <strong>${produto.nome}</strong><br>
            R$ ${Number(produto.preco).toFixed(2)}<br><br>

            <button class="editar">Editar</button>
            <button class="excluir">Excluir</button>
        `;

        div.querySelector(".editar").onclick = () => editar(produto);
        div.querySelector(".excluir").onclick = () => excluir(produto.id);

        lista.appendChild(div);

    });

}

async function excluir(id) {

    const { error } = await supabase
        .from("produtos")
        .delete()
        .eq("id", id);

    if (error) {
        console.error(error);
        alert(error.message);
        return;
    }

    carregarProdutos();

}

function editar(produto) {

    editandoId = produto.id;

    nome.value = produto.nome;
    preco.value = produto.preco;
    imagem.value = produto.imagem || "";

}

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const produto = {
        nome: nome.value,
        preco: Number(preco.value),
        imagem: imagem.value
    };

    let error;

    if (editandoId) {

        ({ error } = await supabase
            .from("produtos")
            .update(produto)
            .eq("id", editandoId));

        editandoId = null;

    } else {

        ({ error } = await supabase
            .from("produtos")
            .insert(produto));

    }

    if (error) {
        console.error(error);
        alert(error.message);
        return;
    }

    form.reset();

    carregarProdutos();

});

carregarProdutos();
