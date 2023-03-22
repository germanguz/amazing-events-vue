const { createApp } = Vue;

const urlApiStatsPast = "https://mindhub-ab35.onrender.com/api/amazing-events?time=past";
const urlApiStatsUp = "https://mindhub-ab35.onrender.com/api/amazing-events?time=upcoming";

createApp({
    data() {
        return {
            eventsStatsPast: [],
            eventsStatsUp: [],
            eventsStatsMaxToMinCapacityPast: [],
            eventsStatsMaxToMinPercentAssistPast: [],

            maxEventAssistance: "",
            maxAssistance: "",
            maxAssistancePercent: "",

            minEventAssistance: "",
            minAssistance: "",
            minAssistancePercent: "",

            maxEventCapacity: "",
            maxCapacity: "",

            categoryPastArray: [],
            categoryPastArrayFilter: [],
            pastArrayToPrint: [],

            categoryUpArray: [],
            categoryUpArrayFilter: [],
            upArrayToPrint: [],


            highestEvent: []

        }
    },
    created() {
        this.fetchStats();
    },
    methods: {
        async fetchStats() {
            let response = await fetch(urlApiStatsPast);
            response = await response.json();
            this.eventsStatsPast = response.events;

            let res = await fetch(urlApiStatsUp);
            res = await res.json();
            this.eventsStatsUp = res.events;

            // !TABLA 1

            // *Ordeno evento del pasado de mayor a menor capacidad
            this.eventsStatsMaxToMinCapacityPast = [...this.eventsStatsPast].sort((a, b) => b.capacity - a.capacity);

            // Nombre evento con mayor capacidad
            this.maxEventCapacity = this.eventsStatsMaxToMinCapacityPast[0].name;
            // Capacidad total del evento con mayor capacidad
            this.maxCapacity = this.eventsStatsMaxToMinCapacityPast[0].capacity.toLocaleString('en-US');


            // *Ordeno evento del pasado de mayor a menor porcentaje de asistencia de acuerdo a capacidad
            this.eventsStatsMaxToMinPercentAssistPast = [...this.eventsStatsPast].sort((a, b) => b.assistance/b.capacity*100 - a.assistance/a.capacity*100);

            // Nombre del evento que tuvo mayor porcentaje de asistencia
            this.maxEventAssistance = this.eventsStatsMaxToMinPercentAssistPast[0].name;
            // Cantidad de asistentes del evento que tuvo mayor porcentaje de asistencia
            this.maxAssistance = this.eventsStatsMaxToMinPercentAssistPast[0].assistance.toLocaleString('en-US');
            // Porcentaje de esa asistencia
            this.maxAssistancePercent = Number((this.eventsStatsMaxToMinPercentAssistPast[0].assistance / this.eventsStatsMaxToMinPercentAssistPast[0].capacity * 100).toFixed(2))

            // Nombre del evento que tuvo menor porcentaje de asistencia
            this.minEventAssistance = this.eventsStatsMaxToMinPercentAssistPast[this.eventsStatsMaxToMinPercentAssistPast.length - 1].name;
            // Cantidad de asistentes del evento que tuvo menor porcentaje de asistencia
            this.minAssistance = this.eventsStatsMaxToMinPercentAssistPast[this.eventsStatsMaxToMinPercentAssistPast.length - 1].assistance.toLocaleString('en-US');
            // Porcentaje de esa asistencia
            this.minAssistancePercent = Number((this.eventsStatsMaxToMinPercentAssistPast[this.eventsStatsMaxToMinPercentAssistPast.length - 1].assistance / this.eventsStatsMaxToMinPercentAssistPast[this.eventsStatsMaxToMinPercentAssistPast.length - 1].capacity * 100).toFixed(2))

            // !TABLA 2 upcoming

            // Mapeo el array ppal para sacar las categorías, elimino repetidos con set, paso a array con [...]
            this.categoryUpArray = [...new Set(this.eventsStatsUp.map(each => each.category))];

            // Recorro el array, filtro para obtener todos los eventos con la misma categoría
            this.categoryUpArray.forEach(element => {
                this.categoryUpArrayFilter = this.eventsStatsUp.filter(each => each.category === element);
                
                // Al array obtenido le aplico reduce para obtener ganancia, nombre y porcentaje de la categoría
                this.categoryUpArrayFilter.reduce((acc, current) => {
                    let ganancia = current.estimate * current.price;
                    let capacidad = current.capacity;
                    obj_acc = {
                        totalGanancia: acc.totalGanancia + ganancia,
                        totalCapacidad: acc.totalCapacidad + capacidad,
                        totalEstimado: acc.totalEstimado + current.estimate
                    }
                    return obj_acc;
                }, { totalGanancia: 0, totalCapacidad: 0, totalEstimado: 0 })
                let porcentajeEstimado = (obj_acc.totalEstimado / obj_acc.totalCapacidad * 100).toFixed(2);
    
                this.upArrayToPrint.push({nombre: element, ganancia: obj_acc.totalGanancia.toLocaleString('en-US'), estimado: porcentajeEstimado});
            });
            // console.log(this.upArrayToPrint);

            // !TABLA 3 past

            // Mapeo el array ppal para sacar las categorías, elimino repetidos con set, paso a array con [...]
            this.categoryPastArray = [...new Set(this.eventsStatsPast.map(each => each.category))];

            // Recorro el array, filtro para obtener todos los eventos con la misma categoría
            this.categoryPastArray.forEach(element => {
                this.categoryPastArrayFilter = this.eventsStatsPast.filter(each => each.category === element);
                
                // Al array obtenido le aplico reduce para obtener ganancia, nombre y porcentaje de la categoría
                this.categoryPastArrayFilter.reduce((acc, current) => {
                    let ganancia = current.assistance * current.price;
                    let capacidad = current.capacity;
                    obj_acc = {
                        totalGanancia: acc.totalGanancia + ganancia,
                        totalCapacidad: acc.totalCapacidad + capacidad,
                        totalAsistencia: acc.totalAsistencia + current.assistance
                    }
                    return obj_acc;
                }, { totalGanancia: 0, totalCapacidad: 0, totalAsistencia: 0 })
                let porcentajeAsistencia = (obj_acc.totalAsistencia / obj_acc.totalCapacidad * 100).toFixed(2);
    
                this.pastArrayToPrint.push({nombre: element, ganancia: obj_acc.totalGanancia.toLocaleString('en-US'), asist: porcentajeAsistencia});
            });
            // console.log(this.pastArrayToPrint);
        }

    }
}).mount("#app");