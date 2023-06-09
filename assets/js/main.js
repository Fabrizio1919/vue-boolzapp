const { createApp } = Vue
const DateTime = luxon.DateTime;

createApp({
    data() {
        return {
            activeContact: 0,
            dateNow: DateTime.now().toISO(),
            searchName: '',
            newMessage: '',
            indiceUltimoMess:'',
            contacts: [
                {
                    name: 'Michele',
                    avatar: './assets/img/avatar_1.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Hai portato a spasso il cane?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Ricordati di stendere i panni',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 16:15:22',
                            message: 'Tutto fatto!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Fabio',
                    avatar: './assets/img/avatar_2.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '20/03/2020 16:30:00',
                            message: 'Ciao come stai?',
                            status: 'sent'
                        },
                        {
                            date: '20/03/2020 16:30:55',
                            message: 'Bene grazie! Stasera ci vediamo?',
                            status: 'received'
                        },
                        {
                            date: '20/03/2020 16:35:00',
                            message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                            status: 'sent'
                        }
                    ],
                },
                {
                    name: 'Samuele',
                    avatar: './assets/img/avatar_3.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '28/03/2020 10:10:40',
                            message: 'La Marianna va in campagna',
                            status: 'received'
                        },
                        {
                            date: '28/03/2020 10:20:10',
                            message: 'Sicuro di non aver sbagliato chat?',
                            status: 'sent'
                        },
                        {
                            date: '28/03/2020 16:15:22',
                            message: 'Ah scusa!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Alessandro B.',
                    avatar: './assets/img/avatar_4.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Lo sai che ha aperto una nuova pizzeria?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Si, ma preferirei andare al cinema',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Alessandro L.',
                    avatar: './assets/img/avatar_5.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Ricordati di chiamare la nonna',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Va bene, stasera la sento',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Claudia',
                    avatar: './assets/img/avatar_6.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Ciao Claudia, hai novità?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Non ancora',
                            status: 'received'
                        },
                        {
                            date: '10/01/2020 15:51:00',
                            message: 'Nessuna nuova, buona nuova',
                            status: 'sent'
                        }
                    ],
                },
                {
                    name: 'Federico',
                    avatar: './assets/img/avatar_7.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Fai gli auguri a Martina che è il suo compleanno!',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Grazie per avermelo ricordato, le scrivo subito!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Davide',
                    avatar: './assets/img/avatar_8.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Ciao, andiamo a mangiare la pizza stasera?',
                            status: 'received'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'No, l\'ho già mangiata ieri, ordiniamo sushi!',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:51:00',
                            message: 'OK!!',
                            status: 'received'
                        }
                    ],
                }
            ]
        }
    },
    methods: {
        activeVerify(index) {
            if (index === this.activeContact) {
                return ('active');
            }
        },


        selectUser(index) { this.activeContact = index },
        sendMessage(index) {
            if(this.newMessage === '') {
                return
            }
            let newMessage = {
                date: this.dataIsoToTime(this.dateNow),
                message: this.newMessage,
                status: 'sent'
            }
            this.contacts[index].messages.push(newMessage);
            this.newMessage = ''
            this.autoMessage(index)
        },
        autoMessage(index) {
            let newMessage = {
                date: this.dataIsoToTime(this.dateNow),
                message: 'Ho ricevuto il messaggio',
                status: 'received'
            }
            setTimeout(() => {
                this.filterUser[index].messages.push(newMessage);
            }, 1000)
        },

        dataIsoToTime(dataISO) {
            return (DateTime.fromISO(dataISO).toFormat('T'));
        },

        // DETERMINA IL TESTO DELL'ULTIMO MESSAGGIO INVIATO DA UN UTENTE 
        lastText(contact) {
            if (contact.messages.length > 0) {
                return (contact.messages[contact.messages.length - 1].message)
            } else {
                return ('Nessun Messaggio.');
            }
        },
        localDate() {
            console.log(DateTime.now().setLocale('it').toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS));

        },
        // DETERMINA LA DATA DELL'ULTIMO MESSAGGIO INVIATO DA UN UTENTE
        lastDate(message, index) {
            // Troviamo l'index dell'ultimo messaggio ossia l'ultimo messaggio dell'array
            console.log(message.length - 1);
            const lastMessagePosition = message.length - 1;
            console.log('Questo è la data ultimo messaggio' +  message[lastMessagePosition].date);
            return message[lastMessagePosition].date
        },
        ultimoMessaggio() {
            contacts.forEach(element => {
                this.indiceUltimoMess = Number((element.messages.length) - 1)
            });
        }
        









    },
    computed: {
        filterUser() {
            /* SE NEL NOME è INCLUSO UNO DEI CARATTERI INSIERITI NEL INPUT, IL CONTATTO AVRA' VISIBILE TRUE  */
            // this.contacts.forEach(contact => {
            //     if (contact.name.toLowerCase().includes(this.searchName.toLowerCase())) {
            //         contact.visible = true
            //     } else {
            //         contact.visible = false
            //     }
            // });
            return this.contacts.filter( (contact) => contact.name.toLowerCase().includes(this.searchName.toLowerCase()));
        }

        

    }, 
    mounted(){
       this.localDate() 
    }

}).mount('#app')

