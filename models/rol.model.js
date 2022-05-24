
module.exports = (sequelize, DataTypes) => {
    const Rol = sequelize.define('Rol', {
        rol_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
            // allowNull: false
        },
        nombre_rol: {
            type: DataTypes.STRING
            // allowNull defaults to true
        },
        estado: {
            type: DataTypes.STRING
        },
        created_at: {
            type: DataTypes.DATE
        },
        updated_at: {
            type: DataTypes.DATE
        },
        user_created: {
            type: DataTypes.INTEGER
        },
    }, {
        // Other model options go here
        sequelize, // We need to pass the connection instance
        // modelName: 'rol', // We need to choose the model name
        tableName: 'psg_roles',
        timestamps: false,
        freezeTableName: true
    })

    Rol.associate = models => {

        Rol.hasMany(models.UsuarioRoles, {foreignKey: 'rol_id', as: 'usuario_roles'});

        Rol.belongsToMany(
            models.Usuario,
            {
                through: models.UsuarioRoles,
                foreignKey: 'rol_id',
                as: 'usuarios'
            });
    }

    return Rol
}

/*
"rol_id":"",
"nombre_rol":"",
"estado":"",
"created_at":"",
"updated_at":"",
"user_created":""
*/