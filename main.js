const numeroSenha = document.querySelector('.parametro-senha__texto');
let tamanhoSenha = 12;
numeroSenha.textContent = tamanhoSenha;
const letrasMaiusculas = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const letrasMinusculas = 'abcdefghijklmnopqrstuvxyz';
const numeros = '0123456789';
const simbolos = '!@%*?#¨&+-.';
const botoes = document.querySelectorAll('.parametro-senha__botao');
const campoSenha = document.querySelector('#campo-senha');
const checkbox = document.querySelectorAll('.checkbox');
const forcaSenha = document.querySelector('.forca');
const botaoGerar = document.querySelector('#botao-gerar');
const entropiaElemento = document.querySelector('.entropia');


botoes[0].onclick = diminuiTamanho;


botoes[1].onclick = aumentaTamanho;

botaoGerar.onclick = geraSenha;

// Adicionar event listeners aos checkboxes
checkbox.forEach(cb => {
    cb.addEventListener('change', geraSenha);
});

// Inicializar com uma senha ao carregar
window.addEventListener('load', geraSenha);

function diminuiTamanho(){
    if (tamanhoSenha > 1){
       // tamanhoSenha = tamanhoSenha-1;
       
        tamanhoSenha--;
    }
    numeroSenha.textContent = tamanhoSenha;
    geraSenha();
}

function aumentaTamanho(){
    if (tamanhoSenha < 20){
       // tamanhoSenha = tamanhoSenha+1;
       tamanhoSenha++;
    }
    numeroSenha.textContent = tamanhoSenha;
    geraSenha();
}

function geraSenha() {
    let alfabeto = '';
    let tiposCaracteres = [];
    
    if (checkbox[0].checked) {
        alfabeto = alfabeto + letrasMaiusculas;
        tiposCaracteres.push(letrasMaiusculas);
    }
    if (checkbox[1].checked) {
        alfabeto = alfabeto + letrasMinusculas;
        tiposCaracteres.push(letrasMinusculas);
    }
    if (checkbox[2].checked) {
        alfabeto = alfabeto + numeros;
        tiposCaracteres.push(numeros);
    }
    if (checkbox[3].checked) {
        alfabeto = alfabeto + simbolos;
        tiposCaracteres.push(simbolos);
    }
    if (alfabeto.length === 0) {
        campoSenha.value = '';
        alert('Selecione ao menos um tipo de caractere para gerar a senha.');
        return;
    }
    if (alfabeto.length > 0) {
        const tamanhoAlfabeto = alfabeto.length;
        const entropia = tamanhoSenha * Math.log2(tamanhoAlfabeto);
        const tentativasPorSegundo = 100e6; // 100 milhões de tentativas por segundo
        const segundosPorDia = 60 * 60 * 24;
        const dias = Math.floor(Math.pow(2, entropia) / (tentativasPorSegundo * segundosPorDia));
        if (!Number.isFinite(dias) || dias > 1e12) {
            if (entropiaElemento) {
                entropiaElemento.textContent = 'Um computador pode levar mais de 1.000.000.000.000 dias';
            }
        } else {
            if (entropiaElemento) {
                entropiaElemento.textContent = 'Um computador pode levar até ' + dias + ' dias';
            }
        }
    } else {
        if (entropiaElemento) {
            entropiaElemento.textContent = '';
        }
    }
    
    let senha = '';
    let senhaValida = false;
    
    // Gerar senha até que passe na validação de testarSenha
    do {
        senha = '';
        
        // Garantir que cada tipo de caractere selecionado apareça na senha
        if (tamanhoSenha >= tiposCaracteres.length) {
            // Adicionar um caractere de cada tipo selecionado
            for (let tipo of tiposCaracteres) {
                let numeroAleatorio = Math.floor(Math.random() * tipo.length);
                senha = senha + tipo[numeroAleatorio];
            }
            
            // Preencher o resto da senha aleatoriamente
            for (let i = tiposCaracteres.length; i < tamanhoSenha; i++) {
                let numeroAleatorio = Math.floor(Math.random() * alfabeto.length);
                senha = senha + alfabeto[numeroAleatorio];
            }
            
            // Embaralhar a senha para não deixar os tipos de caracteres sempre na mesma ordem
            let senhaArray = senha.split('');
            for (let i = senhaArray.length - 1; i > 0; i--) {
                let j = Math.floor(Math.random() * (i + 1));
                [senhaArray[i], senhaArray[j]] = [senhaArray[j], senhaArray[i]];
            }
            senha = senhaArray.join('');
        } else {
            // Se o tamanho é menor que a quantidade de tipos, gerar normalmente
            for (let i = 0; i < tamanhoSenha; i++) {
                let numeroAleatorio = Math.floor(Math.random() * alfabeto.length);
                senha = senha + alfabeto[numeroAleatorio];
            }
        }
        
        // Testar se a senha é segura
        senhaValida = testarSenha(senha);
    } while (!senhaValida);
    
    campoSenha.value = senha;
    const tamanhoAlfabeto = alfabeto.length;
    classificaSenha(tamanhoAlfabeto);
}

function classificaSenha(tamanhoAlfabeto){
    let entropia = tamanhoSenha * Math.log2(tamanhoAlfabeto);
    console.log(entropia);
    forcaSenha.classList.remove('fraca','media','forte');
    if (entropia > 57){
        forcaSenha.classList.add('forte');
    } else if (entropia > 35 && entropia < 57) {
        forcaSenha.classList.add('media');
    } else if (entropia <= 35){
        forcaSenha.classList.add('fraca');
    }
}

function testarSenha(senha) {
    if (senha.includes('ABCDE') || senha.includes('abcde') || senha.includes('12345')) {
        return false;
    }
    return true;
}

function geraSenhaSegura() {
    let senhaGerada = '';
    let tiposCaracteres = [];
    let alfabeto = '';
    
    if (checkbox[0].checked) {
        alfabeto = alfabeto + letrasMaiusculas;
        tiposCaracteres.push(letrasMaiusculas);
    }
    if (checkbox[1].checked) {
        alfabeto = alfabeto + letrasMinusculas;
        tiposCaracteres.push(letrasMinusculas);
    }
    if (checkbox[2].checked) {
        alfabeto = alfabeto + numeros;
        tiposCaracteres.push(numeros);
    }
    if (checkbox[3].checked) {
        alfabeto = alfabeto + simbolos;
        tiposCaracteres.push(simbolos);
    }
    
    do {
        senhaGerada = '';
        
        if (tamanhoSenha >= tiposCaracteres.length) {
            for (let tipo of tiposCaracteres) {
                let numeroAleatorio = Math.floor(Math.random() * tipo.length);
                senhaGerada = senhaGerada + tipo[numeroAleatorio];
            }
            
            for (let i = tiposCaracteres.length; i < tamanhoSenha; i++) {
                let numeroAleatorio = Math.floor(Math.random() * alfabeto.length);
                senhaGerada = senhaGerada + alfabeto[numeroAleatorio];
            }
            
            let senhaArray = senhaGerada.split('');
            for (let i = senhaArray.length - 1; i > 0; i--) {
                let j = Math.floor(Math.random() * (i + 1));
                [senhaArray[i], senhaArray[j]] = [senhaArray[j], senhaArray[i]];
            }
            senhaGerada = senhaArray.join('');
        } else {
            for (let i = 0; i < tamanhoSenha; i++) {
                let numeroAleatorio = Math.floor(Math.random() * alfabeto.length);
                senhaGerada = senhaGerada + alfabeto[numeroAleatorio];
            }
        }
    } while (testarSenha(senhaGerada) === false);
    
    return senhaGerada;
}