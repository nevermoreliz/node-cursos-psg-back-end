
module.exports = (sequelize, DataTypes) => {
    const Participante = sequelize.define('Participante', {
        // Model attributes are defined here
        id_participante: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            // allowNull: false
        },
        id_user: {type: DataTypes.BIGINT},
        ci: {type: DataTypes.STRING},
        expedido: {type: DataTypes.STRING},
        nombre: {type: DataTypes.STRING},
        paterno: {type: DataTypes.STRING},
        materno: {type: DataTypes.STRING},
        genero: {type: DataTypes.STRING},
        id_municipio: {type: DataTypes.INTEGER},
        id_profesion_oficio: {type: DataTypes.INTEGER},
        fecha_nacimiento: {type: DataTypes.DATE},
        correo: {type: DataTypes.STRING},
        celular: {type: DataTypes.STRING},
    }, {
        // Other model options go here
        sequelize, // We need to pass the connection instance
        //modelName: 'participante', // We need to choose the model name
        tableName: 'mdl_participante',
        timestamps: false,
        freezeTableName: true,
    })

    Participante.associate = models => {
        Participante.hasOne(models.Usuario, {
            foreignKey: 'participante_id',
            as: 'usuario'
        })
    }

    return Participante
}

/*
"id_participante":"",
"id_user":"",
"ci":"",
"expedido":"",
"nombre":"",
"paterno":"",
"materno":"",
"genero":"",
"id_municipio":"",
"id_profesion_oficio":"",
"fecha_nacimiento":"",
"correo":"",
"celular":""
*/



