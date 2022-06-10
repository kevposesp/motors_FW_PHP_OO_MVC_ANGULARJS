<?php
    class controller_auth {
       
        function controluser() {
            $token = MiddlewareAuth::middlewareAuth();
            echo json_encode($token);
        }

        function login() {
            echo json_encode(common::load_model('auth_model', 'get_login', $_POST));
        }

        function register() {
            echo json_encode(common::load_model('auth_model', 'get_register', $_POST));
        }

        function verify() {
            echo json_encode(common::load_model('auth_model', 'get_verify', $_POST['token']));
        }

        function infBut() {
            $token = MiddlewareAuth::middlewareAuth();
            if($token) {
                echo json_encode(common::load_model('auth_model', 'get_infBut', $token['data_id']));
            } else {
                echo json_encode(false);
            }
        }
        
        function logout() {
            session_unset();
            echo json_encode(true);
        }

        function recover() {
            echo json_encode(common::load_model('auth_model', 'get_recover', $_POST['usr']));
        }

        function setNewPass() {
            echo json_encode(common::load_model('auth_model', 'get_setNewPass', $_POST));
        }

        function signin() {
            echo json_encode(common::load_model('auth_model', 'get_signin', $_POST));
        }

        function actividad() {
            echo json_encode(common::load_model('auth_model', 'get_actividad'));
        }
        
        function refreshsesion() {
            session_regenerate_id();
            $_SESSION['time'] = time();
            echo json_encode(true);
        }
        
        function refreshtoken() {
            $token = MiddlewareAuth::middlewareAuth();
            if($token) {
                echo json_encode(common::load_model('auth_model', 'get_refreshtoken', $token['data_id']));
            } else {
                echo json_encode(false);
            }
        }

    }
