const { createApp } = Vue;

const urlApiPast = "./assets/scripts/all-events.json";

const application = createApp({
    data() {
        return {
            eventsPast: [],
            categories: [],
            searchValue: "",
            checkedValue: [],
            filterEventsPast: []
        }
    },
    created() {
        this.fetchApiPast();
        this.getCategory();
    },
    methods: {
        async fetchApiPast() {
            try {
                const response = await fetch(urlApiPast);
                const dataEvents = await response.json();
                this.eventsPast = dataEvents.events;
                // this.filterEventsPast = this.eventsPast;

                for (let event of this.eventsPast) {
                    if (event.date < dataEvents.currentDate) {
                        this.filterEventsPast.push(event);
                    }
                }

            } catch (error) {
                console.log(error);
            }
        },
        async getCategory() {
            try {
                let response = await fetch(urlApiPast);
                response = await response.json();
                // tomo los events de response, los mapeo, los seteo, paso a array y guardo en this.categories
                this.categories = Array.from(new Set(response.events.map(e => e.category)))
            } catch (error) {
                console.log(error);
            }
        },
        filtrarPast() {
            this.filterEventsPast = this.eventsPast.filter(each => {
                return (this.checkedValue.includes(each.category) || this.checkedValue.length === 0) 
                && each.name.toLowerCase().includes(this.searchValue.toLowerCase())
            })
        }
    }
})

application.mount("#app");