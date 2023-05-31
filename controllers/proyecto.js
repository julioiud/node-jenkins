const Proyecto = require('../models/proyecto')
const { request, response} = require('express')
const TipoProyecto = require('../models/tipoProyecto')
const Cliente = require('../models/cliente')
// TODO: COLOCAR EL RESTO DE MODELOS

// crear
const createProyecto = async (req = request, 
    res = response) => {
    try{
        const data = req.body
        console.log(data)
        const { tipoProyecto, cliente } = data;
        //validando tipo proyecto
        const tipoProyectoDB = TipoProyecto.findOne({
            _id: tipoProyecto._id
        })
        if(!tipoProyectoDB){
            return res.status(400).json({msg: 'tipo proy invalido'})
        }
        // validando cliente
        const clienteDB = Cliente.findOne({
            _id: cliente._id
        })
        if(!clienteDB){
            return res.status(400).json({msg: 'marca invalida'})
        }

        const proyecto = new Proyecto(data)

        await proyecto.save()
        
        return res.status(201).json(proyecto)
    }catch(e){
        return res.status(500).json({
            msg: 'Error general ' + e
        })
    }
}

//listar todos
const getProyectos = async (req = request, 
    res = response) => {
        try{
            console.log('Petición...')
            const proyectosDB = await Proyecto.find()
                .populate({
                    path: 'tipoProyecto'
                })
                .populate({
                    path: 'cliente'
                })
                // TODO: HACER POPULATE PARA EL RESTO DE MODELOS
            return res.json(proyectosDB)
        }catch(e){
            return res.status(500).json({
                msg: 'Error general ' + e
            })
        }
}

// TODO
// actualizar inventario
/*const updateProyectoByID = async (req = request, 
    res = response) => {

    try{
        const { id } = req.params
        const data = req.body
        const inventario  = await Inventario.findByIdAndUpdate(id, data, {new: true})
        return res.status(201).json(inventario)
    }catch(e){
        console.log(e)
        return res.status(500).json({msj: 'Error'}) 
    }

}*/


module.exports = { 
    createProyecto, 
    getProyectos, 
    //updateProyectoByID 
}