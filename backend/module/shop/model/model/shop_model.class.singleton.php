<?php
    class shop_model {
        private $bll;
        static $_instance;
        
        function __construct() {
            $this -> bll = shop_bll::getInstance();
        }

        public static function getInstance() {
            if (!(self::$_instance instanceof self)) {
                self::$_instance = new self();
            }
            return self::$_instance;
        }

        public function get_cars_with_names($args) {
            return $this -> bll -> get_cars_with_names_BLL($args);
            // return $args;
        }
        
        public function get_car($id) {
            return $this -> bll -> get_car_BLL($id);
        }
        
        public function get_filters() {
            return $this -> bll -> get_filters_BLL();
        }
        
        public function get_releated_by_mark($args) {
            return $this -> bll -> get_releated_by_mark_BLL($args);
        }
        
        public function get_setUnsetLike($args) {
            return $this -> bll -> get_setUnsetLike_BLL($args);
        }

    }
?>