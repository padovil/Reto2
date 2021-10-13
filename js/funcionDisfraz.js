
function consultar() {
    $("#IdTxt").hide();
    $("#brandTxt").hide();
    $("#modelTxt").hide();
    $("#categoryTxt").hide();
    $("#nameTxt").hide();
    $("#1").hide();
    $("#2").hide();
    $("#3").hide();
    $("#4").hide();
    $("#5").hide();
    $("#6").hide();

    $("#disfraces").show();
    $("#conteo").show();


    $.ajax(
        {
            url: 'https://g34a49d3a8bd866-dbdizfraces.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/costume/costume',
            type: 'GET',
            dataType: 'json',
            success: function (json) {


                $("#idDivConsulta").empty();

                $("#idDivConsulta").append('<table id="tblConsulta" class="table table-bordered table-hover textColor" style="width: 100%"><tr style="font-weight: bold;background-color: #04aa6d;color: white;text-align: center;"><th class="bold">ID</th><th class="bold">BRAND</th><th class="bold">MODEL</th><th class="bold">CATEGORY ID</th><th class="bold">NAME</th><th class="bold">ELIMINAR</th><th class="bold">EDITAR</th></tr></table>');

                if (json.items.length < 1) {
                    $("#idDivConsulta").append('<h1>No hay registros para mostrar</h1>');
                }

                for (i = 0; i < json.items.length; i++) {
                    $("#idDivConsulta").append('<table id="tblConsulta" class="table table-bordered table-hover textColor" style="width: 100%"><tr><tr><td><div class="tabla"><a class="ver" href="javascript:;" onclick="consultarId(' + json.items[i].id + ')"> ' + json.items[i].id + ' </a></div></td><td><div class="tabla">' + json.items[i].brand + '</div></td><td><div class="tabla">' + json.items[i].model + '</div></td><td><div class="tabla">' + json.items[i].category_id + '</div></td><td><div class="tabla">' + json.items[i].name + '</div></td><td><div class="tabla"><a type=button href="javascript:borrar(' + json.items[i].id + ')"> <img src="https://cdn.icon-icons.com/icons2/868/PNG/128/trash_bin_icon-icons.com_67981.png" width="20" height="20"> </a></div></td><td><div class="tabla"><a type=button href="javascript:modificar(' + json.items[i].id + ')"> <img src="https://image.flaticon.com/icons/png/512/104/104668.png" width="20" height="20"> </a></div></td></tr></table>');
                }


                $("#IdTxt").val(json.items[0].id);
                $("#brandTxt").val(json.items[0].brand);
                $("#modelTxt").val(json.items[0].model);
                $("#categoryTxt").val(json.items[0].category_id);
                $("#nameTxt").val(json.items[0].name);

                console.log(json)
            },

            error: function (xhr, status) {

                console.log(xhr)
            }

        }
    );


}
function insertar() {
    $("#IdTxt").hide();
    $("#brandTxt").hide();
    $("#modelTxt").hide();
    $("#categoryTxt").hide();
    $("#nameTxt").hide();
    $("#1").hide();
    $("#2").hide();
    $("#3").hide();
    $("#4").hide();
    $("#5").hide();
    $("#6").hide();




    var data;
    var id, brand, model, category_id, name;


    id = $("#id").val();
    brand = $("#brand").val();
    model = $("#model").val();
    category_id = $("#category_id").val();
    name = $("#name").val();

    data = { id: id, brand: brand, model: model, category_id: category_id, name: name };


    $.ajax(
        {
            url: 'https://g34a49d3a8bd866-dbdizfraces.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/costume/costume',
            type: 'POST',
            data: data,

            success: function (response) {

                window.alert("Disfraz registrado satisfactoriamente");
                window.location = "reto2.html";
                console.log(response);
            },
            error: function (xhr, status) {
                window.alert("Ha ocurrido un error, vuelve a intentarlo");
                window.location = "registroMensaje.html";
                console.log(xhr);

            }
        }
    );
}

function borrar(id) {
    $("#IdTxt").hide();
    $("#brandTxt").hide();
    $("#modelTxt").hide();
    $("#categoryTxt").hide();
    $("#nameTxt").hide();
    $("#1").hide();
    $("#2").hide();
    $("#3").hide();
    $("#4").hide();
    $("#5").hide();
    $("#6").hide();

    $("#disfraces").show();
    $("#conteo").show();

    var data, datosEnvio;


    data = { id: id };
    datosEnvio = JSON.stringify(data);

    $.ajax(
        {

            url: 'https://g34a49d3a8bd866-dbdizfraces.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/costume/costume',
            type: 'DELETE',
            data: datosEnvio,
            contentType: 'application/json',

            success: function (response) {
                window.alert("Disfraz borrado satisfactoriamente");
                consultar();
                conteo();
                console.log(response);

            },
            error: function (xhr, status) {
                window.alert("Ha ocurrido un error, vuelve a intentarlo");
                console.log(xhr);

            }
        }
    )
}

