<?php
    class controller_home {
        function list_marks() {
            echo json_encode(common::load_model('home_model', 'get_marks'));
        }

        function list_categories() {
            echo json_encode(common::load_model('home_model', 'get_categories', $_POST['limit']));
        }

        function list_type_fuels() {
            echo json_encode(common::load_model('home_model', 'get_type_fuels', $_POST['limit']));
        }

        function list_attributes() {
            echo json_encode(common::load_model('home_model', 'get_attributes'));
        }
    }
?>