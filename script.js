let rate = async () => {
    const response = await fetch(`https://api.frankfurter.app/latest?amount=1&from=${s1}&to=${s2}`)
    const data = await response.json();
    console.log(data.rates[s2]);
    let r = data.rates[s2];
    return r;
}


const from = document.querySelectorAll(".from-country select");
let incode
for (let select of from) {
    for (code in countryList) {
        let newop = document.createElement("option");
        newop.innerText = code;
        newop.value = code;
        if (select.name === "from" && code === "USD") {
            newop.selected = "selected"
        }
        else if (select.name === "to" && code === "INR") {
            newop.selected = "selected"
        }
        select.appendChild(newop);
    }
    select.addEventListener("change", (e) => {
        flagChange(e.target)
    })
}



const from2 = document.querySelectorAll(".to-country select");
for (let select of from2) {
    for (code in countryList) {
        let newop1 = document.createElement("option");
        newop1.innerText = code;
        newop1.value = code;
        if (select.name === "from" && code === "USD") {
            newop1.selected = "selected"
        }
        else if (select.name === "to" && code === "INR") {
            newop1.selected = "selected"
        }
        select.appendChild(newop1);
    }
    select.addEventListener("change", (e) => {
        flagChange2(e.target)
    })
}
let s1 = "USD"
const flagChange = (ele) => {
    let code = ele.value;
    s1 = code;
    let countryCode = countryList[code]
    let imgsrc = `https://flagsapi.com/${countryCode}/flat/64.png`
    document.querySelectorAll(".img1")[0].src = imgsrc
    document.querySelector(".in").innerText = `1 ${s1}`
}


let s2 = "INR"
const flagChange2 = async (ele) => {
    let code1 = ele.value;
    s2 = code1
    let countryCode = countryList[code1]
    let imgsrc = `https://flagsapi.com/${countryCode}/flat/64.png`
    document.querySelectorAll(".img2")[0].src = imgsrc
    let r = await rate();
    document.querySelector(".out").innerText = `${r} ${s2}`
}


async function k() {
    const response = await fetch(`https://api.frankfurter.app/latest?amount=1&from=${s1}&to=${s2}`)
    const data = await response.json();
    let currency = data.rates[s2];
    let c = () => {
        let input = document.querySelector(".text").value;
        return input
    }
    let f = document.querySelector("button").addEventListener("click", c)
    async function main2() {
        let s = await c();
        let amount = s * currency;
        document.querySelector(".amount").innerText = amount;
    }
    main2()
}

async function main() {
    let c = await k();
}
main();

document.querySelector("button").addEventListener("click", () => {
    main();
})

