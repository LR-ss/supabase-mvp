import { supabase } from "../shared/supabase.js";

async function carregarProdutos() {

    const { data, error } = await supabase
        .from("produtos")
        .select("*")
        .order("id");

    if(error){
        console.error(error);
        return;
    }

    const container = document.getElementById("produtos");

    container.innerHTML = "";

    data.forEach(produto => {

        container.innerHTML += `
            <div class="card">

                ${
                    produto.imagem
                    ? `<img src="${produto.imagem}">`
                    : ""
                }

                <h3>${produto.nome}</h3>

                <p>R$ ${Number(produto.preco).toFixed(2)}</p>

            </div>
        `;
    });
}

carregarProdutos();