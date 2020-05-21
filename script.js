// ELEMENTOS DEL HTML
const $Cedula = document.querySelector('#Cedula');
const $Nombre = document.querySelector('#Nombre');
const $Nacimiento = document.querySelector('#Nacimiento');
const $Nota1 = document.querySelector('#Nota1');
const $Nota2 = document.querySelector('#Nota2');
const $Nota3 = document.querySelector('#Nota3');

const Boton =  document.querySelector('#Enviar');
const $Table = document.querySelector('table')

function GanadoPerdido(NotaPromedio, ElementoHTML)
{
    if(NotaPromedio >= 3.5)
    {
        ElementoHTML.classList.add('Aprobado')

    }else
    {
        ElementoHTML.classList.add('Perdido')
    }
}

function RenderTable(Vcedula, Vnombre, Edad, Vnacimiento,V1, V2, V3)
{
    let Promedio = (parseFloat(V1) + parseFloat(V2) + parseFloat(V3))/3;
    const Elemento = document.createElement('tr')
    Elemento.innerHTML = `
    <td>${Vcedula}</td>
    <td>${Vnombre}</td>
    <td>${Vnacimiento}</td>
    <td>${Edad}</td>
    <td>${V1}</td>
    <td>${V2}</td>
    <td>${V3}</td>
    <td>${Promedio.toFixed(2)}</td>
    `;
    GanadoPerdido(Promedio, Elemento)
    $Table.append(Elemento)
    Finalizar()
}

function ValidarDatos(Vcedula, Vnombre, Vnacimiento, V1, V2, V3)
{

    const AñoNacimiento = parseInt($Nacimiento.value.substr(0,4))
    const Actual = 2020;
    let Edad = Actual - AñoNacimiento

    //VALIDAR LA CEDULA
    let ValidarCedula;
    if(typeof(parseInt(Vcedula)) == "number" && Vcedula.length > 10 && Vcedula.length < 12)
    {
        ValidarCedula = true;
    
    }else{
        ValidarCedula = false;
    }
    //VALIDAR NOMBRE
    let ValidarNombre;
    if(parseInt(Vnombre))
    {
        ValidarNombre = false;
    
    }else{
        ValidarNombre = true;
    }

    //VALIDAR NOTAS
    let ValidarNotas;
    if(parseFloat(V1) > 0 && parseFloat(V1) < 5.1 && parseFloat(V2) > 0 && parseFloat(V2) < 5.1 && parseFloat(V3) > 0 && parseFloat(V3) < 5.1)
    {
        ValidarNotas = true;
    }else{
        ValidarNotas = false;
    }

    //VALIDAR EN GENERAL
    if(ValidarCedula && ValidarNombre && ValidarCedula && ValidarNotas)
    {
        RenderTable(Vcedula, Vnombre, Edad, Vnacimiento ,V1, V2, V3);
    }else{
        alert("INFORMACIÓN INCORRECTA")
    }
}

const btnValidar = document.querySelector('#Validar')
btnValidar.addEventListener('click', () => {

    //VALIDAR EDAD
    const AñoNacimiento = parseInt($Nacimiento.value.substr(0,4))
    const Actual = 2020;
    let Edad = Actual - AñoNacimiento

    if(Edad >= 18)
    {
        Boton.classList.remove('Oculto')
    
    }else
    {
        alert('NO TIENES LA EDAD SUFICIENTE')
    }

})

Boton.addEventListener('click', () => {
    ValidarDatos($Cedula.value, $Nombre.value, $Nacimiento.value, $Nota1.value, $Nota2.value, $Nota3.value);
})

function Finalizar()
{
    // $Nombre.value = "";
    // $Cedula.value = "";
    // $Nacimiento.value = "";
    // $Nota1.value = "";
    // $Nota2.value = "";
    // $Nota3.value = "";
    Boton.classList.add('Oculto')
}

/* MEJORES */
const BtnMejores = document.querySelector('#Mejores')
const $TablaRanking = document.querySelector('#Best__Tabla')
BtnMejores.addEventListener('click', ()=>{
  
    let Promedios = [];

    for(let i = 1; i < $Table.querySelectorAll('tr').length; i++)
    {
        let Valor = parseFloat($Table.querySelectorAll('tr')[i].querySelectorAll('td')[7].innerText);
        Promedios[i] = Valor;
    }
    $TablaRanking.innerHTML = ""
    
    if($Table.querySelectorAll('tr').length == 1)
    {
        alert("NO HAY DATOS!")
    }else if($Table.querySelectorAll('tr').length == 2)
    {
        alert("Haría falta otro dato para hacer la comparación")

    }else{

        Mayor(Promedios);
    }

})

function Mayor( Vector )
{
    let VMayor = Vector[1]
    
    for(let i = 1 ; i <= Vector.length; i++)
    {
        if(VMayor < Vector[i])
        {
            VMayor = Vector[i]
        }
    }
    
    let VMenor = Vector[1];

    for(let i = 1 ; i <= Vector.length; i++)
    {
        if(VMenor > Vector[i])
        {
            VMenor = Vector[i]
        }
    }

    RenderTable2($Table, VMayor, VMenor)
}

function RenderTable2( tabla, mayor, menor)
{
    let MayorEstudiante;
    let MenorEstudiante;

    for(let i = 1; i < $Table.querySelectorAll('tr').length; i++)
    {
        let Valor = parseFloat($Table.querySelectorAll('tr')[i].querySelectorAll('td')[7].innerText);
        if(Valor === mayor)
        {
            MayorEstudiante = $Table.querySelectorAll('tr')[i].querySelectorAll('td')[1].innerText
        }

        if(Valor === menor)
        {
            MenorEstudiante = $Table.querySelectorAll('tr')[i].querySelectorAll('td')[1].innerText
        }
    }

    const ElementoMayor = document.createElement('tr')
    ElementoMayor.innerHTML = `
    <td>${MayorEstudiante}</td>
    <td>${mayor}</td>
    <td> MEJOR MAGO! </td>
    `;
    ElementoMayor.classList.add('Aprobado')
    $TablaRanking.append(ElementoMayor)
    
    const ElementoMenor = document.createElement('tr')
    ElementoMenor.innerHTML = `
    <td>${MenorEstudiante}</td>
    <td>${menor}</td>
    <td> SIGUE INTENTANDO CHAVAL! </td>
    `;
    ElementoMenor.classList.add('Perdido')
    $TablaRanking.append(ElementoMenor)
}