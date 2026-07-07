import { supabase } from "../shared/supabase.js";

let editandoId = null;

async function carregarProdutos() {

    const { data } = await supabase
        .from("produtos")
        .select("*")
        .order("id");

    const lista = document.getElementById("lista");

    lista.innerHTML = "";

    data.forEach(produto => {

        const div = document.createElement("div");

        div.classList.add("item");

        div.innerHTML = `
            <strong>${produto.nome}</strong>
            <br>
            R$ ${produto.preco}
            <br><br>

            <button class="editar">
                Editar
            </button>

            <button class="excluir">
                Excluir
            </button>
        `;

        div
            .querySelector(".editar")
            .onclick = () => editar(produto);

        div
            .querySelector(".excluir")
            .onclick = () => excluir(produto.id);

        lista.appendChild(div);
    });
}

async function excluir(id){

    await supabase
        .from("produtos")
        .delete()
        .eq("id", id);

    carregarProdutos();
}

function editar(produto){

    editandoId = produto.id;

    nome.value = produto.nome;
    preco.value = produto.preco;
    imagem.value = produto.imagem || "";
}

document
    .getElementById("form")
    .addEventListener("submit", async e => {

        e.preventDefault();

        const produto = {
            nome: nome.value,
            preco: Number(preco.value),
            imagem: imagem.value
        };

        if(editandoId){

            await supabase
                .from("produtos")
                .update(produto)
                .eq("id", editandoId);

            editandoId = null;

        }else{

            await supabase
                .from("produtos")
                .insert(produto);
        }

        form.reset();

        carregarProdutos();
    });

carregarProdutos();