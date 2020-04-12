<?php
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: *");
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
    // header('Access-Control-Allow-Headers', 'Content-Type');
    
    $conn = new mysqli('localhost','root','','lapor');
    if($conn->connect_error){
        die('koneksi gagal');
    }
?>