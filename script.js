const addButton = document.getElementById("add-row");
const moveUpButton = document.getElementById("move-row-up");
const moveDownButton = document.getElementById("move-row-down");
const deleteButton = document.getElementById("delete-row");
const refreshButton = document.getElementById("refresh-data");
const saveButton = document.getElementById("save-data");

let selectedRow = [];

let chemicalData = [
    {
    name: "Amyl acetate",
    vendor: "AM Chemicals",
    density: 1.245,
    viscosity: 1.4,
    packaging: "Plastic Bottle",
    packSize: 100,
    unit: "l",
    quantity: 30,
   },
   {

    name: "Aniline",
    vendor: "AN Chemicals",
    density: 1.018,
    viscosity: 3.85,
    packaging: "Glass Bottle",
    packSize: 200,
    unit: "g",
    quantity: 34,
   },
   {

    name: "Sodium bicarbonate",
    vendor: "SO Chemicals",
    density: 1.154,
    viscosity: 1.5,
    packaging: "Plastic Bottle",
    packSize: 150,
    unit: "g",
    quantity: 25,
   },
   {

    name: "Mercury",
    vendor: "MR Chemicals",
    density: 13.630,
    viscosity: 1.53,
    packaging: "Glass Bottle",
    packSize: 100,
    unit: "mm",
    quantity: 40,
  },
  {

    name: "Benzene",
    vendor: "BE Chemicals",
    density: 0.873,
    viscosity: 0.60,
    packaging: "Glass Bottle",
    packSize: 500,
    unit: "ml",
    quantity: 50,
  },
  {

    name: "Pyridine",
    vendor: "PY Chemicals",
    density: 0.979,
    viscosity: 0.88,
    packaging: "Glass Bottle",
    packSize: 100,
    unit: "ml",
    quantity: 46,
  },
  {

    name: "Fused alumina",
    vendor: "FU Chemicals",
    density: 2.452,
    viscosity: 1.9,
    packaging: "Paper Bag",
    packSize: 200,
    unit: "ml",
    quantity: 20,
  },
  {
    name: "Iron Pyrites",
    vendor: "IR Chemicals",
    density: 0.91,
    viscosity: 0.8,
    packaging: "Glass Bottle",
    packSize: 400,
    unit: "ml",
    quantity: 25,
  },
  {
  
    name: "Diethylene glycol",
    vendor: "DI Chemicals",
    density: 1.114,
    viscosity: 30.0,
    packaging: "Glass Bottle",
    packSize: 170,
    unit: "ml",
    quantity: 45,
  },
  {
   
    name: "Barium oxide",
    vendor: "BR Chemicals",
    density: 1.175,
    viscosity: 1.2,
    packaging: "Paper Bag",
    packSize: 120,
    unit: "kg",
    quantity: 55,
  },
  {
  
    name: "Tetrahydrofuran",
    vendor: "TE Chemicals",
    density: 0.880,
    viscosity: 0.46,
    packaging: "Plastic Bottle",
    packSize: 140,
    unit: "ml",
    quantity: 70,
  },
  {
   
    name: "Glycerol",
    vendor: "GY Chemicals",
    density: 1.257,
    viscosity: 937,
    packaging: "Plastic Bottle",
    packSize: 100,
    unit: "ml",
    quantity: 10,
  },
  {
  
    name: "Methyl acetate",
    vendor: "ME Chemicals",
    density: 0.927,
    viscosity: 0.36,
    packaging: "Glass Bottle",
    packSize: 140,
    unit: "ml",
    quantity: 40,
  },
  {
    
    name: "Boric acid",
    vendor: "BO Chemicals",
    density: 0.25,
    viscosity: 1.3,
    packaging: "Glass Bottle",
    packSize: 100,
    unit: "g",
    quantity: 65,
  },
  {
   
    name: "Potassium",
    vendor: "PS Chemicals",
    density: 1.125,
    viscosity: 1.7,
    packaging: "Glass Bottle",
    packSize: 50,
    unit: "ml",
    quantity: 75,
  },
];
getDataFromStorage();

