function lecturaDatos() {
    const url = "https://gist.githubusercontent.com/josejbocanegra/b1873c6b7e732144355bb1627b6895ed/raw/d91df4c8093c23c41dce6292d5c1ffce0f01a68b/newDatalog.json";

    fetch(url).then(res =>res.json()).then(res=>{
        let eventos = []
        let m = []
        let x = evento(res)
        matriz(res, eventos, m)
        correlacion(eventos,m, x)
    })

    function matriz(contenido, eventos, m) {
        contenido.forEach(dato => {
            dato.events.forEach(evento => {
                if(!containsObject(evento, eventos)){
                    let fn, fp , tp, tn = 0
                    contenido.forEach(fila => {
                        if(containsObject(evento, fila.events) && fila.squirrel){
                            tp++
                        }
                        else if(containsObject(evento, fila.events)&& !fila.squirrel){
                            fn++
                        }
                        else if(!containsObject(evento, fila.events)&& fila.squirrel){
                            fp++
                        }
                        else{
                            tn++
                        }
                    })
                    let valor = ((tp*tn)-(fp*fn))/Math.sqrt((tp+fp)*(tp+fn)*(tn+fp)*(tn+fn));
                    eventos.push(evento)
                    m.push(valor)
                }
            })
        })
    }


    function evento (res) {
        const tabla = document.getElementById("eventos");

        res.forEach(fila => {
            let nodo = document.createTextNode(x)
            let tr = document.createElement("tr");
            let th = document.createElement("th").appendChild(nodo);
            nodo = document.createTextNode(fila.events)
            let td1 = document.createElement("td").appendChild(nodo);
            nodo = document.createTextNode(fila.squirrel)
            let td2 = document.createElement("td").appendChild(nodo);
            tr.appendChild(th)
            tr.appendChild(td1)
            tr.appendChild(td2)
            if(fila.squirrel === true) {
                tr.classList.add("table-danger")
            }
            tabla.appendChild(tr)
            x++;
        });
        return x;
    }

    function containsObject(obj, list) {
        var i;
        for (i = 0; i < list.length; i++) {
            if (list[i] === obj) {
                return true;
            }
        }
        return false;
    }

    function correlacion(eventos, m, x){
        
        let evento1 = eventos
        let m1 = m

        const tabla = document.getElementById("correlacion");
        y = 1;
        evento1.forEach(dato => {
            let nodo = document.createTextNode(x)
            let tr = document.createElement("tr");
            let th = document.createElement("th").appendChild(nodo);
            nodo = document.createTextNode(dato)
            let td1 = document.createElement("td").appendChild(nodo);
            nodo = document.createTextNode(m1[x-1])
            let td2 = document.createElement("td").appendChild(nodo);
            tr.appendChild(th)
            tr.appendChild(td1)
            tr.appendChild(td2)
            tabla.appendChild(tr)
            y++;
        });



}


}
