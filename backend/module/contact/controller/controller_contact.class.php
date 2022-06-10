<?php
    class controller_contact {
        function send() {
            $res = true;
            $email['type'] = 'contact';
            $email['email'] = $_POST['email'];
            $email['message'] = $_POST['message'];
            $email['name'] = $_POST['name'];
            $email['surname'] = $_POST['surname'];
            if(!mail::send_email($email)) {
                $res = false;
            }
            echo json_encode($res);
        }
    }
?>