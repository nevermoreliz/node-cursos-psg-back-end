
module.exports = (sequelize, DataTypes) => {
    const ConfiguracionCurso = sequelize.define('ConfiguracionCurso', {
        // Model attributes are defined here
        id_configuracion_curso: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            // allowNull: false
        },
        id_course_moodle: {type: DataTypes.INTEGER},
        id_tipo_certificado: {type: DataTypes.INTEGER},
        imagen_curso: {type: DataTypes.STRING},
        nota_aprobacion: {type: DataTypes.BOOLEAN},
        orientacion: {type: DataTypes.STRING},
        fecha_inicial: {type: DataTypes.DATE},
        fecha_final: {type: DataTypes.DATE},
        carga_horaria: {type: DataTypes.STRING},
        fecha_certificacion: {type: DataTypes.DATE},
        fecha_creacion: {type: DataTypes.DATE},
        posx_nombre_participante: {type: DataTypes.INTEGER},
        posy_nombre_participante: {type: DataTypes.INTEGER},
        posx_bloque_texto: {type: DataTypes.INTEGER},
        posy_bloque_texto: {type: DataTypes.INTEGER},
        posx_nombre_curso: {type: DataTypes.INTEGER},
        posy_nombre_curso: {type: DataTypes.INTEGER},
        posx_qr: {type: DataTypes.INTEGER},
        posy_qr: {type: DataTypes.INTEGER},
        posx_tipo_participacion: {type: DataTypes.INTEGER},
        posy_tipo_participacion: {type: DataTypes.INTEGER},
        fuente_pdf: {type: DataTypes.STRING},
        tamano_titulo: {type: DataTypes.FLOAT},
        tamano_subtitulo: {type: DataTypes.FLOAT},
        tamano_texto: {type: DataTypes.FLOAT},
        color_nombre_participante: {type: DataTypes.STRING},
        color_subtitulo: {type: DataTypes.STRING},
        detalle_curso: {type: DataTypes.TEXT},
        url_pdf: {type: DataTypes.STRING},
        banner_curso: {type: DataTypes.STRING},
        celular_referencia: {type: DataTypes.STRING},
        inversion: {type: DataTypes.DECIMAL(10, 2)},
        descuento: {type: DataTypes.INTEGER},
        fecha_inicio_descuento: {type: DataTypes.DATE},
        fecha_fin_descuento: {type: DataTypes.DATE},
        horario: {type: DataTypes.STRING},
        imagen_personalizado: {type: DataTypes.STRING},
        posx_imagen_personalizado: {type: DataTypes.INTEGER},
        posy_imagen_personalizado: {type: DataTypes.INTEGER},
        imprimir_subtitulo: {type: DataTypes.BOOLEAN},
        subtitulo: {type: DataTypes.STRING},
        fecha_inicio_lanzamiento: {type: DataTypes.DATE},
        fecha_fin_lanzamiento: {type: DataTypes.DATE},
        proximo_curso: {type: DataTypes.STRING},
        certificacion_disponible: {type: DataTypes.STRING},
        certificacion_disponible_inicio: {type: DataTypes.DATE},
        certificacion_disponible_fin: {type: DataTypes.DATE},
        mensaje_whatsapp: {type: DataTypes.TEXT},
        estado_curso: {type: DataTypes.STRING},
        estado_informe: {type: DataTypes.STRING},
    }, {
        // Other model options go here
        sequelize, // We need to pass the connection instance
        //modelName: 'participante', // We need to choose the model name
        tableName: 'mdl_configuracion_curso',
        timestamps: false,
        freezeTableName: true,
    })

    ConfiguracionCurso.associate = models => {

    }

    return ConfiguracionCurso
}

/*
"id_configuracion_curso":"",
"id_course_moodle":"",
"id_tipo_certificado":"",
"imagen_curso":"",
"nota_aprobacion":"",
"orientacion":"",
"fecha_inicial":"",
"fecha_final":"",
"carga_horaria":"",
"fecha_certificacion":"",
"fecha_creacion":"",
"posx_nombre_participante":"",
"posy_nombre_participante":"",
"posx_bloque_texto":"",
"posy_bloque_texto":"",
"posx_nombre_curso":"",
"posy_nombre_curso":"",
"posx_qr":"",
"posy_qr":"",
"posx_tipo_participacion":"",
"posy_tipo_participacion":"",
"fuente_pdf":"",
"tamano_titulo":"",
"tamano_subtitulo":"",
"tamano_texto":"",
"color_nombre_participante":"",
"color_subtitulo":"",
"detalle_curso":"",
"url_pdf":"",
"banner_curso":"",
"celular_referencia":"",
"inversion":"",
"descuento":"",
"fecha_inicio_descuento":"",
"fecha_fin_descuento":"",
"horario":"",
"imagen_personalizado":"",
"posx_imagen_personalizado":"",
"posy_imagen_personalizado":"",
"imprimir_subtitulo":"",
"subtitulo":"",
"fecha_inicio_lanzamiento":"",
"fecha_fin_lanzamiento":"",
"proximo_curso":"",
"certificacion_disponible":"",
"certificacion_disponible_inicio":"",
"certificacion_disponible_fin":"",
"mensaje_whatsapp":"",
"estado_curso":"",
"estado_informe":""
*/



