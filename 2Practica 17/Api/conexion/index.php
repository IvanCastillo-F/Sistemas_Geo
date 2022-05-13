<?php
$usuario = "sistemasgeo5452_icastilloadm";
$contrasena = "?w[LlRz[Fj?ZHOC}R0"

try{
    $conn = new PDO('mysql:host=localhost;dbname=sistemasgeo5452_icastillo',$usuario, $contrasena );
    $conn ->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

}catch(PDOException $e){
    echo "Error: ", $e->getMessage();
}

?>