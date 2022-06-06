<?php

class mail
{
    public static function send_email($data)
    {
        require_once('PHPMailer/config.php');
        $mail->ClearAllRecipients();
        $mail->AddAddress($data['email']);
        switch ($data['type']) {
            case 'contact';
                $mail->From = ($data['email']);
                $mail->AddAddress('contacto@webforshops.com');
                $mail->Subject = "Mensaje enviado desde el modulo de contact en motors";
                $msg = "<h1>Mensaje de ". $data['name'] . " " . $data['surname'] ."</h1><br>";
                $msg .= "Mensaje: " . $data['message'];
                $mail->Body = $msg;
                break;
            case 'validate';
                $mail->Subject = "Mensaje para validar correo";
                $msg = "<h1>Bienvenido a motors</h1><br>";
                $msg .= "<a href='http://localhost/motors_FW_PHP_OO_MVC_ANGULARJS/#/auth/verify/" . $data['token_email'] . "'>Verificar correo</a>";
                $mail->Body = $msg;
                break;
            case 'recover';
                $mail->Subject = "Mensaje para recuperar la contraseña";
                // $msg = "<h1>Bienvenido a motors</h1><br>";
                $msg = "<a href='http://localhost/motors_FW_PHP_OO_MVC_ANGULARJS/#/auth/recover/" . $data['token'] . "'>Recuperar ahora</a>";
                $mail->Body = $msg;
                break;
        }

        $mail->IsHTML(true);  //podemos activar o desactivar HTML en mensaje

        $mail->Send();

        return true;
    }
}
