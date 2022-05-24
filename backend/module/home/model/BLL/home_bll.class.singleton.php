<?php
	class home_bll {
		private $dao;
		private $db;
		static $_instance;

		function __construct() {
			$this -> dao = home_dao::getInstance();
			$this->db = db::getInstance();
		}

		public static function getInstance() {
			if (!(self::$_instance instanceof self)) {
				self::$_instance = new self();
			}
			return self::$_instance;
		}

		public function get_marks_BLL() {
			return $this -> dao -> select_data_marks($this->db);
		}

		public function get_categories_BLL($limit) {
			return $this -> dao -> select_data_categories($this->db, $limit);
		}

		public function get_type_fuels_BLL($limit) {
			return $this -> dao -> select_data_type_fuels($this->db, $limit);
		}
		
		public function get_attributes_BLL() {
			return $this -> dao -> select_data_attributes($this->db);
		}

		// public function get_carousel_BLL() {
		// 	return $this -> dao -> select_data_carousel($this->db);
		// }

		// public function get_categoria_BLL() {
		// 	return $this -> dao -> select_data_categoria($this->db);
		// }

		// public function get_brands_BLL($args) {
		// 	return $this -> dao -> select_data_brands($this->db, $args[0], $args[1]);
		// }

		// public function get_load_more_BLL() {
		// 	return $this -> dao -> select_load_more($this->db);
		// }

	}
?>