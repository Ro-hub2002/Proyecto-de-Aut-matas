expRegNombre = /^[a-zA-ZÀ-ÿ\s]{1,40}$/; // Letras y espacios, pueden llevar acentos.
expRegCodigo = /^[1-9]{1}[0-9]{7}$/; // / 7 digitos numericos y que no empiece por 0
expRegFecha = /^\d{4}[\-\/\s]?((((0[13578])|(1[02]))[\-\/\s]?(([0-2][0-9])|(3[01])))|(((0[469])|(11))[\-\/\s]?(([0-2][0-9])|(30)))|(02[\-\/\s]?[0-2][0-9]))$/;
expRegDireccion = /^[a-zA-z0-9\s-|#]*$/;
expRegTelefono_fijo = /^[0-9]{7}$/; // Que contenga 7 números
expRegTelefono = /^[3][0-9]{9}$/; // Que comience por 3 y que contenga 10 números
expRegEmail = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;

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
        var workbook = XLSX.read(data, {type:'binary',cellText:false,cellDates:true});
        let students = [];
        workbook.SheetNames.map(function(sheetName, index) {
            const objects = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName], {header:1,raw:false,dateNF:'yyyy-mm-dd'});
              objects.map((student, index) => {
                if(index !== 0){
                  students.push({
                    name: student[0],
                    code: student[1],
                    date: student[2],
                    address: student[3],
                    tel: student[4],
                    phone: student[5],
                    email: student[6]
                  });
                }
              });
          })
        let estudiantesBuenos = [];
        students.forEach(student => {
          if(expRegNombre.test(student.name) && expRegCodigo.test(student.code) && expRegFecha.test(student.date) && expRegDireccion.test(student.address) && expRegTelefono_fijo.test(student.tel) && expRegTelefono.test(student.phone) && expRegEmail.test(student.email)){
            estudiantesBuenos.push(student);
          }
        });
        let tr = "";
        let trasladarTablaRef = document.getElementById("tabla");
        estudiantesBuenos.forEach(student => {
          let trasladarfilas = trasladarTablaRef.insertRow(-1);

	let nuevaCeldaref = trasladarfilas.insertCell(0);
	nuevaCeldaref.textContent = student.name;

	nuevaCeldaref = trasladarfilas.insertCell(1);
	nuevaCeldaref.textContent = student.code;

	nuevaCeldaref = trasladarfilas.insertCell(2);
	nuevaCeldaref.textContent = student.date;

	nuevaCeldaref = trasladarfilas.insertCell(3);
	nuevaCeldaref.textContent = student.address;

	nuevaCeldaref = trasladarfilas.insertCell(4);
	nuevaCeldaref.textContent = student.tel;

	nuevaCeldaref = trasladarfilas.insertCell(5);
	nuevaCeldaref.textContent = student.phone;

	nuevaCeldaref = trasladarfilas.insertCell(6);
	nuevaCeldaref.textContent = student.email;
        });
        
    }; 
    reader.readAsBinaryString(file);
});