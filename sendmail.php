<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $to = "code.crea.sn@gmail.com";
    $subject = "Nouveau message depuis le site Code&Créa";
    $name = $_POST["name"];
    $email = $_POST["email"];
    $message = $_POST["message"];
    
    $headers = "From: $email";

    mail($to, $subject, $message, $headers);
    echo "Message envoyé avec succès !";
}
?>

