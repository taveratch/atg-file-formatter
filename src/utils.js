import fs from 'fs';
import _ from 'lodash';

const headers = ['Date', 'Time', 'T.ID', 'GP.Vol', 'NP.Vol', 'Wat.Vol', 'GT.Vol', 'NT.Vol', 'Prd.Lvl', 'Wat.Lvl', 'Ullage', 'Avg.Tmp', 'Prd.Wgt', 'Prd.Dens'];

export const getNumberOfTank = data => {
    let i = 0;
    for (let x in data) {
        if (data[x].length === 1) {
            i = Number(x) + 1;
            break;
        }
    }
    return i;
};

export const formatTimeString = timeStr => {
    let withoutblanket = timeStr.substring(1, timeStr.length - 1);
    return _.join(withoutblanket.split(' '), ',');
};

export const format = (numberOfTank, data) => {
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

export const write = (data, options = {}) => {
    let stream = fs.createWriteStream('src/files/formatted_inventory.csv');
    if (options.header)
        stream.write(headers.toString() + '\n');
    data.map(row => {
        stream.write(row.toString() + '\n');
    });
    stream.end();
};

export const read = (path) => {
    return fs.readFileSync(path, { encoding: 'utf-8' });
};