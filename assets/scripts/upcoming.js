const { createApp } = Vue;
// const urlApiUp = "https://mindhub-ab35.onrender.com/api/amazing-events?time=upcoming";
const urlApiUp = "./assets/scripts/all-events.json";

createApp({
    data() {
        return {
            events: [],
            eventsUpcoming: [],
            categories: [],
            searchValue: "",
            checkedValue: [],
            filterEventsUp: []
        }
    },
    created() {
        fetch(urlApiUp)
        .then(response => response.json())
        .then(data => {
            this.events = data.events;
            // *desactivo la sgte linea
            // this.filterEventsUp = this.eventsUpcoming;
            this.categories = [...new Set(this.events.map(e => e.category))];

            // *filtro los upcoming porque ahora no viene filtrado
            for (let event of this.events) {
                if (event.date > data.currentDate) {
                    this.eventsUpcoming.push(event);
                }
            }
            // *copia del array obtenido para imprimir
            this.filterEventsUp = this.eventsUpcoming.slice();
        })
        .catch(error => console.log(error))
    },
    methods: {
        
    },
    computed: {
        filtrarUp() {
            // console.log("me ejecuté");
            this.filterEventsUp = this.eventsUpcoming.filter(evento => {
                return (this.checkedValue.includes(evento.category) || this.checkedValue.length === 0) 
                && evento.name.toLowerCase().includes(this.searchValue.toLowerCase())

            })
        }
    }
}).mount("#app")