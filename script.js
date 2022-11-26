const Home = {     
    template:  `
    <div class="row">
        <div class="col-12">
            <h1 class="titolows text-center mt-2">Web Socket</h1>
        </div>
        <div class="row">
            <div class="col-1"></div>
            <div class="col-10">
                <main>
                        <h2>Cos'è WebSocket</h2>
                            <p>Web Socket è uno standard (RFC 6455) per la comunicazione bidirezionale sul web. 
                            Prima di Web Socket, le comunicazioni web via HTTP erano inizializzate sempre dal client (basato sul paradigma Client Response); Questo significa che tutti gli eventi sul server non potevano essere visualizzati in tempo reale sul client o che nel caso di uno streaming video, ogni nuovo frame dovesse essere chiesto con una nuova richiesta HTTP. 
                            È stato sviluppato dal 2009 al 2012, in questo momento è uno standard a tutti gli effetti.
                            </p>
                            <p>Il protocollo WebSocket si divide in due parti</p>
                            <article>
                                <h3>WebSocket Upgrade</h3>
                                    <p>WebSocket nasce e si basa su HTTP; possiamo vederlo come un suo upgrade, infatti, la porta utilizzata è l’80 nel caso di connessioni non TLS e 443 nel caso in cui lo siano.
                                    Non cambiando porta, ci sono molti vantaggi. Di norma la porta 80 e la 443 sono porte già consentite nei firewall aziendali
                                    Al pacchetto HTTP, in questo caso una GET, vengono aggiunti ulteriori 4 header.</p>
                                    <img src="./images/request.png" alt="richiesta Get web socket">
                                    <p><b>Connection: Upgrade</b> => Su questa connessione HTTP verrà fatto un upgrade<br>
                                    <b>Upgrade: websocket</b> => L’upgrade è al protocollo websocket<br>
                                    <b>Sec-WebSocket-Key e Sec-WebSocket-Version</b> => Sono due header aggiunti da esperti in sicurezza che partecipavano alla definizione del protocollo;<br> Servono ad essere certi che le comunicazioni avvengano fra enpoint che supportano Websocket, se ciò non avviene la stringa cambia e quando raggiunge la destinazione non viene validata secondo l'algoritmo condiviso</p>
                            </article>
                            <article>
                                    <h3>WebSocket DataExchange</h3>
                                        <p>Un messaggio websocket è composto in questo modo:</p>
                                        <img src="./images/frame.png" alt="illustrazione frame protocollo web socket">
                                        <p>
                                        Le parti veramente caratterizzanti di questo frame sono i primi due byte.
                                        Il primo byte contiene l’Opcode, un bit MASK e un bit per segnalare se questo è l’ultimo frame della comunicazione.
                                        Se il bit di Mask è a 1 allora anche il byte Masking-key deve essere presente. I browser sono obbligati a mascherare le comunicazioni in uscita, offuscando i dati nel payload. Normalmente solo le comunicazioni verso il server sono mascherate; le risposte dal server sono in chiaro.
                                        Il secondo byte specifica la lunghezza dei byte che seguono.
                                        In pratica l’overhead di questo frame si limita ai primi due byte; il resto del frame è composto dai dati effettivi dell’applicazione.
                                        Websocket quindi è un protocollo di framing che lavora su TCP; Si occupa di segnalare la dimensione dei dati inviati nella trasmissione. I dati che andiamo effettivamente a spedire sono totalmente opachi a questo protocollo.                            
                                        </p>
                            </article>
                            <article>
                            <h3>Performance</h3>
                                <h4>Confronto fra HTTP e WebSocket</h4>
                                    <img src="./images/httpperf.png" alt="grafico relazione richieste/latenza protocollo HTTP">
                                    <p>Questo è il grafico per HTTP che mostra la latenza in relazione alla quantità di richieste in arrivo dai client. Possiamo notare che quando le richieste arrivano a 50.000, la latenza per ottenere una risposta arriva a 700ms.</p>
                                    <p>Il grafico sottostante, invece, mostra WebSocket alla prese con volumi anche più grandi di richieste:</p>
                                    <img src="./images/wsperf.png" alt="grafico relazione richieste/latenza protocollo WebSocket">
                                    <p>Possiamo notare come con volumi anche più alti di 50k, la latenza resti comunque controllata, nell’ordine 4/5 ms. Questo dimostra che dal punto di vista delle perfomance, WebSocket è nettamente superiore ad HTTP classico.
                                    La superiorità è dovuta alla differenza tra i due overhead. Mentre HTTP per ogni trasmissione incapsula il frame in molti header, Websocket ha un overhead massimo di 2 byte, il resto è composto dai dati attivi che vengono inviati.
                                    Oltre al risparmio di banda, c’è anche da evidenziare il risparmio di risorse computazionali lato server nel non dover fare il parsing di tutti gli header in arrivo da una comunicazione HTTP.</p>                
                            </article>
                </main>
            </div>
            <div class="col-1"></div>
        </div>
    </div>
    `
};

