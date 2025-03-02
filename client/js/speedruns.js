$(document).ready(() => {
    $('#speedrunsButton').bind('click', (event) => {
        if ($('.content-overlay')[0] === undefined) {
            $('.content-gameframe').before(`<div class="content-overlay"></div>`);
            $('.content-overlay').html(`
            <table class="content-overlay-table">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Game Version</th>
                        <th>Run Time</th>
                        <th>Date</th>
                    </tr>
                </thead>
            </table>
            `);
            $.getJSON('/speedrun/data/all', (jsondata) => {
                $('.content-overlay-table').DataTable({
                    data: jsondata.speedruns,
                    columns: [
                        { title: 'Username', data: 'username' },
                        { title: 'Game Version', data: 'gameVersion' },
                        {
                            title: 'Run Time',
                            data: 'runTime',
                            createdCell: function(cell, cellData, rowData, rowIndex, colIndex) {
                                let totalmilliseconds = cellData[prop];
                                let milliseconds = totalmilliseconds % 1000;
                                let totalseconds = (totalmilliseconds - (totalmilliseconds % 1000)) / 1000;
                                let seconds = totalseconds % 60;
                                let totalminutes = (totalseconds - (totalseconds % 60)) / 60;
                                let minutes = totalminutes % 60;
                                let totalhours = (totalminutes - (totalminutes % 60)) / 60;
                                let hours = totalhours % 24;
                                let timeStamp = hours + ':' + minutes + ':' + seconds + ':' + milliseconds;
                                cell.innerHTML = timeStamp;
                            }
                        },
                        { title: 'Date', data: 'date' }
                    ]
                });
            })
        } else if ($('.content-overlay')[0] !== undefined) {
            $('.content-overlay').remove();
        }
    })
})