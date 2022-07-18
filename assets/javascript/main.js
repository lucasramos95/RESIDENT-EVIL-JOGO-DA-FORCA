var escolhaDoPc = ["Chris Redfield", "Jill Valentine", "Albert Wesker", "Rebecca Chambers", "Barry Burton", "Claire Redfield", "Leon Kennedy", "Sherry Birkin", "Ada Wong", "HUNK", "Carlos Oliveira", "Steve Burnside", "Billy Coen", "Ashley Graham", "Sheva Alomar", "Helena Harper", "Piers Nivans", "Jake Muller", "Parker Luciani", "Keith Lumley", "Moira Burton", "Natalia Korda", "Ethan Winters", "Mia Winters"];

var vitorias = 0;
var tentativaAtual = [];
var tentativasRestantes = 6;
var escolheu = [];
var palavraAtual = [];
var letrasPermitidas = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "X", "W", "Y", "Z"];

var escolhaDoComputador = escolhaDoPc[Math.floor(Math.random() * escolhaDoPc.length)];

var quem = escolhaDoComputador;
escolhaDoComputador = escolhaDoComputador.toUpperCase();
console.log("Computador Escolheu " + quem);

for (var i = 0; i < escolhaDoComputador.length; i++) {
    if (escolhaDoComputador[i] === " ") {
        escolheu.push("&nbsp");

        palavraAtual.push("&nbsp");
    } else {
        escolheu.push("-");

        palavraAtual.push(escolhaDoComputador[i]);
    };
};

function updateHTML() {

    if (tentativasRestantes === 0) {
        resultado("Perdeu");
    }

    var vitoria = vitorias; 
    var tentativa = tentativasRestantes;
    var atual = tentativaAtual;
    var escolha = escolheu; 

    document.getElementById("vitorias").innerHTML = vitoria; 
    document.getElementById("tentativa").innerHTML = tentativa; 
    document.getElementById("tentativaAtual").innerHTML = atual; 
    document.getElementById("palavraAtual").innerHTML = escolha.join(""); 
}

//audio

function perdeu() {
    var audio = new Audio('assets/audio/gameover.mp3'), loopAudio = false;
    audio.addEventListener('play', function () {   
        this.currentTime = 52;
    });
    audio.addEventListener('ended', function () {
        if (loopAudio) {
            audio.play();
        }
    });
    setTimeout(function () {
        loopAudio = true;
        audio.play();
        alert("Você não sobreviveu, quer tentar novamente?");
        loopAudio = false;
        audio.pause(); 
    }, 200);
}

function vitoria() {
    var audio = new Audio('assets/audio/victory.mp3'), loopAudio = false;
    audio.addEventListener('play', function () {   
        this.currentTime = 9;
    });
    audio.addEventListener('ended', function () {
        if (loopAudio) {
            audio.play();
        }
    });
    setTimeout(function () {
        loopAudio = true;
        audio.play();
        alert("Você sobreviveu! Quer tentar novamente?");
        loopAudio = false;
        audio.pause(); 
    }, 200);
}

function resultado(result) {

    if (result === "vitoria") {
        vitorias++;
        var escolha = escolheu;

        var replace = document.getElementById("palavraAtual").textContent;
        document.getElementById("palavraAtual").textContent = escolheu;

        var img = document.getElementById("img");

        img.setAttribute("src", "assets/images/" + quem + ".jpg");

        var nome = document.getElementById("quem");
        nome.textContent = quem;

        vitoria();
        console.log(img);
    }

    else if (result === "perdeu") {
        perdeu();
    };

    tentativaAtual = [];
    tentativasRestantes = 6;
    escolha = []; 
    palavraAtual = [];

    escolhaDoComputador = escolhaDoPc[Math.floor(Math.random() * escolhaDoPc.length)];

    quem = escolhaDoComputador;
    escolhaDoComputador = escolhaDoComputador.toUpperCase();
    console.log("Computador escolheu " + quem);

    for (var i = 0; i < escolhaDoComputador.length; i++) {
        if (escolhaDoComputador[i] === " ") {
            escolha.push("&nbsp");
            palavraAtual.push("&nbsp");
        } else {
            escolha.push("-");

            palavraAtual.push(escolhaDoComputador[i]);
        };
        updateHTML();
    };
};

updateHTML();

document.onkeyup = function (e) {
    var usuarioPalpite = e.key;

    usuarioPalpite = usuarioPalpite.toUpperCase();

    console.log("Usuário aperta " + usuarioPalpite);

    if (tentativaAtual.includes(usuarioPalpite)) {
        alert("Você já teclou " + usuarioPalpite)
        return;
}

else if (letrasPermitidas.includes(usuarioPalpite)) {
    tentativaAtual.push(usuarioPalpite);

    if (palavraAtual.includes(usuarioPalpite)) {
        for (var i = 0; i < palavraAtual.length; i++) {
            if (usuarioPalpite === palavraAtual[i]) {
                escolheu[i] = usuarioPalpite;
            }
        };

        if (!escolheu.includes("-")) {
            resultado("vitoria");
        };
    }

    else {
        tentativasRestantes--;
    };

};

updateHTML();

};