import { Servicio } from "./servicio.class";
import * as _ from "underscore";
const data:string = require('./data/midata');
const resultsTemplate:string = require('./tpls/results');
document.querySelector("#data").innerHTML  = data;

document.querySelector("#btnParse").addEventListener('click',()=>{
    let data = (<HTMLTextAreaElement>document.querySelector("#data")).value;
    let service = new Servicio(data);
    let obj = service.read(true);
    let results = document.querySelector("#results");
    document.querySelector("#resultado").innerHTML = JSON.stringify(obj, null, 1);

    var template = _.template(resultsTemplate);
    results.innerHTML = (template({title:'Departamentos',data: service.getDepartamentos()}));
    results.innerHTML += (template({title:'Provincias',data: service.getProvincias()}));
    results.innerHTML += (template({title:'Distritos',data: service.getDistritos()}));
});