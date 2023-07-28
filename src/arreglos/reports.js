export const reports = [
  {
    id: 1,
    nombre: "FEMCO_REPORTE",
  },
  {
    id: 2,
    nombre: "FEMCO_REPORTE_VALIDACION",
  },
  {
    id: 3,
    nombre: "REPORTE_SLA_COMPLETO",
  },
  {
    id: 4,
    nombre: "XPERTAL_REPORTE_VALIDACION",
  },
  {
    id: 5,
    nombre: "INVEX_REPORTE_VALIDACION",
  },
  {
    id: 6,
    nombre: "UVM_REPORTE_VALIDACION",
  },
];

export const dataZip = [
  { id: 1, name: "reportes.zip", name_path: "excels", type: "" },
  { id: 2, name: "reportes_femco.zip", name_path: "excels_femco", type: "FEMCO" },
];

export const mailCabecera = [
  "RFC_EMPRESA",
  "EMPRESA_CONTRATANTE",
  "RFC_PROVEEDOR",
  "RAZON_SOCIAL",
  "AÑO",
  "MES",
  "MES_CUMPLIMIENTO",
  "TIPO_DOCUMENTO",
  "ESTATUS",
  "Score",
  "SCORE_GLOBAL",
  "RECARGA",
  "FECHA_CARGA",
  "FECHA_VALIDACION",
  "DIAS",
  "SLA",
  "FACTURO",
  "PAGADO",
  "REGIMEN_ESPECIAL",
];

export const styleCabeceras = {
  font: {
    color: "#ffffff",
    size: 11,
    bold: true,
  },
  fill: {
    type: "pattern",
    patternType: "solid",
    bgColor: "#4472C4",
    fgColor: "#4472C4",
  },
  border: {
    left: {
      style: "thin",
      color: "black",
    },
    right: {
      style: "thin",
      color: "black",
    },
    top: {
      style: "thin",
      color: "black",
    },
    bottom: {
      style: "thin",
      color: "black",
    },
    outline: false,
  },
};

export const styleCells = {
  font: {
    color: "#000000",
    size: 11,
  },
  border: {
    left: {
      style: "thin",
      color: "black",
    },
    right: {
      style: "thin",
      color: "black",
    },
    top: {
      style: "thin",
      color: "black",
    },
    bottom: {
      style: "thin",
      color: "black",
    },
    outline: false,
  },
};
