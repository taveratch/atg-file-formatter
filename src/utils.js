import fs from 'fs';
import _ from 'lodash';

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
    if (options.headers)
        stream.write(options.headers.toString() + '\n');
    data.map(row => {
        stream.write(row.toString() + '\n');
    });
    stream.end();
};

export const compile = (data, options = {}) => {
    let string = '';
    if (options.headers)
        string += options.headers.toString() + '\n';
    data.map(row => {
        string += row.toString() + '\n';
    });
    return string;
};

export const read = (path) => {
    return fs.readFileSync(path, { encoding: 'utf-8' });
};