const API = {     

    template:  `
    <div class="row">
        <div class="col-12">
            <h1 class="text-center titolows mt-2">API Web Socket</h1>
        </div>
        <div class="row">
            <div class="col-1"></div>
            <div class="col-10">
                <main>
                    <article>
                        <h2>Javascript Client Side</h2>
                            <p>Javascript</p>
                            <p class="code">Const socket = new window.WebSocket(“ws://localhost:8080/ws”);</p>
                            <p class="comment">/*Per aprire una connessione tramite WebSocket, uso innanzitutto questo codice, in cui richiamo in una variabile <i>socket</i> il riferimento a questa connessione. Il tutto avviene usando la parola chiave <i>"ws"</i> davanti all'URL del server verso cui voglio aprire la comunicazione*/<br>
                            /*Esiste anche modo di aprire una connessione WebSocket crittografata, sostituendo a "ws" "wss". In linea di massima, questa sarebbe come la variante HTTPS ed è sempre da preferire, per ovvie ragioni di sicurezza e di affidabilità.<br>
                            /*Subito dopo l’inizializzazione, bisogna chiamare due metodi .onopen e .onclose*/</p>
                            <p class="code"> ws.onopen = function() {<br>
                            ws.send(“Hello, World”);<br>
                            }<br>
                            Ws.onclose = funcion() {<br>
                            // Server Closed<br>
                            }<br></p>
                            <p class="comment">/*Se l’inizializzazione della connessione verso il server fallisce, l’handler richiama subito la funzione .onclose, viceversa chiama .onopen*/<br></p>

                            <p>I 4 eventi  su cui mettere in ascolto la nostra applicazione sono sono:</p>
                            <ul>
                                <li><b>open</b> - Connessione Riuscita</li>
                                <li><b>close</b> - Connessione Fallita</li>
                                <li><b>error</b> - Errore Websocket</li>
                                <li><b>message</b> - Ricezione dati dal server</li>
                            </ul>
                            <p class="code">socket.onmessage = function(event) {<br>
                                alert("[message] Data received from server: $ {event.data}");<br>
                            }; </p>
                            <p class="comment">/*esempio base per l'uso dell'evento message*/</p>
                    </article>
                    <article>
                        <h2>Trasferimento Dati</h2>
                            <p>La funzione principale di WebSocket è, per l'appunto, lo scambio di dati fra client/server  e vicersa</p>
                            <p>Lo scambio di dati avviene attraverso i frame (strutturati come visto nella pagina precedente)<br>Esistono diversi tipi di frames, i principali sono questi:</p>
                            <ul>
                                <li><b>Frame di testo</b> - Il payload contiene testo</li>
                                <li><b>Frame di dati binari</b> - Il payload contiene dati in fomato binario</li>
                                <li><b>Frame ping/pong</b> - Questi frame hanno la funzione di verificare se la connessione è ancora operativa</li>
                                <li><b>Frame di chiusura</b> - Frame che identifica la chiusura della connessione</li>
                            </ul>
                            <p>La tipologia del frame, viene indicata dal primo bit della trama (l'opcode)</p>
                            <p>Quando usiamo un browser, lavoriamo principalmente con i primi due: frame di testo e di dati binari.</p>
                            <p>Il metodo <b>.send()</b> è quello che si occupa dell'invio di questi frame.<br>Per esempio, una chiamata</p>
                            <p class="code">socket.send(body)</p>
                            <p>ci consente di specificare al posto di body qualsiasi tipo di dato, che sia testuale o binario. Se è testuale quando verrà ricevuto, verrà automaticamente tradotto in una stringa; 
                            se si tratta di dati binari, possiamo scegliere fra due particolari tipi di formato: Blob (default) e ArrayBuffer.<br>Un blob è un oggetto ad alto livello che si integrra direttamente con i tag html, il chè lo rende facilmente renderizzabile dai browser.</p>
                    </article>
                </main>
            </div>
            <div class="col-1"></div>
        </div>
    </div>
    `
};


