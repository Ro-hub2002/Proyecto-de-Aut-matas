document.getElementById('importar').addEventListener('click', () => {
    const file = document.getElementById('file');
    file.click();
});

document.getElementById('exportar').addEventListener('click', () => {
    let reader = new FileReader()
    const EXCEL_TYPE =
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
    const EXCEL_EXTENSION = '.xlsx'
    const worksheet = XLSX.utils.json_to_sheet(arrayGuardar)
    const workBook = {
      Sheets: { data: worksheet },
      SheetNames: ['data'],
    }
    const excelBuffer = XLSX.write(workBook, {
      bookType: 'xlsx',
      type: 'array',
    })
    const file = new Blob([excelBuffer], { type: EXCEL_TYPE })
    const a = document.createElement('a')
    a.style.display = 'none'
    reader.readAsDataURL(file)
    reader.onload = (response) => {
      a.href = response.target.result.toString()
      a.download = `Estudiantes${EXCEL_EXTENSION}`
      a.click()
      a.remove()
    }
});

document.getElementById('file').addEventListener('change', (e) => {
    const file = e.target.files[0];
    let reader = new FileReader();
    reader.onload = (repsonse) => {
        let data = repsonse.target.result;
        var workbook = XLSX.read(data, { type: 'binary' });
        workbook.SheetNames.forEach(function(sheetName) {
            var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
            var json_object = JSON.stringify(XL_row_object);
            //Esta es la informacion del excel
            console.log(json_object);
          })
    }; 
    reader.readAsBinaryString(file);
});