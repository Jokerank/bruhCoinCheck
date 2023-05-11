import axios from 'axios'
import { getCSV } from './csvimport.js'
import colors from "colors"

let wallets = await getCSV("wallets")
let pubAddr = wallets.map(a => a.public_address)

function postRequest(address) {
    axios.post(`https://bruhcoin.co/api/sinature?userAddress=${address}`, {
        userAddress: `${address}`
    })
    .then(function (response) {
        let result
        switch (response.data.error) {
            case true:
                result = "Not Eligible".red
                break;
            case false:
                result = "Eligible".green
                break;
            default:
                break;
        }
        console.log(`Address: ${address} || ` + result);
    })
    .catch(function (error) {
        console.log(error);
    });
}

  for (let address of pubAddr) {
    postRequest(address)
  }