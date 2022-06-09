<?php
    class controller_shop {
        function view() {
            // common::load_view('top_page_home.php', VIEW_PATH_HOME . 'home.html');
            common::load_view('top_page_shop.php', VIEW_PATH_SHOP . 'index.html');
        }

        function list_cars_with_names() {
            if(isset($_POST['filters']) && $_POST['filters'] != null) {
                $filters = $_POST['filters'];
            } else {
                $filters = null;
            }
            $token = MiddlewareAuth::middlewareAuth();
            echo json_encode(common::load_model('shop_model', 'get_cars_with_names', [$filters, $_POST['items_page'], $_POST['total_prod'], $token]));
        }
        
        function read_car() {
            echo json_encode(common::load_model('shop_model', 'get_car', $_POST['id']));
        }
        
        function getFilters() {
            echo json_encode(common::load_model('shop_model', 'get_filters'));
        }
        
        function read_releated_by_mark() {
            echo json_encode(common::load_model('shop_model', 'get_releated_by_mark', $_POST['id_car']));
        }
        
        function setUnsetLike() {
            $token = MiddlewareAuth::middlewareAuth();
            // echo json_encode([$token['data_id'], $_POST['id']]);
            if($token) {
                echo json_encode(common::load_model('shop_model', 'get_setUnsetLike', [$token['data_id'], $_POST['id']]));
            } else {
                echo json_encode("no_id");
            }
        }
    }
?>