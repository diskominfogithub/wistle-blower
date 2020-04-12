<?php
    include 'conn.php';
    $sql = $conn->query('select count(id) as jumlah from laporan');
    while($data=$sql->fetch_assoc()){
        echo json_encode($data);
    }

    mysqli_close($conn);
?>