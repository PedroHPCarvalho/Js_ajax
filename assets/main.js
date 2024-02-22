/*
Este código encapsula a lógica de uma requisição AJAX dentro de uma promessa, 
o que permite um código mais limpo e uma maneira mais conveniente de lidar com 
operações assíncronas.
*/
const request = obj => { // Define a função 'request' que recebe um objeto como parâmetro
  return new Promise((resolve, reject) => { // Retorna uma nova promessa
    const xhr = new XMLHttpRequest(); // Cria uma nova instância de XMLHttpRequest
    xhr.open(obj.method, obj.url, true); // Abre uma conexão XMLHttpRequest com o método e URL especificados no objeto

    xhr.send(); // Envia a requisição

    xhr.addEventListener('load', () => { // Adiciona um ouvinte de evento para 'load' que é acionado quando a requisição é concluída
      if (xhr.status >= 200 && xhr.status < 300) { // Verifica se o status da resposta está na faixa de sucesso
        resolve(xhr.responseText); // Se for bem-sucedido, resolve a promessa com a resposta da requisição
      } else { // Se a resposta não estiver na faixa de sucesso
        reject(xhr.statusText); // Rejeita a promessa com o texto de status da resposta
      }
    });
  });
};

/*
Este código é responsável por interceptar cliques em elementos do tipo <a> (links) no documento. 
Quando um link é clicado, o comportamento padrão de seguir o link é impedido (e.preventDefault()), e 
em vez disso, a função carregaPagina é chamada para carregar a página associada ao link de forma assíncrona.
*/

document.addEventListener('click', e => { // Adiciona um ouvinte de evento ao documento para o evento de clique
  const el = e.target; // Obtém o elemento alvo do evento de clique
  const tag = el.tagName.toLowerCase(); // Obtém o nome da tag do elemento alvo em letras minúsculas

  if (tag === 'a') { // Verifica se o elemento alvo é um link (<a>)
    e.preventDefault(); // Impede o comportamento padrão do link, que é seguir o URL especificado
    carregaPagina(el); // Chama a função 'carregaPagina' passando o elemento alvo como argumento
  }
});

/*
Este trecho de código é uma função assíncrona chamada carregaPagina, que é responsável por carregar 
uma página de forma assíncrona quando um elemento (geralmente um link) é clicado.
*/
async function carregaPagina(el) { // Define uma função assíncrona chamada 'carregaPagina' que recebe um elemento como argumento
  try { // Inicia um bloco try-catch para lidar com erros potenciais
    const href = el.getAttribute('href'); // Obtém o atributo 'href' do elemento passado como argumento (o link clicado)
    console.log(href); // Registra o URL do link no console

    const objConfig = { // Define um objeto de configuração para a requisição AJAX
      method: 'GET', // Especifica o método como GET
      url: href, // Define a URL da requisição como o URL do link
    };

    const response = await request(objConfig); // Faz uma requisição assíncrona usando a função 'request' com o objeto de configuração 'objConfig' e espera pela resposta
    carregaResultado(response); // Chama a função 'carregaResultado' passando a resposta da requisição como argumento, para carregar o resultado na página
  } catch(e) { // Captura e trata qualquer erro que ocorra dentro do bloco try
    console.log(e); // Registra o erro no console
  }
}

/*
Esta função chamada carregaResultado é responsável por atualizar o conteúdo de um elemento HTML 
com a resposta da requisição AJAX
*/
function carregaResultado(response) { // Define uma função chamada 'carregaResultado' que recebe a resposta da requisição como argumento
  const resultado = document.querySelector('.resultado'); // Obtém a referência para o elemento HTML com a classe 'resultado'
  resultado.innerHTML = response; // Atualiza o conteúdo desse elemento com a resposta da requisição
}