function actualizar() {
    $("#IdTxt").hide();
    $("#brandTxt").hide();
    $("#modelTxt").hide();
    $("#categoryTxt").hide();
    $("#nameTxt").hide();
    $("#1").hide();
    $("#2").hide();
    $("#3").hide();
    $("#4").hide();
    $("#5").hide();
    $("#6").hide();

    $("#disfraces").show();
    $("#conteo").show();

    var id, brand, model, category_id, name;

    id = $("#IdTxt").val();
    brand = $("#brandTxt").val();
    model = $("#modelTxt").val();
    category_id = $("#categoryTxt").val();
    name = $("#nameTxt").val();

    data = { id: id, brand: brand, model: model, category_id: category_id, name: name };
    datosEnvio = JSON.stringify(data);

    $.ajax(
        {

            url: 'https://g34a49d3a8bd866-dbdizfraces.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/costume/costume',
            type: 'PUT',
            data: datosEnvio,
            contentType: 'application/json',

            success: function (response) {
                window.alert("Disfraz actualizado satisfactoriamente");
                // window.location = "visualizarMensajes.html";
                console.log(response);
                consultar();
                conteo();
            },
            error: function (xhr, status) {
                window.alert("Ha ocurrido un error, vuelve a intentarlo");
                console.log(xhr);

            }

        }
    );


}

function modificar(_id) {

    $("#IdTxt").val(_id);

    $.ajax(
        {

            url: 'https://g34a49d3a8bd866-dbdizfraces.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/costume/costume/' + _id,
            type: 'GET',
            dataType: 'json',

            success: function (json) {

                $("#IdTxt").val(json.items[0].id);
                $("#brandTxt").val(json.items[0].brand);
                $("#modelTxt").val(json.items[0].model);
                $("#categoryTxt").val(json.items[0].category_id);
                $("#nameTxt").val(json.items[0].name);


                $("#IdTxt").show();
                $("#brandTxt").show();
                $("#modelTxt").show();
                $("#categoryTxt").show();
                $("#nameTxt").show();
                $("#1").show();
                $("#2").show();
                $("#3").show();
                $("#4").show();
                $("#5").show();
                $("#6").show();

                $("#disfraces").hide();
                $("#conteo").hide();

                console.log(json)
            },
            error: function (xhr, status) {
                console.log(xhr)
            },
        }
    );

}



function consultarId(id) {
    if (id < 0) {
        var id = $("#buscarDisfraz").val();
    } else {
        id = id
    }

    $("#IdTxt").hide();
    $("#brandTxt").hide();
    $("#modelTxt").hide();
    $("#categoryTxt").hide();
    $("#nameTxt").hide();
    $("#1").hide();
    $("#2").hide();
    $("#3").hide();
    $("#4").hide();
    $("#5").hide();
    $("#6").hide();

    $("#disfraces").hide();
    $("#conteo").hide();

    $.ajax(
        {

            url: 'https://g34a49d3a8bd866-dbdizfraces.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/costume/costume/' + id,
            type: 'GET',
            dataType: 'json',

            success: function (json) {
                if (json.items.length < 1) {
                    $("#idDivConsulta").append('<h1>No hay registros para mostrar</h1>');
                }
                else {


                    $("#idDivConsulta").empty();

                    $("#idDivConsulta").append("<br><br>");
                    $("#idDivConsulta").append('<h1>ID: <input type="text" class="bloquear"  id="txtId" readonly="readonly" placeholder="' + json.items[0].id + '"></h1>');
                    $("#idDivConsulta").append("<br>");

                    $("#idDivConsulta").append('<h3>BRAND: <input type="text" class="bloquear" id="IdMessage" readonly="readonly" value="' + json.items[0].brand + '"></h3>');

                    $("#idDivConsulta").append('<h3>MODEL: <input type="text" class="bloquear" id="IdMessage" readonly="readonly" value="' + json.items[0].model + '"></h3>');

                    $("#idDivConsulta").append('<h3>CATEGORY ID: <input type="text" class="bloquear" id="IdMessage" readonly="readonly" value="' + json.items[0].category_id + '"></h3>');

                    $("#idDivConsulta").append('<h3>NAME: <input type="text" class="bloquear" id="IdMessage" readonly="readonly" value="' + json.items[0].name + '"></h3>');

                    $("#idDivConsulta").append('<a type=button class="modificar" href="javascript:modificar(' + json.items[i].id + ')">Actualizar</a>');
                    $("#idDivConsulta").append('<br><br><br><br>');
                    $("#idDivConsulta").append('<a type=button class="borrar" href="javascript:borrar(' + json.items[0].id + ');">Eliminar</a>');

                    $("#IdTxt").val(json.items[0].id);
                    $("#brandTxt").val(json.items[0].brand);
                    $("#modelTxt").val(json.items[0].model);
                    $("#categoryTxt").val(json.items[0].category_id);
                    $("#nameTxt").val(json.items[0].name);
                }
                console.log(json)
            },
            error: function (xhr, status) {
                console.log(xhr)
            },
        }
    );
}

function inicio() {
    window.location = "reto2.html";
}


function conteo() {

    $.ajax(
        {
            url: 'https://g34a49d3a8bd866-dbdizfraces.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/costume/costume',
            type: 'GET',
            dataType: 'json',
            success: function (json) {

                var prueba = json.items.length;


                $("#conteo").val(prueba);
                $("#clientes").show();

                $("#IdTxt").hide();
                $("#brandTxt").hide();
                $("#modelTxt").hide();
                $("#categoryTxt").hide();
                $("#nameTxt").hide();
                $("#1").hide();
                $("#2").hide();
                $("#3").hide();
                $("#4").hide();
                $("#5").hide();
                $("#6").hide();


                console.log(json)
            },

            error: function (xhr, status) {
                console.log(xhr)
            }

        }
    );


}