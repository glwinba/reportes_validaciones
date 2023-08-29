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
  {
    id: 2,
    name: "reportes_femco.zip",
    name_path: "excels_femco",
    type: "FEMCO",
  },
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

export const cellsExcel = [
  { nombre: "RFC_EMPRESA", type: "string" },
  { nombre: "EMPRESA_CONTRATANTE", type: "string" },
  { nombre: "RFC_PROVEEDOR", type: "string" },
  { nombre: "RAZON_SOCIAL", type: "string" },
  { nombre: "AÑO", type: "number" },
  { nombre: "MES", type: "string" },
  { nombre: "MES_CUMPLIMIENTO", type: "string" },
  { nombre: "TIPO_DOCUMENTO", type: "string" },
  { nombre: "ESTATUS", type: "number" },
  { nombre: "Score", type: "string" },
  { nombre: "SCORE_GLOBAL", type: "string" },
  { nombre: "RECARGA", type: "number" },
  { nombre: "fecha_carga", type: "string" },
  { nombre: "fecha_validacion", type: "string" },
  { nombre: "DIAS", type: "number" },
  { nombre: "SLA", type: "number" },
  { nombre: "FACTURO", type: "number" },
  { nombre: "PAGADO", type: "number" },
  { nombre: "REGIMEN_ESPECIAL", type: "string" },
];

export const headboardFileValidate = (column) => {
  if (column) {
    return [
      "EMPRESA_CONTRATANTE",
      "RAZON_SOCIAL",
      "AÑO",
      "MES",
      "MES_CUMPLIMIENTO",
      "TIPO_DOCUMENTO",
      "FECHA_CARGA",
      column,
    ];
  }
  return [
    "EMPRESA_CONTRATANTE",
    "RAZON_SOCIAL",
    "AÑO",
    "MES",
    "MES_CUMPLIMIENTO",
    "TIPO_DOCUMENTO",
    "FECHA_CARGA",
  ];
};

export const cellsExcelFileValidate = (column) => {
  if (column) {
    return [
      { nombre: "EMPRESA_CONTRATANTE", type: "string" },
      { nombre: "RAZON_SOCIAL", type: "string" },
      { nombre: "AÑO", type: "number" },
      { nombre: "MES", type: "string" },
      { nombre: "MES_CUMPLIMIENTO", type: "string" },
      { nombre: "TIPO_DOCUMENTO", type: "string" },
      { nombre: "fecha_carga", type: "string" },
      { nombre: column, type: "string" },
    ];
  } else {
    return [
      { nombre: "EMPRESA_CONTRATANTE", type: "string" },
      { nombre: "RAZON_SOCIAL", type: "string" },
      { nombre: "AÑO", type: "number" },
      { nombre: "MES", type: "string" },
      { nombre: "MES_CUMPLIMIENTO", type: "string" },
      { nombre: "TIPO_DOCUMENTO", type: "string" },
      { nombre: "fecha_carga", type: "string" },
    ];
  }
};

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

export const styleCells = (estatus) => {
  let colorBackground = "";
  switch (estatus) {
    case 0:
      colorBackground = "#FF0000";
      break;
    case 1:
      colorBackground = "#FFC000";
      break;
    case 2:
      colorBackground = "#E7E6E6";
      break;
    case 3:
      colorBackground = "#FFFF00";
      break;
    case 4:
      colorBackground = "#92D050";
      break;
  }

  if (colorBackground != "") {
    return {
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
      fill: {
        type: "pattern",
        patternType: "solid",
        bgColor: colorBackground,
        fgColor: colorBackground,
      },
    };
  } else {
    return {
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
  }
};
