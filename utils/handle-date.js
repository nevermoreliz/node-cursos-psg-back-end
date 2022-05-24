let hoy = new Date();
// let fecha = hoy.getDate() + '-' + (hoy.getMonth() + 1) + '-' + hoy.getFullYear();
let fecha = hoy.getFullYear() + '-' + (hoy.getMonth() + 1) + '-' + hoy.getDate();

let hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();

let fechaYHora = fecha + ' ' + hora;

module.exports = {fechaYHora, fecha, hora}

