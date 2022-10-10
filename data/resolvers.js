import mongoose from 'mongoose';
import { Clientes } from './db';
import { rejects } from 'assert';


export const resolvers = {
    Query: {
        getClientes : async (root, {limite}) => {
            try {
                const clientes = await Clientes.find({}).limit(limite);
                return clientes; 
            } catch (error) {
                console.log(error);
            }
        },
        getCliente : (root, {id}) => {
            return new Promise((resolve, object) => {
                Clientes.findById(id, (error, cliente) => {
                    if(error) rejects(error)
                    else resolve(cliente)
                });
            });
        }
    },
    Mutation: {
        crearCliente : (root, {input}) => {
            const nuevoCliente = new Clientes({
                nombre : input.nombre,
                apellido : input.apellido,
                empresa : input.empresa,
                emails : input.emails,
                tipo : input.tipo,
                pedidos : input.pedidos
            });
                nuevoCliente.id = nuevoCliente._id;

                return new Promise((resolve, objet) => {
                    nuevoCliente.save((error) => {
                        if(error) rejects(error)
                        else resolve(nuevoCliente)
                    })
                });
        },
        actualizarCliente: (root, {input}) => {
            return new Promise((resolve, object) => {
                Clientes.findOneAndUpdate( {_id : input.id}, input, {new: true}, (error, cliente) =>{
                    if(error) rejects(error)
                    else resolve(cliente)
                });
            });
        },
        elminarCliente: (root,{id}) => {
            return new Promise((resolve, object) => {
                Clientes.findOneAndRemove({_id : id}, (error) => {
                    if(error) rejects(error)
                    else resolve("Se elimino correctamente")
                });
            });
        }
    }
}


export default resolvers;