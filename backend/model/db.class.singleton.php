<?php
    class db {
        private $server;
        private $user;
        private $password;
        private $database;
        private $link;
        private $stmt;
        private $array;
        private $res;
        static $_instance;

        private function __construct() {
            $this->setConexion();
            $this->conectar();
        }
        
        private function setConexion() {
            require_once 'Conf.class.singleton.php';
            $conf = Conf::getInstance();
            
            $this->server = $conf->getHostDB();
            $this->database = $conf->getDB();
            $this->user = $conf->getUserDB();
            $this->password = $conf->getPassDB();
        }

        private function __clone() {

        }

        public static function getInstance() {
            if (!(self::$_instance instanceof self))
                self::$_instance = new self();
            return self::$_instance;
        }

        private function conectar() {
            $this->link = new mysqli($this->server, $this->user, $this->password);
            $this->link->select_db($this->database);
        }

        public function ejecutar($sql) {
            $this->stmt = $this->link->query($sql);
            return $this->stmt;
        }
        
        public function ejecutarFOBJ($sql) {
            $this->stmt = $this->link->query($sql)->fetch_object();
            return $this->stmt;
        }
        
        public function getNumRows($stmt) {
            $this->res = $stmt->num_rows;
            return $this->res;
        }

        // public function getFOBJ($stmt) {
        //     $this->res = $stmt->fetch_object();
        //     return $this->res;
        // }
        
        public function listar($stmt) {
            $this->array = array();
            while ($row = $stmt->fetch_array(MYSQLI_ASSOC)) {
                array_push($this->array, $row);
            }
            return $this->array;
        }

    }
