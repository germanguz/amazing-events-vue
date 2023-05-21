const { createApp } = Vue
// *La siguiente dirección de la api dejó de funcionar, por eso uso el archivo json
// const urlApi = "https://mindhub-ab35.onrender.com/api/amazing-events";
const urlApi = "./assets/scripts/all-events.json";

createApp({
    data() {
        return {
            eventos: [],
            categories: [],
            searchValue: "",
            checkedValue: [],
            eventosFiltrados: []
        }
    },
    created() {
        cardNotFound = document.getElementById("idCardDisabled");
        console.log(cardNotFound);
        fetch(urlApi)
            .then(res => res.json())
            .then(data => {
                this.eventos = data.events;
                this.eventosFiltrados = this.eventos;

                // con el map creo un array de categorias, con el set, creo un set(que no es un array) de categorias
                // que no se repitan, con [...] paso el set a un array y lo guardo en categories
                this.categories = [...new Set(this.eventos.map(elemento => elemento.category))]

                // Para ocultar el loader
                let contenedor = document.getElementById("loaderContainerId");
                contenedor.style.transition = "all 0.5s ease";
                contenedor.style.visibility = "hidden";
                contenedor.style.opacity = "0";
            })
            .catch(error => console.log(error))

    },
    methods: {
        filtrar() {
            // si al siguiente filter lo dejo en una sola linea no hace falta el return
            this.eventosFiltrados = this.eventos.filter(evento => {
                return (this.checkedValue.includes(evento.category) || this.checkedValue.length === 0) && (evento.name.toLowerCase().includes(this.searchValue.toLowerCase()));
            })
        }
    },
    computed: {

    }

}).mount("#app")
