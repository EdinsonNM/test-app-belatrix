import {Servicio} from './servicio.class';
import { expect } from 'chai';

describe('Servicio', () => {
  it('should return hello world', () => {
    const servicio = new Servicio();
    expect(servicio.texto).to.equal('');
  });
});