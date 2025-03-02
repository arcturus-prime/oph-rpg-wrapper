$(document).ready(() => {
    $('#liveLeaderboardButton').bind('click', (event) => {
        if ($('.content-overlay')[0] === undefined) {
            $('.content-gameframe').before(`<div class="content-overlay"></div>`);
            $('.content-overlay').html(`
            <table class="content-overlay-table">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Start Time</th>
                        <th>Current Point</th>
                        <th>Point Timestamps</th>
                    </tr>
                </thead>
            </table>
            `);
            $.getJSON('/speedrun/data/live', (jsondata) => {
                $('.content-overlay-table').DataTable({
                    data: jsondata.liveruns,
                    columns: [
                        { title: 'Username', data: 'username' },
                        {
                            title: 'Start Time',
                            data: 'startTime',
                            createdCell: function(cell, cellData, rowData, rowIndex, colIndex) {
                                let date = new Date(cellData)
                                cell.innerHTML = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() + ':' + date.getMilliseconds();
                            }
                        },
                        { title: 'Current Point', data: 'currentPoint' },
                        {
                            title: 'Point Timestamps',
                            data: 'timeAt',
                            createdCell: function(cell, cellData, rowData, rowIndex, colIndex) {
                                let datastring = "";
                                for (const prop in cellData) {
                                    let totalmilliseconds = cellData[prop] - rowData.startTime;
                                    let milliseconds = totalmilliseconds % 1000;
                                    let totalseconds = (totalmilliseconds - (totalmilliseconds % 1000)) / 1000;
                                    let seconds = totalseconds % 60;
                                    let totalminutes = (totalseconds - (totalseconds % 60)) / 60;
                                    let minutes = totalminutes % 60;
                                    let totalhours = (totalminutes - (totalminutes % 60)) / 60;
                                    let hours = totalhours % 24;
                                    let timeStamp = hours + ':' + minutes + ':' + seconds + ':' + milliseconds;
                                    datastring = datastring.concat('<tr><td>' + prop + '</td><td>' + timeStamp + '</td></tr>');
                                }
                                cell.innerHTML = `
                                <table class="content-overlay-table-timeattable">
                                    <thead>
                                        <tr>
                                            <th>Point</th>
                                            <th>Time</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    ` + datastring + `
                                    </tbody>
                                </table>
                            `
                            }
                        }
                    ]
                });
            })
        } else if ($('.content-overlay')[0] !== undefined) {
            $('.content-overlay').remove();
        }
    })
})