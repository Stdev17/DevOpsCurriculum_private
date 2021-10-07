// Written by Beryl leta
// Last modified: Oct 7 2021

const input = process.argv[2];

for (let i = 0; i < input; i++) {
    console.log(' '.repeat(input-i-1) + '*'.repeat(i+i+1));
}
