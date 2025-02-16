const apiKey = '311b64464aecfa886a96e33024c1fdbd'; 
const botaoBuscar = document.querySelector('.botao-buscar');
const inputCidade = document.getElementById('input-cidade');
const informacoesTempo = document.getElementById('informacoes-tempo');
const errorMessage = document.createElement('div');
errorMessage.id = 'error-message';
informacoesTempo.appendChild(errorMessage);

botaoBuscar.addEventListener('click', () => {
    const cidade = inputCidade.value.trim();
    
    if (!cidade) {
        showError("Por favor, insira o nome de uma cidade.");
        return;
    }

    fetchWeather(cidade);
});

async function fetchWeather(cidade) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${apiKey}&units=metric&lang=pt_br`;

    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error("Cidade não encontrada.");
        }

        const data = await response.json();
        showWeather(data);
    } catch (error) {
        showError(error.message);
    }
}

function showWeather(data) {
    const { name, main, weather, wind } = data;

    const temperatura = main.temp;
    const descricao = weather[0].description;
    const velocidadeVento = wind.speed;
    const iconCode = weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`; 

    
    console.log("Código do ícone:", iconCode);  
    console.log("URL do ícone:", iconUrl); 

    
    informacoesTempo.innerHTML = `
        <h2>${name}</h2>
        <div class="clima-info">
            <img src="${iconUrl}" alt="${descricao}" class="clima-icon">
            <p><strong>Temperatura:</strong> ${temperatura}°C</p>
            <p><strong>Descrição:</strong> ${descricao}</p>
            <p><strong>Vento:</strong> ${velocidadeVento} m/s</p>
        </div>
    `;
}

function showError(message) {
    errorMessage.textContent = message;
    informacoesTempo.innerHTML = ''; 
    informacoesTempo.appendChild(errorMessage);
}




// Barra de Pesquisa
const inputCidad = document.getElementById("input-cidade");
const botaoBusca = document.querySelector(".botao-buscar");
const toggleSearch = document.getElementById("toggle-search");

botaoBuscar.addEventListener("click", function() {
    inputCidade.classList.add("hidden"); 
    botaoBuscar.classList.add("hidden"); 
    toggleSearch.classList.remove("hidden"); 
});

toggleSearch.addEventListener("click", function() {
    inputCidade.classList.remove("hidden"); 
    botaoBuscar.classList.remove("hidden"); 
    toggleSearch.classList.add("hidden"); 
});
