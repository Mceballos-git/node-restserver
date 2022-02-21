const { Schema, model } = require( 'mongoose' );

export const UserSchema = Schema( {
    name: {
        type: String,
        required: [ true, 'El nombre es obligatorio' ]
    },
    email: {
        type: String,
        required: [ true, 'El correo es obligatorio' ],
        unique: true
    },
    password: {
        type: String,
        required: [ true, 'La contraseña es obligatoria' ]
    },
    image: {
        type: String,
    },
    role: {
        type: String,
        required: true,
        // enum: [ 'ADMIN_ROLE', 'USER_ROLE' ]
    },
    status: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    },
} );

// Metodo para poder extraer __v y password del objeto usuario, para no devolver esos valores al frontend
UserSchema.methods.toJSON = function() {
    const {__v, password, ...user} = this.toObject();
    return user
}

module.exports = model( 'User', UserSchema );