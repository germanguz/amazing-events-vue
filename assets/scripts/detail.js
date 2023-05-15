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
                // console.log(this.eventDate);
                if(Object.keys(this.eventDetail).includes("assistance")) {
                    this.eventDetailAssistance = this.eventDetail;
                } else {
                    this.eventDetailEstimate = this.eventDetail;
                }
                // console.log(Object.keys(this.eventDetailAssistance).length);
                // console.log(Object.keys(this.eventDetailEstimate).length);
            })
            .catch(error => {
                console.log(error);
            })
    },

}).mount("#app");