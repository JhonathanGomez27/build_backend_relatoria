export declare enum logEnum {
    CERRAR_SESION = "cerrar sesion",
    INICIAR_SESION = "iniciar sesion",
    CREAR_USUARIO = "crear usuario",
    ELIMINAR_USUARIO = "eliminar usuario",
    EDITAR_USUARIO = "editar usuario",
    CONSULTA_COMISION = "consulta comision",
    CONSULTA_SESION = "consulta sesion",
    DESCARGA_MULTIMEDIA = "descarga multimedia"
}
export declare class Log {
    id: string;
    accion: 'cerrar sesion' | 'iniciar sesion' | 'crear usuario' | 'eliminar usuario' | 'editar usuario' | 'consulta comision' | 'consulta sesion' | 'descarga multimedia';
    usuario: string;
    fecha: Date;
    createdAt: Date;
    updatedAt: Date;
}
