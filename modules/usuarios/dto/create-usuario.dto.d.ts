export declare class CreateUsuarioDto {
    email: string;
    nombre: string;
    apellido: string;
    password: string;
    rol: 'admin' | 'relator';
    comision_id?: string;
}
