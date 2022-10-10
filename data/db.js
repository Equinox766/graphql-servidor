import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://127.0.0.1/Clientes', {useNewUrlParser: true});

// Definir el schema para los clientes
const clientesSchema = new mongoose.Schema({
    nombre : String,
    apellido : String,
    empresa: String,
    emails: Array,
    tipo: String,
    pedidos: Array
});

const Clientes = mongoose.model('clientes', clientesSchema);

export {Clientes}
