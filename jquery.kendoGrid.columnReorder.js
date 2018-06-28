(function ($) {

    $.fn.gridColumnReorder = function ()
    {

        var grilla = this.getKendoGrid();

        function ObtenerIndiceColumnasNom()
        {
            var indiceColumnas = [];
            grilla.columns.forEach(function (elemento, indice)
            {
                if (elemento.field == undefined)
                    indiceColumnas[elemento.title] = indice;
                else
                    indiceColumnas[elemento.field] = indice;
            });
            return indiceColumnas;
        }

        function ObtenerIndiceColumnasPos()
        {
            var indiceColumnas = [];
            grilla.columns.forEach(function (elemento, indice)
            {
                if (elemento.field == undefined)
                    indiceColumnas[indice] = elemento.title;
                else
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
            var cookieAux;
            var indice;
            var nombre;
            var cookieAux;
            var columnas;
            for (var i = 0; i < cookies.length; i++)
            {
                cookieAux = cookies[i];
                indice = cookieAux.indexOf('=');
                nombre = cookieAux.substr(0, indice);
                cookieAux = cookieAux.substr(indice + 1);
                if (nombre.indexOf(path + nombreGrilla) > -1)
                {
                    columnas = cookieAux.split(",");
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
            var IndicesColumnas;
            var indice;
            var columna;
            for (var i = 0; i < llaves.length; i++)
            {
                IndicesColumnas = ObtenerIndiceColumnasNom();
                indice = OrdenFinalColumnas[llaves[i]]
                columna = grilla.columns[IndicesColumnas[llaves[i]]];
                grilla.reorderColumn(indice, columna);
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
            var aux;
            if (e.column.field != undefined)
                aux = e.column.field;
            else
                aux = e.column.title;
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
            document.cookie = path + nombreGrilla + "=" + ordenColumnas;
        }

        grilla.bind("columnReorder", onColumnReorder);
        ActualizaPosicionColumnas();

        return this;

    };

}(jQuery));
