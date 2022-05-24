<?php
    class controller_contact {
        function view() {
            common::load_view('top_page_contact.php', VIEW_PATH_CONTACT . 'contact.html');
        }

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