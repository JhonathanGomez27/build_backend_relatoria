import { ConfigType } from '@nestjs/config';
import config from 'src/config';
import { AxiosInstance } from 'axios';
export declare class AxiosService {
    private readonly configSerivce;
    url_api: string;
    axiosinstance: AxiosInstance;
    constructor(configSerivce: ConfigType<typeof config>);
    getSesiones(): Promise<{
        ok: boolean;
        data: any;
    }>;
    getTranscripciones(idSesion: any): Promise<{
        ok: boolean;
        data: any;
    }>;
    sincronizarSesiones(idSesion: any): Promise<{
        ok: boolean;
        data: any;
    }>;
}
