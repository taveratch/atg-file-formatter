import formatter from './formatter';

const headers = ['Date', 'Time', 'T.ID', 'GP.Vol', 'NP.Vol', 'Wat.Vol', 'GT.Vol', 'NT.Vol', 'Prd.Lvl', 'Wat.Lvl', 'Ullage', 'Avg.Tmp', 'Prd.Wgt', 'Prd.Dens'];

formatter('src/files/inventory.csv', { isPath: true, headers })
    .then(res => {
        console.log(res);
    });