// Function to generate table rows
function generateTableRows(data) {
  let rows = "";
  data.forEach((item) => {
    rows += `
            <tr>
                <td><input type="checkbox" onclick="selectRow(event)" data-row-id="${item.id}" /></td>
                <td oninput="changeValue(event)" data-row-id="${item.id}" data-row-name="name" contenteditable>${item.name}</td>
                <td oninput="changeValue(event)" data-row-id="${item.id}" data-row-name="vendor" contenteditable>${item.vendor}</td>
                <td oninput="changeValue(event)" data-row-id="${item.id}" data-row-name="density" contenteditable>${item.density}</td>
                <td oninput="changeValue(event)" data-row-id="${item.id}" data-row-name="viscosity" contenteditable>${item.viscosity}</td>
                <td oninput="changeValue(event)" data-row-id="${item.id}" data-row-name="packaging" contenteditable>${item.packaging}</td>
                <td oninput="changeValue(event)" data-row-id="${item.id}" data-row-name="packSize" contenteditable>${item.packSize}</td>
                <td oninput="changeValue(event)" data-row-id="${item.id}" data-row-name="unit" contenteditable>${item.unit}</td>
                <td oninput="changeValue(event)" data-row-id="${item.id}" data-row-name="quantity" contenteditable>${item.quantity}</td>
            </tr>
        `;
  });
  return rows;
}

function renderTable(data) {
  const table = document.querySelector("#chemicals-table tbody");
  table.innerHTML = generateTableRows(data);
}

renderTable(chemicalData);

addButton.addEventListener("click", () => {
  let rows = {
    id: chemicalData.length + 1,
    name: "",
    vendor: "",
    density: "",
    viscosity: "",
    packaging: "",
    packSize: "",
    unit: "",
    quantity: "",
  };
  chemicalData.push(rows);
  saveData();
  renderTable(chemicalData);
});

function saveData() {
  const newData = JSON.stringify(chemicalData);
  localStorage.setItem(LOCAL_STORAGE, newData);
}

function getDataFromStorage() {
  const newData = localStorage.getItem(LOCAL_STORAGE);
  let data = JSON.parse(newData) ? JSON.parse(newData) : chemicalData;
  sortList(data);
  return chemicalData;
}

function sortList(data) {
  chemicalData = data.sort(function (a, b) {
    return a.id - b.id;
  });
}

function selectRow(e) {
  const element = e.target;
  const id = Number(element.dataset.rowId);
  if (element.checked) {
    selectedRow.push(id);
  }
  else {
    selectedRow = selectedRow.filter((item) => item !== id);
  }
}

function changeValue(e) {
  const element = e.target;
  const value = element.innerHTML;
  const id = Number(element.dataset.rowId);
  const colName = element.dataset.rowName;
  chemicalData = chemicalData.map((row) => {
    if (row.id === id) {
      const obj = { ...row };
      obj[colName] = value;
      return obj;
    }
    return row;
  });
}

function moveUp() {
  for (let i = 1; i < chemicalData.length; i++) {
    const row = chemicalData[i];
    if (selectedRow.includes(row.id)) {
      chemicalData[i - 1].id = row.id;
      row.id -= 1;
    }
  }
  selectedRow = [];
  sortList(chemicalData);
  saveData();
  renderTable(chemicalData);
}

function moveDown() {
  for (let i = chemicalData.length - 2; i >= 0; i--) {
    const row = chemicalData[i];
    if (selectedRow.includes(row.id)) {
      chemicalData[i + 1].id = row.id;
      row.id += 1;
    }
  }
  selectedRow = [];
  sortList(chemicalData);
  saveData();
  renderTable(chemicalData);
}

saveButton.addEventListener('click', () => {
  saveData();
})

refreshButton.addEventListener('click', () => {
  getDataFromStorage();
  renderTable(chemicalData);
})

deleteButton.addEventListener('click', () => {
  for (let i = 0; i < chemicalData.length; i++) {
    const row = chemicalData[i];
    if (selectedRow.includes(row.id)) {
      chemicalData = chemicalData.filter((item) => item.id !== row.id);
    }
  }
  selectedRow = [];
  arrangeId();
  sortList(chemicalData);
  saveData();
  renderTable(chemicalData);
})

function arrangeId() {
  for (let i = 0; i < chemicalData.length; i++) {
    const row = chemicalData[i];
    row.id = i + 1;
  }
}