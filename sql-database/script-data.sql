create table psg_usuarios
(
    usuario_id      int auto_increment
        primary key,
    celular         varchar(255) null,
    contrasenia     varchar(255) null,
    participante_id int          null,
    estado          varchar(20)  null,
    created_at      timestamp    null,
    updated_at      timestamp    null,
    user_created    int          null,
    constraint psg_ususarios_celular_uindex
        unique (celular),
    constraint psg_ususarios_mdl_participante_id_participante_fk
        foreign key (participante_id) references mdl_participante (id_participante)
);

create table psg_roles
(
    rol_id       int auto_increment primary key,
    nombre_rol   varchar(255) null,
    estado       varchar(20)  null,
    created_at   timestamp    null,
    updated_at   timestamp    null,
    user_created int          null
);

create table psg_usuario_roles
(
    usuario_rol_id int auto_increment primary key,
    usuario_id     int         null,
    rol_id         int         null,
    estado         varchar(20) null,
    created_at     timestamp   null,
    updated_at     timestamp   null,
    user_created   int         null,
    constraint psg_usuario_roles_psg_roles_rol_id_fk foreign key (rol_id) references psg_roles (rol_id),
    constraint psg_usuario_roles_psg_ususarios_usuario_id_fk foreign key (usuario_id) references psg_usuarios (usuario_id)
);

