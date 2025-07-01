<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name"];
    $email = $_POST["email"];
    $comment = $_POST["comment"];

    $to = "info@caninek.com";
    $subject = "Contact form submission";
    $message = "Name: " . $name . "\r\n" . "Email: " . $email . "\r\n" . "Comment: " . $comment;
    $headers = "From: " . $email . "\r\n" . "Reply-To: " . $email;

    mail($to, $subject, $message, $headers);

    header("Location: contact.html?sent=1");
}
?>
