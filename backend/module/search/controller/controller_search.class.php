<?php
    class controller_search {
        function getSearchAttributes() {
            echo json_encode(common::load_model('search_model', 'get_search_attributes', $_POST));
            // echo json_encode($_POST);
        }
        function getSearchBrands() {
            echo json_encode(common::load_model('search_model', 'get_search_brands', $_POST));
        }
        function getSearchCity() {
            echo json_encode(common::load_model('search_model', 'get_search_city', $_POST));
        }
    }
?>