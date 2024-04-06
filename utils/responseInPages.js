const responsesInPages = (response) => {
    let totalEvents = response.length;
    let totalPages = Math.floor(totalEvents/10);
    totalPages = totalEvents%10>0 ? ++totalPages : totalPages;
    let responses= [];
    for(let i=0; i<response.length; i+=10){
      let events = response.slice(i, i+10);
      let obj = {
        events,
        page:Math.floor(i/10)+1,
        pageSize:events.length,
        totalEvents,
        totalPages
      }
      responses.push(obj);
    }
    return responses;
}
module.exports = responsesInPages;