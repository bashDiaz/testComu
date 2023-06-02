const URL = "wss://us1.loriot.io/app?token=";
const TOKEN = "vn4GngAAAA11czEubG9yaW90LmlvRWs7K0zWDjztsa5_i3iWLg==";
const webSocket = new WebSocket(`${URL}${TOKEN}`);
let deviceEUI = document.querySelector("#device").value;
const button  = document.querySelector("button");
button.addEventListener("click",()=>{
    deviceEUI = document.querySelector("#device").value;
})

webSocket.onopen = function () {
  
};

webSocket.onmessage = (e) => {
    const payload = JSON.parse(e.data);
    console.log(deviceEUI);
    if (payload.cmd === 'gw' && payload.EUI == deviceEUI) {
            const data = payload.data;
            const dataArray = hex2a(data).split(" ");
            const formatDate = new dayjs(payload.gws[0].time).format("YYYY-MM-DD hh:mm:ss");
            document.querySelector("#van").innerHTML = dataArray[0];
            document.querySelector("#vbn").innerHTML = dataArray[1];
            document.querySelector("#vcn").innerHTML = dataArray[2];
            document.querySelector("#vab").innerHTML = dataArray[3];
            document.querySelector("#vbc").innerHTML = dataArray[4];
            document.querySelector("#vca").innerHTML = dataArray[5];
            document.querySelector("#pan").innerHTML = dataArray[6];
            document.querySelector("#pbn").innerHTML = dataArray[7];
            document.querySelector("#pcn").innerHTML = dataArray[8];
            document.querySelector("#ian").innerHTML = dataArray[9];
            document.querySelector("#ibn").innerHTML = dataArray[10];
            document.querySelector("#icn").innerHTML = dataArray[11];
        
            document.querySelector("#SNR").innerHTML = `SNR: ${payload.gws[0].snr} db`;
            document.querySelector("#RSSI").innerHTML = `RSSI: ${payload.gws[0].rssi} db`;
            document.querySelector("#DATE").innerHTML = `Ultimo Envio: ${formatDate}`;
            document.querySelector("#COUNTER").innerHTML = `Contador pq: ${payload.fcnt}`;
    }

};

function hex2a(hexx) {
    var hex = hexx.toString();
    var str = '';
    for (var i = 0; i < hex.length; i += 2)
        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    return str;
}
