
module.exports = (sequelize, DataTypes) => {
    const Usuario = sequelize.define('Usuario', {
        // Model attributes are defined here
        usuario_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
            // allowNull: false
        },
        celular: {type: DataTypes.STRING},
        contrasenia: {type: DataTypes.STRING},
        participante_id: {type: DataTypes.INTEGER},
        estado: {type: DataTypes.STRING},
        created_at: {type: DataTypes.DATE},
        updated_at: {type: DataTypes.DATE},
        user_created: {type: DataTypes.INTEGER},
    }, {
        // Other model options go here
        sequelize, // We need to pass the connection instance
        //modelName: 'usuario', // We need to choose the model name
        tableName: 'psg_usuarios',
        timestamps: false,
        freezeTableName: true,
    })

    Usuario.associate = models => {

        Usuario.hasMany(models.UsuarioRoles, {foreignKey: 'usuario_id', as: 'usuario_roles'})

        Usuario.belongsToMany(
            models.Rol,
            {
                through: models.UsuarioRoles,
                foreignKey: 'usuario_id',
                as: 'roles'
            });

        Usuario.belongsTo(models.Participante, {
            foreignKey: 'participante_id',
            as: 'participante'
        })

    }

    return Usuario
}

/*
    "usuario_id":"",
    "celular":"",
    "contrasenia":"",
    "participante_id":"",
    "estado":"",
    "created_at":"",
    "updated_at":"",
    "user_created":""
*/

