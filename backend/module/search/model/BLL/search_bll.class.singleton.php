<?php
	class search_bll {
		private $dao;
		private $db;
		static $_instance;

		function __construct() {
			$this -> dao = search_dao::getInstance();
			$this->db = db::getInstance();
		}

		public static function getInstance() {
			if (!(self::$_instance instanceof self)) {
				self::$_instance = new self();
			}
			return self::$_instance;
		}
		
		public function get_search_attributes_BLL($data) {
			return $this -> dao -> select_data_search_attributes($this->db, $data);
		}
		
		public function get_search_brands_BLL($data) {
			return $this -> dao -> getSearchBrands($this->db, $data);
		}
		
		public function get_search_city_BLL($data) {
			return $this -> dao -> getSearchCity($this->db, $data);
		}

	}
?>