const { createApp } = Vue;

const urlApiDetail = "https://mindhub-ab35.onrender.com/api/amazing-events";

let query = location.search;
console.log(query);
let params = new URLSearchParams(query);
console.log(params);
let id = params.get("id");
console.log(id);

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
                
                console.log(data);
                this.eventDetail = data.events.find(each => each.id === id)
                console.log(this.eventDetail);
                this.eventDate = new Date(this.eventDetail.date).getUTCDate() + "-" 
                + (new Date(this.eventDetail.date).getUTCMonth()+1) + "-" + new Date(this.eventDetail.date).getUTCFullYear();
                console.log(this.eventDate);
                if(Object.keys(this.eventDetail).includes("assistance")) {
                    this.eventDetailAssistance = this.eventDetail;
                } else {
                    this.eventDetailEstimate = this.eventDetail;
                }
                console.log(this.eventDetailAssistance.name);
                console.log(this.eventDetailEstimate);
            })
            .catch(error => {
                console.log(error);
            })
    },

}).mount("#app");