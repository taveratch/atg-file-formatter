import { getNumberOfTank, format, write, read } from './utils';
import csv from 'csvtojson';

let data = [];
csv()
    .fromString(read('src/files/inventory.csv'))
    .on('csv', (csvRow) => {
        if (csvRow.length !== 0)
            data.push(csvRow);
    })
    .on('done', () => {
        let numberOfTank = getNumberOfTank(data);
        let formatted = format(numberOfTank, data);
        write(formatted, { header: true });
    });