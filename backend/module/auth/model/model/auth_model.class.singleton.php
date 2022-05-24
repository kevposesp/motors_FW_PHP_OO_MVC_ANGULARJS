<?php
    class auth_model {
        private $bll;
        static $_instance;
        
        function __construct() {
            $this -> bll = auth_bll::getInstance();
        }

        public static function getInstance() {
            if (!(self::$_instance instanceof self)) {
                self::$_instance = new self();
            }
            return self::$_instance;
        }

        public function get_controluser($token) {
            return $this -> bll -> get_controluser_BLL($token);
        }

        public function get_register($user) {
            return $this -> bll -> get_register_BLL($user);
        }
        
        public function get_login($data) {
            return $this -> bll -> get_login_BLL($data);
        }
        
        public function get_verify($token) {
            return $this -> bll -> get_verify_BLL($token);
        }
        
        public function get_infBut($id) {
            return $this -> bll -> get_infBut_BLL($id);
        }

        public function get_recover($usr) {
            return $this -> bll -> get_recover_BLL($usr);
        }

        public function get_setNewPass($data) {
            return $this -> bll -> get_setNewPassword_BLL($data);
        }

        public function get_signin($data) {
            return $this -> bll -> get_signin_BLL($data);
        }
        
        public function get_actividad() {
            $act = false;
            if (!isset($_SESSION['time'])) {
                $act = false;
            } else {
                if ((time() - $_SESSION['time']) >= 1800) {
                    $act = false;
                } else {
                    $act = true;
                    // $act = time() - $_SESSION['time'];
                }
            }
            return $act;
        }

        public function get_refreshtoken($id) {
            return $this -> bll -> get_refreshtoken_BLL($id);
        }
    }
?>