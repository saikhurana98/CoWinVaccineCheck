const axios = require('axios')
const fs = require('fs')

const ACCESS_CODE = process.env.ALEXA_NOTIFY_ME_ACCESS_TOKEN
// setx ALEXA_NOTIFY_ME_ACCESS_TOKEN "ACCESS_TOKEN"
const STATE_DATA = JSON.parse(fs.readFileSync('refactored-districts.json'))

const getCenters = async (State, City) => {
    return new Promise((resolve, reject) => {
        const config = {
            method: 'get',
            url: `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=${STATE_DATA[State].districts[City]}&date=02-05-2021`,
            headers: {
                'authority': 'cdn-api.co-vin.in',
                'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="90", "Google Chrome";v="90"',
                'accept': 'application/json, text/plain, */*',
                'sec-ch-ua-mobile': '?0',
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36',
                'origin': 'https://www.cowin.gov.in',
                'sec-fetch-site': 'cross-site',
                'sec-fetch-mode': 'cors',
                'sec-fetch-dest': 'empty',
                'referer': 'https://www.cowin.gov.in/',
                'accept-language': 'en-US,en-IN;q=0.9,en;q=0.8,hi-IN;q=0.7,hi;q=0.6'
            }
        };




        axios(config)
            .then((response) => {
                resolve(response.data, undefined, 4);
            })
            .catch((error) => {
                reject(error);
            });
    })
}


const notifyAlexa = async (message) => {
    return new Promise((resolve, reject) => {
        const data = JSON.stringify({
            "notification": message,
            "accessCode": ACCESS_CODE
        });

        const config = {
            method: 'post',
            url: 'https://api.notifymyecho.com/v1/NotifyMe',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                resolve();
            })
            .catch((error) => {
                console.log(error);
                reject(error);
            });
    })
}


const main = async () => {
    const centers = await getCenters("Punjab", "Ludhiana")
    const available_centers = []
    for (const center of centers.centers) {
        center.sessions.forEach(session => {
            if (session.min_age_limit <= 18) available_centers.push(center)
        })
    }
    if (available_centers.length > 0) notifyAlexa(`${available_centers.length} COVID Vaccination Centers Available In Your Area`)

}


if (require.main === module) {
    main()
};