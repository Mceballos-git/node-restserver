const { Schema, model } = require( 'mongoose' );

export const Role = Schema( {
    role: {
        type: String,
        required: [ true, 'El rol es obligatorio' ]
    },
} )

module.exports = model( 'Role', Role );