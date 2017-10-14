import { getNumberOfTank, format, read, compile } from './utils';
import csv from 'csvtojson';

const headers = ['Date', 'Time', 'T.ID', 'GP.Vol', 'NP.Vol', 'Wat.Vol', 'GT.Vol', 'NT.Vol', 'Prd.Lvl', 'Wat.Lvl', 'Ullage', 'Avg.Tmp', 'Prd.Wgt', 'Prd.Dens'];

export default (pathOrText, { isPath, useHeader }) => {
    let data = [];
    let text = '';
    if (isPath)
        text = read(pathOrText);
    else
        text = pathOrText;
    return new Promise((resolve, reject) => {
        csv()
            .fromString(text)
            .on('csv', (csvRow) => {
                if (csvRow.length !== 0) {
                    if (csvRow.length < 5) {
                        let timeStr = csvRow[0].substring(1, csvRow[0].length - 1);
                        if(Date.parse(timeStr)) {
                            data.push(csvRow);
                        }
                    }else {
                        data.push(csvRow);
                    }
                }

            })
            .on('done', () => {
                let numberOfTank = getNumberOfTank(data);
                let formatted = format(numberOfTank, data);
                // write(formatted, { header: true });
                resolve(compile(formatted, { headers: useHeader ? headers : false }));
            });
    });

};