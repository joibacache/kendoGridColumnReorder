(function ($) {

    $.fn.gridColumnReorder = function ()
    {

        var grilla = this.getKendoGrid();
        console.log('test');

        function ObtenerIndiceColumnasNom()
        {
            var indiceColumnas = [];
            grilla.columns.forEach(function (elemento, indice) {
                indiceColumnas[elemento.field] = indice;
            });
            return indiceColumnas;
        }

        function ObtenerIndiceColumnasPos()
        {
            var indiceColumnas = [];
            grilla.columns.forEach(function (elemento, indice)
            {
                indiceColumnas[indice] = elemento.field;
            });
            return indiceColumnas;
        }

        function ObtenerOrdenColumnasGrillaCookie()
        {
            var nombreGrilla = grilla.element.attr("id");
            var cookie = document.cookie;
            var cookies = cookie.split(';');
            var datos = {};
            var path = window.location.pathname;

            for (var i = 0; i < cookies.length; i++) {
                var cookieAux = cookies[i];
                var indice = cookieAux.indexOf('=');
                var nombre = cookieAux.substr(0, indice);
                var cookieAux = cookieAux.substr(indice + 1);
                if (nombre.indexOf(path + "grilla_" + nombreGrilla) > -1) {
                    var columnas = cookieAux.split(",");
                    for (var j = 0; j < columnas.length; j++) {
                        datos[columnas[j]] = j;
                    }
                }
            }
            return datos;
        }

        function ActualizaPosicionColumnas()
        {
            var OrdenFinalColumnas = ObtenerOrdenColumnasGrillaCookie()
            var llaves = Object.keys(OrdenFinalColumnas);
            for (var i = 0; i < llaves.length; i++)
            {
                var IndicesColumnas = ObtenerIndiceColumnasNom();
                var indice = OrdenFinalColumnas[llaves[i]]
                grilla.reorderColumn(indice, grilla.columns[IndicesColumnas[llaves[i]]]);
            }
        }

        function onColumnReorder(e)
        {
            var closestGridElement = e.sender.element.closest('[data-role="grid"]');
            var nombreGrilla = closestGridElement.attr('id');
            var oldIndex = e.oldIndex;
            var newIndex = e.newIndex;
            var ordenColumnas = ObtenerIndiceColumnasPos(nombreGrilla);
            ordenColumnas[oldIndex] = "";
            var aux = e.column.field;
            if (newIndex < oldIndex) //hacia la izq
            {
                for (var i = oldIndex; i > newIndex; i--)
                {
                    ordenColumnas[i] = ordenColumnas[i - 1];
                }
            }
            else
            {
                for (var i = oldIndex; i < newIndex; i++) //hacia la der
                {
                    ordenColumnas[i] = ordenColumnas[i + 1];
                }
            }
            ordenColumnas[newIndex] = aux;
            var path = window.location.pathname;
            document.cookie = path + "grilla_" + nombreGrilla + "=" + ordenColumnas;
        }


        grilla.bind("columnReorder", onColumnReorder);
        ActualizaPosicionColumnas();

        return this;

    };

}(jQuery));





//function onColumnReorder(e) {
//    var closestGridElement = e.sender.element.closest('[data-role="grid"]');
//    var nombreGrilla = closestGridElement.attr('id');
//    var oldIndex = e.oldIndex;
//    var newIndex = e.newIndex;
//    var ordenColumnas = ObtenerIndiceColumnasPos(nombreGrilla);
//    ordenColumnas[oldIndex] = "";
//    var aux = e.column.field;
//    if (newIndex < oldIndex) //hacia la izq
//    {
//        for (var i = oldIndex; i > newIndex; i--) {
//            ordenColumnas[i] = ordenColumnas[i - 1];
//        }
//    }
//    else {
//        for (var i = oldIndex; i < newIndex; i++) //hacia la der
//        {
//            ordenColumnas[i] = ordenColumnas[i + 1];
//        }
//    }
//    ordenColumnas[newIndex] = aux;
//    var path = window.location.pathname;
//    document.cookie = path + "grilla_" + nombreGrilla + "=" + ordenColumnas;

//}


//function ObtenerIndiceColumnasNom(nombreGrilla) {
//    var grilla = $("#" + nombreGrilla).getKendoGrid();
//    var indiceColumnas = [];
//    grilla.columns.forEach(function (elemento, indice) {
//        indiceColumnas[elemento.field] = indice;
//    });
//    return indiceColumnas;
//}

//function ObtenerIndiceColumnasPos(nombreGrilla) {
//    var grilla = $("#" + nombreGrilla).getKendoGrid();
//    var indiceColumnas = [];
//    grilla.columns.forEach(function (elemento, indice) {
//        indiceColumnas[indice] = elemento.field;
//    });
//    return indiceColumnas;
//}




////function ObtenerOrdenColumnasGrillaCookie(nombreGrilla) {
////    var cookie = document.cookie;
////    var cookies = cookie.split(';');
////    var datos = {};
////    var path = window.location.pathname;

////    for (var i = 0; i < cookies.length; i++) {
////        var cookieAux = cookies[i];
////        var indice = cookieAux.indexOf('=');
////        var nombre = cookieAux.substr(0, indice);
////        var cookieAux = cookieAux.substr(indice + 1);
////        if (nombre.indexOf(path + "grilla_" + nombreGrilla) > -1) {
////            var columnas = cookieAux.split(",");
////            for (var j = 0; j < columnas.length; j++) {
////                datos[columnas[j]] = j;
////            }
////        }
////    }
////    return datos;
////}

////function ActualizaPosicionColumnas(nombreGrilla) {
////    var grilla = $("#" + nombreGrilla).getKendoGrid();
////    var OrdenFinalColumnas = ObtenerOrdenColumnasGrillaCookie(nombreGrilla)
////    var llaves = Object.keys(OrdenFinalColumnas);
////    for (var i = 0; i < llaves.length; i++) {
////        var IndicesColumnas = ObtenerIndiceColumnasNom(nombreGrilla);
////        var indice = OrdenFinalColumnas[llaves[i]]
////        grilla.reorderColumn(indice, grilla.columns[IndicesColumnas[llaves[i]]]);
////    }
////}