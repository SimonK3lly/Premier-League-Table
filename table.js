let sortDirection = true; 
let tableData = "";
let apiUrl = "https://football98.p.rapidapi.com/premierleague/table"


const tableListEl = document.querySelector(".table-teams");



async function getJson(url){
    const table = await fetch(url, options);
    const data = await table.json();
    return data;
}


const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Host': 'football98.p.rapidapi.com',
        'X-RapidAPI-Key': 'f8caa49d4fmsh866e51214c5b6c0p1f6ecajsnbdbde30669c8'
    }
};


async function main() {

tableData = await getJson(apiUrl);
console.log(tableData);
addHTML(tableData);


}

main();


function addHTML(tableData) {
    tableListEl.innerHTML = tableData.map(
        (team) => teamHTML(team)).join("");
    
    
    function teamHTML(team) {
        return `<tr>
                <th>${team.Position}</th>
                <th class="team__name"><img src="${team.SquadLogo}" class="team__name-logo"><span class="team__name-text">${team.Name}</span></th>
                <th>${team.Played}</th>
                <th>${team.Winned}</th>
                <th>${team.Tie}</th>
                <th>${team.Loosed}</th>
                <th>${team['Goal Difference']}</th>
                <th>${team.Points}</th>
            </tr>`
      
    }

}



function sortColumn(columnName) {
const dataType = typeof tableData[0][columnName];
    sortDirection = !sortDirection;

    switch(dataType) {
        case 'string':
        sortTextColumn(sortDirection, columnName);
        break;
    }
    addHTML(tableData)
}

function sortTextColumn(sort, columnName) {
    tableData = tableData.sort((p1, p2) => {
        return sort ? p1[columnName] - p2[columnName] : p2[columnName] - p1[columnName]
    })
}

