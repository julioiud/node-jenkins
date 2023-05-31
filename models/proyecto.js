const { Schema, model} = require('mongoose')

const ProyectoSchema = Schema({
    numero: {
        type: String,
        required: [true, 'Numero requerido'],
        unique: [true, 'Proyecto creado']
    },
    titulo: {
        type: String,
        required: [true, 'titulo requerido']
    },
    // TODO: Colocar demás atributos: fecha iniciación, fecha entrega, valor, etc...
    tipoProyecto: {
        type: Schema.Types.ObjectId,
        ref: 'TipoProyecto',
        required: true
    },
    cliente: {
        type: Schema.Types.ObjectId,
        ref: 'Cliente',
        required: true
    }
    // TODO: Colocar el resto de objetos (Schemas): universidad y etapa
})

module.exports = model('Proyecto', ProyectoSchema)
