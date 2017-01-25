const datastore = require('./datastore');

var data = datastore.find({});

data.then((data) => {
    let htmlTable = "";
    data.forEach((item) => {
        htmlTable += formatTable(item);
    })
    $("#historyTable").append(htmlTable);
})

function formatTable(row) {
    html = "<tr>";
    html += "<td>" + row["_id"] + "</td>";
    html += "<td>" + row["Created"] + "</td>";
    html += "<td>" + row["FileName"] + "</td>";
    html += "<td>" + row["Comment"] + "</td>";
    return html + "</tr>";
}