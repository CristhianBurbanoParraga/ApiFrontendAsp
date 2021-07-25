var idaux = null;
var dateaux = '';

function GetDataById(id) {
    $.ajax({
        type: "GET",
        url: "https://localhost:44319/api/covid/" + id,
        dataType: "json",
        beforeSend: function () {
            document.getElementById('btnsave').style.display = 'none';
            document.getElementById('btnupdate').style.display = 'block';
        },
        success: function (data) {
            document.getElementById('continente').value = data['continent'];
            document.getElementById('pais').value = data['country'];
            document.getElementById('ciudad').value = data['city'];
            dateaux = data['date'];
            document.getElementById('positivo').value = data['positiveCases'];
            document.getElementById('muerte').value = data['confirmedDeaths'];
            document.getElementById('recuperado').value = data['recoveredPeople'];
            document.getElementById('usuario').value = data['userName'];
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR + "\n" + textStatus + "\n" + errorThrown);
        }
    });
}

function DeleteDataById (id) {
    $.ajax({
        type: "DELETE",
        url: "https://localhost:44319/api/covid/" + parseInt(id),
        beforeSend: function () {

        },
        success: function (data) {
            swal("Peticion exitosa!", "Datos eliminados correctamente!", "success");
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR + "\n" + textStatus + "\n" + errorThrown);
        }
    });
}

function readJson(data) {
    for (let i = 0; i < data.length; i++) {
        document.getElementById('tbody').innerHTML += `<tr>
                                        <th scope="row">`+ data[i].id + `</th>
                                        <td>`+ data[i].continent + `</td>
                                        <td>`+ data[i].country + `</td>
                                        <td>`+ data[i].city + `</td>
                                        <td>`+ data[i].date + `</td>
                                        <td>`+ data[i].positiveCases + `</td>
                                        <td>`+ data[i].confirmedDeaths + `</td>
                                        <td>`+ data[i].recoveredPeople + `</td>
                                        <td>`+ data[i].userName + `</td>
                                        <td><button type="button" class="btn btn-warning" data-bs-toggle="modal"
                                            data-bs-target="#miModal" data-id="`+ data[i].id + `">Actualizar</button></td>
                                        <td><button type="button" class="btn btn-danger" data-id="`+ data[i].id + `">Borrar</button></td>
                                    </tr>`;
        const btnsUpdate = document.querySelectorAll('.btn-warning');
        btnsUpdate.forEach(btn => {
            btn.addEventListener('click', function (e) {
                idaux = e.target.dataset.id;
                GetDataById(idaux);
            });
        });
        const btnsDelete = document.querySelectorAll('.btn-danger');
        btnsDelete.forEach(btn => {
            btn.addEventListener('click', function (e) {
                idaux = e.target.dataset.id;
                DeleteDataById(idaux);
            });
        });
    }
}

window.addEventListener('load', function () {
    $.ajax({
        type: "GET",
        url: "https://localhost:44319/api/covid/",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (data) {
            readJson(data);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR + "\n" + textStatus + "\n" + errorThrown);
        }
    });
});

document.getElementById('btninsert').addEventListener('click', function () {
    document.getElementById('btnsave').style.display = 'block';
    document.getElementById('btnupdate').style.display = 'none';
});

function clear() {
    document.getElementById('continente').value = '';
    document.getElementById('pais').value = '';
    document.getElementById('ciudad').value = '';
    document.getElementById('positivo').value = '';
    document.getElementById('muerte').value = '';
    document.getElementById('recuperado').value = '';
    document.getElementById('usuario').value = '';
}

document.getElementById('btnsave').addEventListener('click', function () {
    const tiempoTranscurrido = Date.now();
    const hoy = new Date(tiempoTranscurrido);
    var jsondata = {
        continent: document.getElementById('continente').value,
        country: document.getElementById('pais').value,
        city: document.getElementById('ciudad').value,
        date: hoy.toDateString(),
        positiveCases: parseInt(document.getElementById('positivo').value),
        confirmedDeaths: parseInt(document.getElementById('muerte').value),
        recoveredPeople: parseInt(document.getElementById('recuperado').value),
        userName: document.getElementById('usuario').value
    };
    $.ajax({
        type: "POST",
        url: "https://localhost:44319/api/covid/",
        contentType: 'application/json',
        data: JSON.stringify(jsondata),
        beforeSend: function () {

        },
        success: function (data) {
            clear();
            swal("Peticion exitosa!", "Datos registados correctamente!", "success");
        },
        error: function (jqXHR, textStatus, errorThrown) {

        }
    });
});

document.getElementById('btnupdate').addEventListener('click', function (e) {
    var jsondata = {
        id: parseInt(idaux),
        continent: document.getElementById('continente').value,
        country: document.getElementById('pais').value,
        city: document.getElementById('ciudad').value,
        date: dateaux,
        positiveCases: parseInt(document.getElementById('positivo').value),
        confirmedDeaths: parseInt(document.getElementById('muerte').value),
        recoveredPeople: parseInt(document.getElementById('recuperado').value),
        userName: document.getElementById('usuario').value
    };
    $.ajax({
        type: "PUT",
        url: "https://localhost:44319/api/covid/" + parseInt(idaux),
        contentType: 'application/json',
        data: JSON.stringify(jsondata),
        beforeSend: function () {

        },
        success: function (data) {
            clear();
            swal("Peticion exitosa!", "Datos actualizados correctamente!", "success");
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR + "\n" + textStatus + "\n" + errorThrown);
        }
    });
});
