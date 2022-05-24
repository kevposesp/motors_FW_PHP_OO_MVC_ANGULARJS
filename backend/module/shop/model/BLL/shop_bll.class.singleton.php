<?php
	class shop_bll {
		private $dao;
		private $db;
		static $_instance;

		function __construct() {
			$this -> dao = shop_dao::getInstance();
			$this->db = db::getInstance();
		}

		public static function getInstance() {
			if (!(self::$_instance instanceof self)) {
				self::$_instance = new self();
			}
			return self::$_instance;
		}

		public function get_cars_with_names_BLL($args) {
			return $this -> dao -> select_data_cars_with_names($this->db, $args);
		}
		
		public function get_car_BLL($id) {
			return $this -> dao -> select_data_car($this->db, $id);
		}
		
		public function get_filters_BLL() {
			return $this -> dao -> select_data_filters($this->db);
		}
		
		public function get_releated_by_mark_BLL($args) {
			return $this -> dao -> select_data_releated_by_mark($this->db, $args);
		}
		
		public function get_setUnsetLike_BLL($args) {
			return $this -> dao -> setUnsetLike($this->db, $args);
		}

	}
?>