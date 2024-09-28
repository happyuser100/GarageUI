export interface GarageResult {
    data: GarageItem[];
    status: string;
}

export class GarageItem {
    _id: string = "";
    mispar_mosah: number = 0;
    shem_mosah: string = "";
    cod_sug_mosah: number = 0;
    sug_mosah: string = "";
    ktovet: string = "";
    yishuv: string = "";
    telephone: string = "";
    mikud: number = 0;
    cod_miktzoa: number = 0;
    miktzoa: string = "";
    menahel_miktzoa: string = "";
    rasham_havarot: number = 0;
    TESTIME: string = "";
    isFromAPI: boolean =  true;
}
