export interface Result {
	success: boolean,
		data: any;
	error: any;
}
export interface Data {
	departamentos:any,
	provincias:any,
	distritos:any
}
export interface Location {
	id: string,
	title: string
}

export class Servicio {
	data:Data;
	texto:string;
	constructor(data:string="") {
		this.data = {
			departamentos:{},
			provincias:{},
			distritos:{}
		}
		this.texto=data;
	}
	read(useAdvance:boolean = false):Data{
		let r:Result =this.validateFormat(this.texto);
		if(r.success){
			let rows = (useAdvance)?this.getRowsAdvance(this.texto):this.getRows(this.texto);
			for (let row of rows){
				this.readRow(this.data,row)
			}
			return this.data;
		}else{
			throw r.error;
		}
		
	}
	
	getRows(data:string){
		let texto:string = data;
		texto = texto.replace(/\“/gi, '');
		texto = texto.replace(/\”/gi, '');
		let rows = texto.split("\n");
		return rows;
	}
	getRowsAdvance(data:string){
		data = data.replace(/\“/gi, '"');
		data = data.replace(/\”/gi, '"');
		const regex = /[^'"\\]*(?:\\.[^'"\\]*)*(["'])([^"'\\]*(?:(?:(?!\1)["']|\\.)[^"'\\]*)*)\1/gy;
    	let grupo:any[];
        let resultado:any = [];
		
		while ((grupo = regex.exec(data)) !== null) {
			resultado.push(grupo[2]);
		}
		
		return resultado;
	}
	readRow(data:Data,row: string) {
		try {
			
	
		let cols = row.split(/\s\//gi);
		let i=0;
		for(let col of cols){
			if(col.trim()!=''){
				let tmpCol = col.trim().split(/\s/)
				let item:Location= {
					id:tmpCol.shift(),
					title: tmpCol.join(' ')
				}
				switch(i){
					case 0:
						let departamento:any=item;
						data.departamentos[item.id]=departamento;
						break;
					case 1:
						if(!data.provincias.hasOwnProperty(departamento.id)){
							data.provincias[departamento.id]={};
						}
						let provincia:any=item;
						data.provincias[departamento.id][provincia.id] = (provincia);
						break;
					case 2: 
						if(!data.distritos.hasOwnProperty(provincia.id)){
							data.distritos[provincia.id]={};
						}
						let distrito:any=item;
						data.distritos[provincia.id][distrito.id] = (distrito);
						break;

				}
			}
			i++;
		}
		} catch (error) {
			throw "Format is invalid"	
		}

	}
	validateFormat(data: string): Result {
		let result: Result = {
			success: true,
			error: null,
			data: null
		};
		if(data.trim()==""){
			result.success = false;
			result.error="data is empty";
		}
		return result;

	}
	getDepartamentos():any[]{
		let data = Object.keys(this.data.departamentos).map((e) =>{
			let data = this.data.departamentos[e];
			data.idpadre="-";
			data.padre="-";
			return data;
		});
		return data;

	}
	getProvincias():any[]{
		let results:any[]=[];
		Object.keys(this.data.departamentos).forEach((dpto) =>{
			if(this.data.provincias.hasOwnProperty(dpto)){
				Object.keys(this.data.provincias[dpto]).forEach((prv) =>{
					let data = this.data.provincias[dpto][prv];
					data.idpadre=this.data.departamentos[dpto].id;
					data.padre=this.data.departamentos[dpto].title;
					results.push(data);
				});
			}

		});
		return results;

	}
	getDistritos():any[]{
		let results:any[]=[];
		Object.keys(this.data.departamentos).forEach((dpto) =>{
			if(this.data.provincias.hasOwnProperty(dpto))
			Object.keys(this.data.provincias[dpto]).forEach((prv) =>{
				if(this.data.distritos.hasOwnProperty(prv))
				Object.keys(this.data.distritos[prv]).forEach((dist) =>{
					let data = this.data.distritos[prv][dist];
					data.idpadre=this.data.provincias[dpto][prv].id;
					data.padre=this.data.provincias[dpto][prv].title;
					results.push(data);
				});
			});
		});
		return results;

	}



}