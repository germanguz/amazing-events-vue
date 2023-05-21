const { createApp } = Vue;

const urlApiDetail = "./assets/scripts/all-events.json";

let query = location.search;
let params = new URLSearchParams(query);
let id = params.get("id");

createApp({
    data() {
        return {
            eventDetail: [],
            eventDetailAssistance: [],
            eventDetailEstimate: [],
            eventDate: ""
        }
    },
    created() {
        fetch(urlApiDetail)
            .then(res => res.json())
            .then(data => {
                
                this.eventDetail = data.events.find(each => each.id === id)
                this.eventDate = new Date(this.eventDetail.date).getUTCDate() + "-" 
                + (new Date(this.eventDetail.date).getUTCMonth()+1) + "-" + new Date(this.eventDetail.date).getUTCFullYear();
                if(Object.keys(this.eventDetail).includes("assistance")) {
                    this.eventDetailAssistance = this.eventDetail;
                } else {
                    this.eventDetailEstimate = this.eventDetail;
                }
                
                // Para ocultar el loader
                let contenedor = document.getElementById("loaderContainerId");
                contenedor.style.transition = "all 0.5s ease";
                contenedor.style.visibility = "hidden";
                contenedor.style.opacity = "0";
            })
            .catch(error => {
                console.log(error);
            })
        
    },
    methods: {
        backPage() {
            window.history.back();
        } 
        
    }

}).mount("#app");