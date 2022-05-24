
module.exports = (sequelize, DataTypes) => {


    const UsuarioRoles = sequelize.define('UsuarioRoles', {
        // Model attributes are defined here
        usuario_rol_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
            // allowNull: false
        },
        usuario_id: {type: DataTypes.INTEGER},
        rol_id: {type: DataTypes.INTEGER},
        estado: {type: DataTypes.STRING},
        created_at: {type: DataTypes.DATE},
        updated_at: {type: DataTypes.DATE},
        user_created: {type: DataTypes.INTEGER},
    }, {
        // Other model options go here
        sequelize, // We need to pass the connection instance
        modelName: 'usuario_roles', // We need to choose the model name
        tableName: 'psg_usuario_roles',
        timestamps: false,
        freezeTableName: true,
    })

    UsuarioRoles.associate = models => {

        UsuarioRoles.belongsTo(models.Rol, {foreignKey: 'rol_id', as: 'rol'});
        UsuarioRoles.belongsTo(models.Usuario, {foreignKey: 'usuario_id', as: 'usuario'});

    }

    return UsuarioRoles
}

/*
"usuario_rol_id":"",
"usuario_id":"",
"rol_id":"",
"estado":"",
"created_at":"",
"updated_at":"",
"user_created":""
*/


