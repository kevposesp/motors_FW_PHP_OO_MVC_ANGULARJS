<?php
    class controller_shop {
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
            if($token) {
                echo json_encode(common::load_model('shop_model', 'get_setUnsetLike', [$token['data_id'], $_POST['id']]));
            } else {
                echo json_encode("no_id");
            }
        }
    }
?>