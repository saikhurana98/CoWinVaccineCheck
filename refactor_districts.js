'use strict';

const fs = require('fs');

let rawdata = fs.readFileSync('districts.json');

let state_data = JSON.parse(rawdata);

let refactored_districts = {}

state_data.forEach(state => {

    let districts = {}

    for( const district of state.districts) {
        districts[district.district_name] = district.district_id
    }

    refactored_districts[state.name] = {
        "no":state.no,
        "districts": districts
    }
})

fs.writeFileSync("refactored-districts.json",JSON.stringify(refactored_districts,undefined,4))

// console.log(refactored_districts);