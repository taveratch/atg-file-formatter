import { getNumberOfTank, format, write, read, compile } from './utils';
import csv from 'csvtojson';

export default (pathOrText, { isPath, headers }) => {
    let data = [];
    let text = '';
    if(isPath)
        text = read(pathOrText);
    else
        text = pathOrText;
    return new Promise((resolve, reject) => {
        csv()
            .fromString(text)
            .on('csv', (csvRow) => {
                if (csvRow.length !== 0)
                    data.push(csvRow);
            })
            .on('done', () => {
                let numberOfTank = getNumberOfTank(data);
                let formatted = format(numberOfTank, data);
                // write(formatted, { header: true });
                resolve(compile(formatted, { header: !!headers }));
            });
    });

};