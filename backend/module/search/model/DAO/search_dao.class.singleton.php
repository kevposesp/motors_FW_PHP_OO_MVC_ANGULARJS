<?php
class search_dao
{
    static $_instance;

    private function __construct()
    {
    }

    public static function getInstance()
    {
        if (!(self::$_instance instanceof self)) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }
    
    function select_data_search_attributes($db, $data) {
        $sql = "select a.* from cars c
        inner join car_have_attribute cha on c.id_car = cha.car_cha
        inner join attributes a on  cha.attribute_cha = a.id_attribute
        inner join models m on c.model_car = m.id_model";
        if($data['brand'] != "") {
            $sql .= " where m.mark_model = '".$data['brand']."'";
        }
        if ($data['city'] != "" && $data['brand'] != "") {
            $sql .= " and c.city_car = '".$data['city']."'";
        } elseif($data['city'] != "" && $data['brand'] == "") {
            $sql .= " where c.city_car = '".$data['city']."'";
        }
        $sql .= " group by a.id_attribute";

        $res = $db->listar($db->ejecutar($sql));

        // $rows = array();
        // while($r = mysqli_fetch_assoc($attributes)) {
        //     $rows[] = $r;
        // }
        // foreach ($attributes as $a) {
        //     $res[] = $a;
        // }

        // $res = $db->listar($db->ejecutar($sql));
        return $res;
    }
    
    function getSearchBrands($db, $data){
        $sql = "select mm.* from cars c
        inner join models m on c.model_car = m.id_model
        inner join marks mm on m.mark_model = mm.id_mark
        inner join car_have_attribute cha on cha.car_cha = c.id_car";

        if($data['attribute'] != "") {
            $sql .= " where cha.attribute_cha = '".$data['attribute']."'";
        }

        if ($data['city'] != "" && $data['attribute'] != "") {
            $sql .= " and c.city_car = '".$data['city']."'";
        } elseif($data['city'] != "" && $data['attribute'] == "") {
            $sql .= " where c.city_car = '".$data['city']."'";
        }
        $sql .= " group by mm.id_mark";

        $res = $db->listar($db->ejecutar($sql));
    
        return $res;
    }

    function getSearchCity($db, $data){
        $sql = "select c.city_car from cars c
        inner join models m on c.model_car = m.id_model
        inner join marks mm on m.mark_model = mm.id_mark
        inner join car_have_attribute cha on cha.car_cha = c.id_car";

        if($data['attribute'] != "") {
            $sql .= " where cha.attribute_cha = '".$data['attribute']."'";
        }

        if ($data['brand'] != "" && $data['attribute'] != "") {
            $sql .= " and mm.id_mark = '".$data['brand']."'";
        } elseif($data['brand'] != "" && $data['attribute'] == "") {
            $sql .= " where mm.id_mark = '".$data['brand']."'";
        }

        if(($data['brand'] != "" && $data['city'] != "") || ($data['attribute'] != "" && $data['city'] != "")) {
            $sql .= " and c.city_car like '%".$data['city']."%'";
        } else if($data['brand'] == "" && $data['attribute'] == "" && $data['city'] != "") {
            $sql .= " where c.city_car like '%".$data['city']."%'";
        }

        $sql .= " group by c.city_car";

        $res = $db->listar($db->ejecutar($sql));

        return $res;
    }
    
}
