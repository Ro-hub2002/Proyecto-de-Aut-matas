function ExportToExcel(fileExtension, fileName) {
    var elt = document.getElementById('tabla');
    var wb = XLSX.utils.table_to_book(elt, { sheet: "Estudiantes" });
    return XLSX.writeFile(wb, fileName+"."+fileExtension || ('MySheetName.' + (fileExtension || 'xlsx')));
  
 }

