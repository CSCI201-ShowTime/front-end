var page = 0;
var tbIndex = 0;

// Vue
const budTable = {
    data() {
        return {
            budItems: []
        }
    }
}
const budTableVM = Vue.createApp(budTable).mount('#budget-table-data');

// AJAX request to budget/GET
function budGet() {
    return $.ajax({
        method: "GET",
        url: "/api/event/budget",
        dataType: "json",
        contentType: "application/json",
        data: {
            userid: userInfo.userid,
            page: page,
            size: 5
        }
    });
};

// on success AJAX, append data to Budget Table, increment request page
function doneBudGet(data, textStatus, jqXHR) {
    for(let i=0; i<data.length; i++) {
        budTableVM.budItems.push({
            count: tbIndex++, 
            title: data[i].title, 
            amount: data[i].amount,
            start: data[i].start
        });
    };
    page++;
};

// on document ready, show in Table
$(document).ready(function() {
    budGet().done(doneBudGet);
});


$('#budget-show-more').on("click", function() {
    budGet().done(doneBudGet);
});