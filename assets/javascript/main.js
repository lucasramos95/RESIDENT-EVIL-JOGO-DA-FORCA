//array para todas as opções disponíveis
var escolhaDoPc = ["Chris Redfield", "Jill Valentine", "Albert Wesker", "Rebecca Chambers", "Barry Burton", "Claire Redfield", "Leon Kennedy", "Sherry Birkin", "Ada Wong", "HUNK", "Carlos Oliveira", "Steve Burnside", "Billy Coen", "Ashley Graham", "Sheva Alomar", "Helena Harper", "Piers Nivans", "Jake Muller", "Parker Luciani", "Keith Lumley", "Moira Burton", "Natalia Korda", "Ethan Winters", "Mia Winters"];

//manter variáveis para as vitórias, letras já adivinhadas e quantas ainda restam
var vitorias = 0;
var tentativaAtual = [];
var tentativasRestantes = 6;
var escolheu = []; //array para manter palavra escolhida
var palavraAtual = []; //array para manter cada letra da palavra selecionada
var letrasPermitidas = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "X", "W", "Y", "Z"];

//pegar uma escolha aleatória do array com os personagens
var escolhaDoComputador = escolhaDoPc[Math.floor(Math.random() * escolhaDoPc.length)];

//Deixar o nome dos personagens em letras maiúsculas, para o resto do código funcionar
//criar nova variável para que assim, o conteúdo original é intocável
var quem = escolhaDoComputador;
escolhaDoComputador = escolhaDoComputador.toUpperCase();
console.log("Computador Escolheu " + quem);

//jogar cada letra na palavra como espaço em branco "-"
for (var i = 0; i < escolhaDoComputador.length; i++) {
    //se houver espaços na palavra, adicionar espaço
    if (escolhaDoComputador[i] === " ") {
        escolheu.push("&nbsp");

        palavraAtual.push("&nbsp");
    } else {
        escolheu.push("-");

        palavraAtual.push(escolhaDoComputador[i]);
    };
};

//criar função que atualiza o html
function atualizaHtml() {
    if (tentativasRestantes === 0) {
        resultado("perdeu");
    }

    var vitoria = vitorias; //atualiza o contador de vitórias
    var tentativa = tentativasRestantes; //mostra quantas tentativas ainda restam
    var atual = tentativaAtual; //o que o usuário já escolheram
    var selecao = escolheu; //o array que contem "-" e a resposta

    document.getElementById("vitorias").innerHTML = vitoria; //aumenta contador se estiver ganhando
    document.getElementById("tentativa").innerHTML = tentativa; //mostra quantas tentativas ainda restam
    document.getElementById("tentativaAtual").innerHTML = atual; //atualiza o que  o usuario já acertou
    document.getElementById("palavraAtual").innerHTML = selecao.join(""); //atualiza a palavra selecionada com aspas

    //se o usuário gastar todas as tentativas, perde
}

//Criar função para tocar som quando o usuário perde
function perde() {
    var audio = new Audio('assets/audio/gameover.mp3'), loopAudio = false;
    audio.addEventListener('play', function () {
        this.currentTime = 52;
    });
    audio.addEventListener('ended', function () {
        if (loopAudio) {
            audio.play();
        }
    });//corta música se o usuário aperta ok
    setTimeout(function () {
        loopAudio = true;
        audio.play();
        alert("GAME OVER! Você não sobreviveu, gostaria de tentar novamente?");
        loopAudio = false;
        audio.pause();//se você quiser
    }, 200);
}

//Tocar áudio, se o usuário ganhar o jogo
function ganha() {
    var audio = new Audio('assets/audio/victory.mp3'), loopAudio = false;
    audio.addEventListener('play', function () {
        this.currentTime = 9; 
    });
    audio.addEventListener('ended', function () {
        if (loopAudio) {
            audio.play();
        }
    });//corta a música se o usuário aperta ok
    setTimeout(function () {
        loopAudio = true;
        audio.play();
        alert("Você sobreviveu! Quer tentar novamente?");
        loopAudio = false;
        audio.pause();//se você quiser    
    }, 200);
}

//criar as propriedades de vitória e derrota
function resultado(resultados) {

    //se eles ganharem o jogo
    if (resultados === "vitoria") {
        vitorias++;
        var selecao = escolheu;
        //atualizar a palavra ganhadora e atualizar para a foto do personagem
        var recoloca = document.getElementById("palavraAtual").textContent;
        document.getElementById("palavraAtual").textContent = selecao;
        
        //chamar a div com a função da imagem
        var img = document.getElementById("img");

        //recolocar a imagem com o src image conectado com o nome
        img.setAttribute("src", "assets/images/" + quem + ".jpg");

        //trocar texto com o nome do personagem
        var nome = document.getElementById("quem");
        nome.textContent = quem;
        //alertar que ganhou jogo e dispara som da vitória
        ganha();
        console.log(img);
    }

    //se eles perderem o jogo
    else if (resultados === "perdeu") {
        perde();
    };

    //resetar os colchetes
    tentativaAtual = [];
    tentativasRestantes = 6;
    escolheu = []; //array para manter palavra escolhida
    palavraAtual = []; 

    //computador escolhe nova palavra
    escolhaDoComputador = escolhaDoPc[Math.floor(Math.random() * escolhaDoPc.length)];

    quem = escolhaDoComputador
    escolhaDoComputador = escolhaDoComputador.toUpperCase();
    console.log("Computador escolheu " + quem);
    //input de cada letra na palavra como branco "-"
    for (var i = 0; i < escolhaDoComputador.length; i++) {
        if (escolhaDoComputador[i] === " ") {
            escolheu.push("&nbsp");

            palavraAtual.push("&nbsp");
        } else {
            escolheu.push("-");

            palavraAtual.push(escolhaDoComputador[i]);
        };
        atualizaHtml();
    };
};

atualizaHtml(); //atualiza o HTML para locar palavra em branco

//teste funcão
document.onkeyup = function (e) {
    var palpiteUsuario = e.key;

    //mudar letras minúscula para maiúscula
    palpiteUsuario = palpiteUsuario.toUpperCase();

    console.log("Usuário digita " + palpiteUsuario);
    //console.log("Escolha do computador é " + escolhaDoComputador);

    //se usuário presssiona tecla que já teclou
    if (tentativaAtual.includes(palpiteUsuario)) {
        alert("Você já teclou " + palpiteUsuario)
        return;
    }

    //aqui, verifica se o usuário esta na verdade pressionando letras alfabéticas
    else if (letrasPermitidas.includes(palpiteUsuario)) {

        //primeiro coloca palpite do usuário no array;
        tentativaAtual.push(palpiteUsuario);

        //se a tecla dá "match" com uma letra no array
        if (palavraAtual.includes(palpiteUsuario)) {

            //recoloca os espaços em branco com a letra combinada correta.
            for (var i = 0; i < palavraAtual.length; i++) {
                if (palpiteUsuario === palavraAtual[i]) {
                    escolheu[i] = palpiteUsuario;
                }
            };

            //depois de verificar se o array não tem "brancos", se não eles ganham!
            if (!escolheu.includes("-")) {
                resultado("vitoria");
            };
        }

        else {
            tentativasRestantes--;
        };

    };
    atualizaHtml(); //atualiza o contador de pontos
};