module.exports = (sequelize, DataTypes) => {
    const CursoPsg = sequelize.define('CursoPsg', {
        // Model attributes are defined here
        curso_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            // allowNull: false
        },
        nombre_curso: {type: DataTypes.STRING},
        version: {type: DataTypes.STRING},
        portada_curso: {type: DataTypes.STRING},
        configuracion_curso_id: {type: DataTypes.INTEGER},
        estado: {type: DataTypes.STRING},
        created_at: {type: DataTypes.DATE},
        updated_at: {type: DataTypes.DATE},
        user_created: {type: DataTypes.INTEGER}
    }, {
        // Other model options go here
        sequelize, // We need to pass the connection instance
        //modelName: 'psg_curso', // We need to choose the model name
        tableName: 'psg_cursos',
        timestamps: false,
        freezeTableName: true,
    })

    CursoPsg.associate = models => {
        // Participante.hasOne(models.Usuario, {
        //     foreignKey: 'participante_id',
        //     as: 'usuario'
        // })
    }

    return CursoPsg
}

/*
"curso_id":"",
"nombre_curso":"",
"version":"",
"portada_curso":"",
"configuracion_curso_id":"",
"estado":"",
"created_at":"",
"updated_at":"",
"user_created":""
*/



