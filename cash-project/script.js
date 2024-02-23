let price = 19.5;
let cid = [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]

const cash = document.getElementById("cash");
const changeDue = document.getElementById("change-due");
const purchaseBtn = document.getElementById("purchase-btn");

const areEqual = (value1, value2) => Math.abs(value1 - value2) < 0.0001;

const comparison = (value1, value2) => {
    // console.log(Math.floor(value1*100), Math.floor(value2*100), value1, value2);
    if (Math.floor(value1 * 100) >= Math.floor(value2 * 100)) {
        return true;
    } else { return false; }
}

const calculateRegisterTotal = () => {
    let registerTotal = 0;
    for (let currency of cid) {
        switch (currency[0]) {
            case "PENNY":
                registerTotal += currency[1];
                break;
            case "NICKLE":
                registerTotal += currency[1];
                break;
            case "DIME":
                registerTotal += currency[1];
                break;
            case "QUARTER":
                registerTotal += currency[1];
                break;
            case "ONE":
                registerTotal += currency[1];
                break;
            case "TEN":
                registerTotal += currency[1];
                break;
            case "TWENTY":
                registerTotal += currency[1];
                break;
            case "ONE HUNDRED":
                registerTotal += currency[1];
                break;
            default:
                break;
        }
    }
    console.log(registerTotal);
    return registerTotal;
}

const calculateQuantity = (i, status, statusIndex, change, value) => {
    console.log(change);
    let need = Math.floor(change.toFixed(2) / value); console.log(need);
    if (cid[i][1] - (need * value) >= 0) {
        status[statusIndex] = need;
    } else {
        status[statusIndex] = cid[i][1] / value;
    };
    console.log(status[statusIndex], need);
    return status[statusIndex];
}

const calculateChange = () => {
    let status = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    let change = cash.value - price;
    let i = cid.length - 1;
    console.log(change, i);
    while (change > 0.001) {
        if (cid[i][0] === "ONE HUNDRED" && comparison(change, 100)) {
            status[8] = calculateQuantity(i, status, 8, change, 100);
            change -= 100 * status[8].toFixed(2);
        } else if (cid[i][0] === "TWENTY" && comparison(change, 20)) {
            status[7] = calculateQuantity(i, status, 7, change, 20);
            change -= 20 * status[7].toFixed(2);
        } else if (cid[i][0] === "TEN" && comparison(change, 10)) {
            status[6] = calculateQuantity(i, status, 6, change, 10);
            change -= 10 * status[6].toFixed(2);
        } else if (cid[i][0] === "FIVE" && comparison(change, 5)) {
            status[5] = calculateQuantity(i, status, 5, change, 5);
            change -= 5 * status[5].toFixed(2);
        } else if (cid[i][0] === "ONE" && comparison(change, 1)) {
            status[4] = calculateQuantity(i, status, 4, change, 1);
            change -= 1 * status[4].toFixed(2);
        } else if (cid[i][0] === "QUARTER" && comparison(change, .25)) {
            status[3] = calculateQuantity(i, status, 3, change, .25);
            change -= .25 * status[3].toFixed(2);
        } else if (cid[i][0] === "DIME" && comparison(change, .1)) {
            status[2] = calculateQuantity(i, status, 2, change, .1);
            change -= .1 * status[2].toFixed(2);
        } else if (cid[i][0] === "NICKEL" && comparison(change, .05)) {
            status[1] = calculateQuantity(i, status, 1, change, .05);
            change -= .05 * status[1].toFixed(2);
        } else if (cid[i][0] === "PENNY" && comparison(change, .01)) {
            status[0] = calculateQuantity(i, status, 0, change, .01);
            change -= .01 * status[0].toFixed(2);
        }
        i--;
        console.log(i);
        if (i < 0) break;
    }
    console.log(status);
    return status;
}


const isSufficient = (value) => (calculateRegisterTotal() - value) >= 0 ? true : false;

purchaseBtn.addEventListener("click", () => {
    if (cash.value < price) {
        alert("Customer does not have enough money to purchase the item");
    } else if (areEqual(cash.value, price)) {
        changeDue.innerText = "No change due - customer paid with exact cash";
    } else if (!isSufficient(cash.value-price)) {
        changeDue.innerText = "Status: INSUFFICIENT_FUNDS";
    } else if (areEqual(calculateRegisterTotal(),(cash.value - price))) {
        let result = `Status: CLOSED`;
        const status = calculateChange();
        if (status[8] > 0) { result += ` ONE HUNDRED: $${status[8] * 100}` }
        if (status[7] > 0) { result += ` TWENTY: $${status[7] * 20}` }
        if (status[6] > 0) { result += ` TEN: $${status[6] * 10}` }
        if (status[5] > 0) { result += ` FIVE: $${status[5] * 5}` }
        if (status[4] > 0) { result += ` ONE: $${status[4]}` }
        if (status[3] > 0) { result += ` QUARTER: $${status[3] * .25}` }
        if (status[2] > 0) { result += ` DIME: $${status[2] * .1}` }
        if (status[1] > 0) { result += ` NICKEL: $${status[1] * .05}` }
        if (status[0] > 0) { result += ` PENNY: $${status[0] * .01}` }
        
        // if(1){
        //     for(let i=0; i<9; i++){
        //         if(cid[i][1]<status[i]){
        //             changeDue.innerText = "Status: INSUFFICIENT_FUNDS";
        //         }
        //     }
        // }else{
            changeDue.innerText = result;
        // }
    } else {
        let result = `Status: OPEN`, result1=0;
        const status = calculateChange();
        if (status[8] > 0) { result += ` ONE HUNDRED: $${status[8] * 100}`;}
        if (status[7] > 0) { result += ` TWENTY: $${status[7] * 20}` }
        if (status[6] > 0) { result += ` TEN: $${status[6] * 10}` }
        if (status[5] > 0) { result += ` FIVE: $${status[5] * 5}` }
        if (status[4] > 0) { result += ` ONE: $${status[4]}` }
        if (status[3] > 0) { result += ` QUARTER: $${status[3] * .25}` }
        if (status[2] > 0) { result += ` DIME: $${status[2] * .1}` }
        if (status[1] > 0) { result += ` NICKEL: $${status[1] * .05}` }
        if (status[0] > 0) { result += ` PENNY: $${status[0] * .01}` }
        
        const temp =[.01, .05, .1, .25, 1, 5, 10, 20, 100];
        for(let i=0; i<9; i++){
            result1+=status[i]*temp[i];
        }
        console.log(result1, cash.value-price);
        if(areEqual(result1, cash.value-price)){
            changeDue.innerText = result;
        }else{
            changeDue.innerText = "Status: INSUFFICIENT_FUNDS";
        }
    }
})