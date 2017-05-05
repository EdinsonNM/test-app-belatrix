import { Servicio } from "./servicio.class";
import * as _ from "underscore";
const data:string = require('./data/midata');
const resultsTemplate:string = require('./tpls/results');
document.querySelector("#data").innerHTML  = data;
const NO_RESULTS:string="- Sin resultados -";

document.querySelector("#btnParse").addEventListener('click',()=>{
    let results = document.querySelector("#results");
    let result = document.querySelector("#resultado");
    let data = (<HTMLTextAreaElement>document.querySelector("#data")).value;
    result.innerHTML =NO_RESULTS;
    results.innerHTML = NO_RESULTS;

    let service = new Servicio(data);
    let obj = service.read(true);   
    result.innerHTML = JSON.stringify(obj, null, 1);
    var template = _.template(resultsTemplate);
    results.innerHTML = (template({title:'Departamentos',data: service.getDepartamentos()}));
    results.innerHTML += (template({title:'Provincias',data: service.getProvincias()}));
    results.innerHTML += (template({title:'Distritos',data: service.getDistritos()}));
});