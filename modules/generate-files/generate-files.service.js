"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerateFilesService = void 0;
const common_1 = require("@nestjs/common");
const pdfData_1 = require("../../utils/generate-files/pdfData");
const datos_1 = require("../../utils/generate-files/datos");
const html_pdf_node_1 = require("html-pdf-node");
const html_to_docx_1 = require("html-to-docx");
const fs_1 = require("fs");
let GenerateFilesService = class GenerateFilesService {
    constructor() {
        this.imagen = pdfData_1.imagenCongreso;
        this.minutoaminuto = datos_1.datosMinutoAMinuto;
    }
    getRecordHTML(params) {
        let getCover = () => {
            return `<div class="portrait" >
                <div class="portrait-image" ></div>
                <p class="xl-title" >${params.sesion.titulo}</p>
                <p class="large-title" >${params.sesion.fecha}</p>
                <p class="small-title" style="margin-bottom: 40px;" >${params.sesion.subtitulo}</p>
                <p class="small-title" >Delphi Analytics</p>
                <p class="small-title" >Dintelligent | ${params.sesion.fecha}</p>
            </div>`;
        };
        let getBackCover = () => {
            return `<div class="portrait" >
                <p class="xl-title" >TRANSCRIPCIÓN DE AUDIO</p>
                <p class="large-title" style="margin-bottom: 40px;" >Sesión ${params.sesion.fecha}</p>
                <p class="large-title" >DINTELLIGENT</p>
                <p class="small-title" >Procesado por Delphi Analytics</p>
            </div>`;
        };
        let getPieces = () => {
            return `<div class="record-text" >${params.sesion.piezas.reduce((p, c) => p + "<br/><br/>" + c, "")}</div>`;
        };
        return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Minuto a minuto</title>
        </head>
        <body>
            <style>
                * {
                    padding: 0px;
                    margin: 0px;
                }
                
                html { 
                    -webkit-print-color-adjust: exact;
                }
                
                .portrait {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    min-height: 1475px;
                    min-width: 900px;
                    position: relative;
                    gap:10px;
                }
                
                .portrait-image {
                    background-image: url(${pdfData_1.imagenCongreso});
                    min-height: 350px;
                    min-width: 350px;
                    border-radius: 10px;
                    top: 0px;
                    left: 0px;
                    opacity: 0.8;
                    background-size: cover;
                    background-position: center;
                    filter: saturate(1.4);
                    margin-bottom: 20px;
                }

                .record-title {
                    color: rgb(31, 0, 56);
                    border-bottom: 1px solid rgb(31, 0, 56);
                    font-weight: bolder;
                    font-size: 25px;
                }

                .record-text {
                    font-size: 20px;
                }

                .xl-title {
                    font-size: 40px;
                    font-weight: bolder;
                    text-align: center;
                }
                
                .large-title {
                    font-size: 30px;
                    font-weight: bolder;
                    text-align: center;
                }

                .small-title {
                    font-size: 20px;
                    text-align: center;
                }
            </style>
            ${getCover()}
            ${getBackCover()}
            <p class="record-title" >TRANSCRIPCIÓN DE AUDIO</p>
            <br/><br/>
            <div class="records" >
            ${getPieces()}
            </div>
        </body>
        </html>
        `;
    }
    getRecordWordHTML(params) {
        let getCover = () => {
            return `<div class="" >
                <img class="portrait-image" align="center" style="height: 350px; width: 350px; text-align: center;" src="${pdfData_1.imagenCongreso}" />
                <h1 style="text-align: center;" >${params.sesion.titulo}</h1>
                <h2 style="text-align: center;" >${params.sesion.fecha}</h2>
                <p style="margin-bottom: 40px; text-align: center;" >${params.sesion.subtitulo}</p>
                <p style="text-align: center;" >Delphi Analytics</p>
                <p style="text-align: center;" >Dintelligent | ${params.sesion.fecha}</p>
            </div>`;
        };
        let getBackCover = () => {
            return `<div class="portrait" >
                <h1 style="text-align: center;" >TRANSCRIPCIÓN DE AUDIO</h1>
                <h2 style="margin-bottom: 40px; text-align: center;" >Sesión ${params.sesion.fecha}</h2>
                <h3 style="text-align: center;" >DINTELLIGENT</h3>
                <p style="text-align: center;" class="small-title" >Procesado por Delphi Analytics</p>
            </div>`;
        };
        let getPieces = () => {
            return `<div class="record-text" >${params.sesion.piezas.reduce((p, c) => p + "<br/>" + c, "")}</div>`;
        };
        return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Minuto a minuto</title>
        </head>
        <body>
            <br/><br/>
            ${getCover()}
            <br/><br/><br/><br/><br/><br/><br/>
            <br/><br/><br/><br/><br/><br/><br/>
            <br/><br/><br/><br/><br/><br/><br/>
            ${getBackCover()}
            <br/><br/><br/><br/><br/><br/>
            <br/><br/><br/><br/><br/><br/>
            <h2 class="record-title" >TRANSCRIPCIÓN DE AUDIO</h2>
            <div class="records" >
            ${getPieces()}
            </div>
        </body>
        </html>
        `;
    }
    async sesionToPDF(sesion) {
        let dimensions = {
            w: 900,
            h: 1400
        };
        let today_date = new Date().toISOString().split('T')[0];
        let pdfBuffer = await html_pdf_node_1.default.generatePdf({
            content: this.getRecordHTML({ sesion, dimensions })
        }, {
            width: dimensions.w,
            height: dimensions.h,
            margin: { top: 60, right: 60, bottom: 60, left: 60 },
            displayHeaderFooter: true,
            footerTemplate: `
            <div style="font-size: 10px; display: flex; flex-direction: row; justify-content: space-between; padding: 1px 20px; min-width: 94%; color: #ddd;" >
                <p>Congreso de la república.</p>
                <p>
                    <span class="pageNumber" ></span> /
                    <span class="totalPages" ></span>
                </p>
            </div>
            `,
            headerTemplate: "<b></b>"
        });
        return pdfBuffer;
    }
    async sesionToWord(sesion) {
        let dimensions = {
            w: 900,
            h: 1400
        };
        let today_date = new Date().toISOString().split('T')[0];
        let buffer = await (0, html_to_docx_1.default)(this.getRecordWordHTML({ sesion, dimensions }), null, {
            table: { row: { cantSplit: true } },
            footer: true,
            pageNumber: true,
        });
        return buffer;
    }
    minuteByMinuteToXML(mbm) {
        return Buffer.from(`<?xml version="1.0"?>
    <sesion>
        <nombre>${mbm.nombre}</nombre>
        <piezas>
    ${mbm.piezas.reduce((p, c) => p + "\t\t<pieza minuto=\"" + (c.minuto ?? 0) + "\">" + (c.text || "") + "</pieza>\n", "")}    </piezas>
    </sesion>`, "utf8");
    }
    minuteByMinuteToSesionPieces(mbm) {
        let today_date = new Date().toISOString().split('T')[0];
        let pieces = mbm.piezas.reduce((p, c) => p + (c.text || ""), "").trim().replace(/\s+/g, ' ').split("[").filter(e => e != "").map(e => "[" + e);
        return {
            fecha: today_date,
            titulo: mbm.nombre,
            subtitulo: "Congreso de la república",
            piezas: pieces
        };
    }
    async generateFiles() {
        this.sesionToPDF(datos_1.datosSesion).then(buffer => {
            fs_1.default.writeFileSync("grabacion-audio.pdf", buffer);
        }).catch(err => console.log(err));
        this.sesionToWord(datos_1.datosSesion).then(buffer => {
            fs_1.default.writeFileSync("grabacion-audio.docx", buffer);
        }).catch(err => console.log(err));
        fs_1.default.writeFileSync("grabacion-audio.xml", this.minuteByMinuteToXML(datos_1.datosMinutoAMinuto));
        this.sesionToPDF(this.minuteByMinuteToSesionPieces(datos_1.datosMinutoAMinuto)).then(buffer => {
            fs_1.default.writeFileSync("grabacion-audio-min2min.pdf", buffer);
        }).catch(err => console.log(err));
        this.sesionToWord(this.minuteByMinuteToSesionPieces(datos_1.datosMinutoAMinuto)).then(buffer => {
            fs_1.default.writeFileSync("grabacion-audio-min2min.docx", buffer);
        }).catch(err => console.log(err));
    }
};
exports.GenerateFilesService = GenerateFilesService;
exports.GenerateFilesService = GenerateFilesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], GenerateFilesService);
//# sourceMappingURL=generate-files.service.js.map