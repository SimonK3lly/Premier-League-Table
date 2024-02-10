let sortDirection = true; 
let tableData = "";
let apiUrl = "https://premier-league-standings1.p.rapidapi.com/"


const tableListEl = document.querySelector(".table-teams");



async function getJson(url){
    const table = await fetch(apiUrl, options);
    const data = await table.json();
    return data;
}


const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'f8caa49d4fmsh866e51214c5b6c0p1f6ecajsnbdbde30669c8',
        'X-RapidAPI-Host': 'premier-league-standings1.p.rapidapi.com'
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
                <th>${team.stats.rank}</th>
                <th class="team__name"><img src="${team.team.logo}" class="team__name-logo"><span class="team__name-text">${team.team.name}</span></th>
                <th>${team.stats.gamesPlayed}</th>
                <th>${team.stats.wins}</th>
                <th>${team.stats.ties}</th>
                <th>${team.stats.losses}</th>
                <th>${team.stats.goalDifference}</th>
                <th>${team.stats.points}</th>
            </tr>`
      
    }

}



function sortColumn(columnName) {
    const isNumeric = !isNaN(tableData[0].stats[columnName]); // Check if the property is numeric
    sortDirection = !sortDirection;

    tableData.sort((a, b) => {
        const valueA = isNumeric ? a.stats[columnName] : a.stats[columnName].toString().toLowerCase();
        const valueB = isNumeric ? b.stats[columnName] : b.stats[columnName].toString().toLowerCase();

        if (sortDirection) {
            return isNumeric ? valueA - valueB : valueA.localeCompare(valueB);
        } else {
            return isNumeric ? valueB - valueA : valueB.localeCompare(valueA);
        }
    });

    addHTML(tableData);
}


