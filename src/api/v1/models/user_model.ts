const { Schema, model } = require( 'mongoose' );

export const User = Schema( {
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
    active: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    },
} );

// Method to extract "__v" and "password" from the user object, it is not necessary to answer that data
User.methods.toJSON = function() {
    const { __v, password, _id, ...user } = this.toObject();
    user.uid = _id;
    return user
}

module.exports = model( 'User', User );