const Json = {
    data() {
        return {
            pokedex: null        
        }
    }, 
    template:  `
    <div class="row">
        <div class="col-12">
            <h1 class="text-center text-danger my-2">Pokedex</h1>
        </div>
    </div>
    <div class="row">
        <div class="col-1"></div>
            <div class="col-12 col-md-10">
            <section>
                <table class="table table-hover">
                    <thead>
                        <tr>
                        <th id="id" scope="col">Numero</th><th scope="col" id="Name">Nome</th><th scope="col" id="type">Tipo</th><th scope="col" id="Tipo2">Tipo2</th><th scope="col" id="HP">HP</th><th scope="col" id="Attack">Attacco</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="pokemon in pokedex">
                        <th scope="row">{{pokemon.id}}</th><th>{{pokemon.name.english}}</th><td>{{pokemon.type[0]}}</td><td>{{pokemon.type[1]}}</td><td>{{pokemon.base.HP}}</td><td>{{pokemon.base.Attack}}</td>
                        </tr>
                    </tbody>
                </table>
            </section>
        </div>
        <div class="col-1"></div> 
    </div>
    `,
    methods: {
        getPokedex: function(){
            axios.get('https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/pokedex.json')
              .then(response => {
                this.pokedex = response.data
              });
        }
    },
    mounted(){
        this.getPokedex();
    }

};

const ModificaDati = {  
    data() {
        return {
            persone: [{"nome": "Mario","cognome": "Rossi"}, {"nome": "Alessandro","cognome": "Bianchi"}, {"nome": "Francesca","cognome": "Verdi"},{"nome": "Alessia","cognome": "Neri"},{"nome": "Andrea","cognome": "Gialli"},{"nome": "Marco","cognome": "Argento"}],
            selected: 0
        }
    },   

    template:  `
    <div class="row">
        <div class="col-6 mt-4 col-md-4 mb-1">
            <h2>Lista Persone</h2>
            <ul class="list-group">
            <li class="list-group-item col-6 col-md-6" v-for="persona in persone">{{persona.nome + " " + persona.cognome}}</li>
            </ul>
        </div>
      <form class="form-inline col-6 mt-4 col-md-4 mb-1">
        <fieldset>
                <h2 class>Modifica Persona</h2>
                    <ul class="form"> 
                        <li class=" col-6 col-md-6">
                            <label for="persona_selezionata">Utente da modificare:&nbsp;&nbsp;</label>
                            <select  class="form-select" aria-label="Persone" id="persona_selezionata" v-model="selected">
                            <option v-for="(persona, index) in persone" v-bind:value="index">{{persona.nome + " " + persona.cognome}}</option>
                            </select>    
                        </li>
                        <li class="my-2">
                            <label for="nomeModificare">Nome:&nbsp;&nbsp;</label>
                            <input v-model="persone[selected].nome" type="text" name="nome" id="nomeModificare"/>    
                        </li>
                        <li>
                            <label for="cognomeModificare">Cognome:&nbsp;&nbsp;</label>
                            <input v-model="persone[selected].cognome" type="text" name="cognome" id="cognomeModificare"/>    
                        </li>
                    </ul>
                    <button type="button" class="btn btn-danger mx-4" @click="cancellaPersona(selected)">Elimina Utente</button>
         </fieldset>
        </form>
        <div class="col-6 order-md-last col-md-4 mb-1"></div>
        <form class="form-inline col-6 mt-4 col-md-4">
         <fieldset>    
                <h2>Aggiungi Persona</h2>
                    <ul class="form">
                        <li class="mb-2">
                        <label for="nome">Nome:&nbsp;&nbsp;</label>
                        <input  type="text" v-model="persone.nome" name="nome" id="nome"/>    
                        </li>
                        <li>
                        <label for="cognome">Cognome:&nbsp;&nbsp;</label>
                        <input  type="text" v-model="persone.cognome" name="cognome" id="cognome"/>    
                        </li>
                    </ul>
                <button type="button" class="btn btn-primary mx-4" @click="aggiungiPersona()">Inserisci Utente</button>
         </fieldset>
        </form>
    </div> `,

    methods: {
        cancellaPersona(selected) {
                    this.persone.splice(selected, 1);
                    this.selected=0;
          },
        
         aggiungiPersona() {
            this.persone.push({nome: this.persone.nome, cognome: this.persone.cognome});
          }
        }
};



const routes = [
  { path: '/', component: Home },
  { path: '/API', component: API },
  { path: '/Json', component: Json },
  { path: '/ModificaDati', component: ModificaDati }
];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes
});

const app = Vue.createApp({});
app.use(router);
app.mount('#app');

let mybutton = document.getElementById("btn-back-to-top");

//Quando l'utente scende di 20px nella pagina, mostra il bottone
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (
    document.body.scrollTop > 20 ||
    document.documentElement.scrollTop > 20
  ) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}
// EventListener per quando l'utente clicca il pulsante, attiva la funzione back to top che ti riporta in cima alla pagina
mybutton.addEventListener("click", backToTop);

function backToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}