import {
	Servicio
} from './servicio.class';
import {
	expect
} from 'chai';

describe('Servicio', () => {
	describe('constructor', () => {
		it('texto should return Empty when instance is create without params', () => {
			const servicio = new Servicio();
			expect(servicio.texto).to.equal('');
		});
	});
	describe('read', () => {
		it('should return "data is empty" when texto is Empty', () => {
			const servicio = new Servicio();
			expect(servicio.read.bind(servicio)).to.throw('data is empty');
		});
		it('Should return "Format is invalid" when text does not have line break and param is false', () => {
			let data = `“01 Lima /  / ”“01 Lima / 50 Lima / ”`;
			const servicio = new Servicio(data);
			expect(servicio.read.bind(servicio, false)).to.throw('Format is invalid');
		});
		it('Should return object when text does not have line break and param is true', () => {
			let data:string = `“01 Lima /  / ”“01 Lima / 50 Lima / ”`;
			const servicio = new Servicio(data);
			let obj = servicio.read(true);
			expect(obj).to.be.a('object');
		});
	});

});