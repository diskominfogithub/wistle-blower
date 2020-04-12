<?php

    include 'conn.php';
    
    $lapor = $_POST['lapor'];

    $result='';

    $sql = $conn->query("INSERT INTO `laporan`(`id`, `laporan`) VALUES ('','$lapor')");
    if($sql === TRUE){
        $result = true;
    }else{
        $result = 'Error'.$sql.'<br/>'.$conn->error;
    }
    
    echo json_encode($result);

    $conn->close();
?>