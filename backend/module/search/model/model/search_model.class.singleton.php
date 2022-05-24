<?php
    class search_model {
        private $bll;
        static $_instance;
        
        function __construct() {
            $this -> bll = search_bll::getInstance();
        }

        public static function getInstance() {
            if (!(self::$_instance instanceof self)) {
                self::$_instance = new self();
            }
            return self::$_instance;
        }
        
        public function get_search_attributes($data) {
            return $this -> bll -> get_search_attributes_BLL($data);
            // return $data;
        }
        
        public function get_search_brands($data) {
            return $this -> bll -> get_search_brands_BLL($data);
            // return $data;
        }
        
        public function get_search_city($data) {
            return $this -> bll -> get_search_city_BLL($data);
            // return $data;
        }

    }
?>