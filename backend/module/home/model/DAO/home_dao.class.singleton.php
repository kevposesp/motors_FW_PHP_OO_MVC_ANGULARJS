<?php
    class home_dao {
        static $_instance;

        private function __construct() {
        }

        public static function getInstance() {
            if(!(self::$_instance instanceof self)){
                self::$_instance = new self();
            }
            return self::$_instance;
        }

        // K
        public function select_data_marks($db){
            $sql = "SELECT * FROM marks";
            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        public function select_data_categories($db, $limit){
            if($limit) {
                $sql = "SELECT * FROM categories LIMIT $limit";
            } else {
                $sql = "SELECT * FROM categories";
            }
            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        public function select_data_type_fuels($db, $limit){
            if($limit) {
                $sql = "SELECT * FROM type_fuel LIMIT $limit";
            } else {
                $sql = "SELECT * FROM type_fuel";
            }
            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }
        
        public function select_data_attributes($db){
            $sql = "SELECT * FROM attributes";
            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        // public function select_data_carousel($db) {
        //     $sql = "SELECT * FROM `images`";
        //     $stmt = $db->ejecutar($sql);
        //     return $db->listar($stmt);
        // }

        // public function select_data_categoria($db) {
        //     $sql = "SELECT * FROM `categoria`";
        //     $stmt = $db->ejecutar($sql);
        //     return $db->listar($stmt);
        // }

        // public function select_data_brands($db, $items, $loaded) {
        //     $sql = "SELECT * FROM `brands` LIMIT $loaded, $items";
        //     $stmt = $db->ejecutar($sql);
        //     return $db->listar($stmt);
        // }

        // public function select_load_more($db) {
        //     $sql = "SELECT COUNT(*) as 'count' FROM `brands`";
        //     $stmt = $db->ejecutar($sql);
        //     return $db->listar($stmt);
        // }
    }
?>