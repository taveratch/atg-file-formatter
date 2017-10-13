import fs from 'fs';
import csv from 'csvtojson';
import _ from 'lodash';

let file = fs.readFileSync('src/files/inventory.csv', { encoding: 'utf-8' });

let data = [];

const headers = ['Date', 'Time', 'T.ID', 'GP.Vol', 'NP.Vol', 'Wat.Vol', 'GT.Vol', 'NT.Vol', 'Prd.Lvl', 'Wat.Lvl', 'Ullage', 'Avg.Tmp', 'Prd.Wgt', 'Prd.Dens'];

const getNumberOfTank = data => {
    let i = 0;
    for (let x in data) {
        if (data[x].length === 1) {
            i = Number(x) + 1;
            break;
        }
    }
    return i;
};

const formatTimeString = timeStr => {
    let withoutblanket = timeStr.substring(1, timeStr.length - 1);
    return _.join(withoutblanket.split(' '), ',');
};

const format = (numberOfTank, data) => {
    let formatted = [];

    let temp = [];
    data.map((x, i) => {
        if ((i + 1) % numberOfTank === 0) {
            let time = formatTimeString(x[0]);
            temp.map(each => {
                each.unshift(time);
                formatted.push(each);
            });
            temp = [];
        } else
            temp.push(x);
    });

    return formatted;
};

const write = (data) => {

    let stream = fs.createWriteStream('src/files/formatted_inventory.csv');
    stream.write(headers.toString() + '\n');
    data.map(row => {
        stream.write(row.toString() + '\n');
    });

    stream.end();

};
csv()
    .fromString(file)
    .on('csv', (csvRow) => {
        if (csvRow.length !== 0)
            data.push(csvRow);
        // console.log(csvRow);
    })
    .on('done', () => {
        // console.log(data);
        let numberOfTank = getNumberOfTank(data);
        let formatted = format(numberOfTank, data);
        write(formatted);


    });