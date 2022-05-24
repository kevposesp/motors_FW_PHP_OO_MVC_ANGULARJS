<?php
    class controller_home {
        function view() {
            // common::load_view('top_page_home.php', VIEW_PATH_HOME . 'home.html');
            common::load_view('top_page_home.php', VIEW_PATH_HOME . 'index.php');
        }

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

        // function carousel() {
        //     echo json_encode(common::load_model('home_model', 'get_carousel'));
        // }

        // function categoria() {
        //     echo json_encode(common::load_model('home_model', 'get_categoria'));
        // }

        // function brands() {
        //     echo json_encode(common::load_model('home_model', 'get_brands', [$_POST['items'], $_POST['loaded']]));
        // }

        // function load_more() {
        //     echo json_encode(common::load_model('home_model', 'get_load_more'));
        // }

    }
?>