var page = 0;
var tbIndex = 1;
// stores budget data according to category
var budCat = new Map();

// Vue
const budTable = {
    data() {
        return {
            budItems: []
        }
    }
}

const budTableVM = Vue.createApp(budTable).mount('#budget-table-data');

// show values on document ready, so table will not be empty
$(document).ready(function() {
    budGet().done(doneBudGet);
});

$('#budget-show-more').on("click", function() {
    budGet().done(doneBudGet);
});

// AJAX request to budget/GET
function budGet() {
    return $.ajax({
        method: "GET",
        url: "/api/event/budget",
        dataType: "json",
        contentType: "application/json",
        data: {
            userid: userInfo.id,
            page: page,
            size: 5
        }
    });
};

// on success AJAX, ...
function doneBudGet(data, textStatus, jqXHR) {

    for(let i=0; i<data.length; i++) {
        // update data in Budget Table
        budTableVM.budItems.push({
            count: tbIndex++, 
            title: data[i].title, 
            amount: data[i].amount,
            start: data[i].start
        });
        // update data in category Map
        var cat = data[i].category;
        if(budCat.has(cat)) {
            budCat.set(cat, budCat.get(cat) + data[i].amount);
        }
        else {
            budCat.set(cat, data[i].amount);
        }
    };
    // increment request page
    page++;
    // update our pizza chart, I have no idea how to do it
    gData.removeRows(0, gData.getNumberOfRows());
    budCat.forEach(function(value, key) {
        gData.addRow([key, value]);
    })
    drawChart();
};