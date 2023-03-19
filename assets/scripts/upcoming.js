const { createApp } = Vue;
const urlApiUp = "https://mindhub-ab35.onrender.com/api/amazing-events?time=upcoming";

createApp({
    data() {
        return {
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
            this.eventsUpcoming = data.events;
            // console.log(this.eventsUpcoming);
            this.filterEventsUp = this.eventsUpcoming;
            this.categories = [...new Set(this.eventsUpcoming.map(e => e.category))];
            // console.log(this.categories);
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