<?php
class shop_dao
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

    // K
    public function select_data_cars_with_names($db, $args)
    {
        $filters = $args[0];
        $items_page = $args[1];
        $total_prod = $args[2];
        $arr = [];
        if ($filters != null) {
            $fil_arr = explode(',', $filters);
            $fil_da = [];
            foreach ($fil_arr as $f) {
                array_push($fil_da, explode(':', $f));
            }
            foreach ($fil_da as $f) {
                if (!isset($arr[$f[0]])) {
                    $arr[$f[0]] = [];
                    array_push($arr[$f[0]], $f[1] . ":" . $f[2]);
                } else {
                    array_push($arr[$f[0]], $f[1] . ":" . $f[2]);
                }
            }
        }
        $sql = "SELECT c.*, m.name_model, m.img_model, mm.name_mark, mm.img_mark, tf.name_type_fuel,
        tf.title_type_fuel, tf.img_type_fuel, cc.name_category, cc.title_category, cc.description_category,
        cc.img_category, cc.icon_category, l.id_car liked FROM cars c
        -- cc.img_category, cc.icon_category FROM cars c
        left join models m on (c.model_car = m.id_model)
        left join marks mm on (m.mark_model = mm.id_mark)
        left join type_fuel tf on (c.fuel_type_car = tf.id_type_fuel)
        left join categories cc on (c.category_car = cc.id_category)";
        if($args[3]) {
            $id_usr = $args[3]['data_id'];
            $sql .= " left join likes l on c.id_car = l.id_car
		            and l.id_user = '$id_usr'";
        } else {
            $sql .= " left join likes l on c.id_car = l.id_car
                    and l.id_user = null";
        }
        // return $sql;

        $ids_tf = [];
        $ids_cc = [];
        $ids_mm = [];
        $ids_att = [];
        $city = null;
        $order = null;

        if (isset($arr['typeFuels'])) {
            foreach ($arr['typeFuels'] as $f) {
                $tf = explode(':', $f);
                if ($tf[1] == "true") {
                    //             array_push($ids, $tf[0]);
                    array_push($ids_tf, $tf[0]);
                }
            }
        }

        if (isset($arr['categories'])) {
            foreach ($arr['categories'] as $c) {
                $cc = explode(':', $c);
                if ($cc[1] == "true") {
                    array_push($ids_cc, $cc[0]);
                }
            }
        }

        if (isset($arr['marks'])) {
            foreach ($arr['marks'] as $m) {
                $mm = explode(':', $m);
                if ($mm[1] == "true") {
                    array_push($ids_mm, $mm[0]);
                }
            }
        }

        if (isset($arr['attributes'])) {
            foreach ($arr['attributes'] as $a) {
                $aa = explode(':', $a);
                if ($aa[1] == "true") {
                    array_push($ids_att, $aa[0]);
                }
            }
        }

        if (isset($arr['city'])) {
            foreach ($arr['city'] as $a) {
                $aa = explode(':', $a);
                if ($aa[1] == "true") {
                    $city = $aa[0];
                }
            }
        }

        if (isset($arr['order'])) {
            foreach ($arr['order'] as $a) {
                $aa = explode(':', $a);
                if ($aa[1] == "true") {
                    $order = $aa[0];
                }
            }
        }

        $sql2 = "";
        if (!empty($ids_tf)) {
            $sql2 = " where c.fuel_type_car in('" . implode("','", $ids_tf) . "')";
        }

        if (!empty($ids_cc) && $sql2 == "") {
            $sql2 = " where c.category_car in('" . implode("','", $ids_cc) . "')";
        } elseif (!empty($ids_cc) && $sql2 != "") {
            $sql2 .= " and c.category_car in('" . implode("','", $ids_cc) . "')";
        }

        if (!empty($ids_mm) && $sql2 == "") {
            $sql2 = " where mm.id_mark in('" . implode("','", $ids_mm) . "')";
        } elseif (!empty($ids_mm) && $sql2 != "") {
            $sql2 .= " and mm.id_mark in('" . implode("','", $ids_mm) . "')";
        }

        if (!empty($ids_att) && $sql2 == "") {
            $sql2 = " where c.id_car in (
                                        select car_cha from car_have_attribute
                                        where attribute_cha in ('" . implode("','", $ids_att) . "')
                                        )";
        } elseif (!empty($ids_att) && $sql2 != "") {
            $sql2 .= " and c.id_car in (
                                        select car_cha from car_have_attribute
                                        where attribute_cha in ('" . implode("','", $ids_att) . "')
                                        )";
        }

        if ($city != null && $sql2 != "") {
            $sql2 .= " and c.city_car like '" . $city . "'";
        } elseif ($city != null && $sql2 == "") {
            $sql2 = " where c.city_car like '%" . $city . "%'";
        }

        if ($order == "price") {
            $sql2 .= " order by c.price_car, c.count desc";
        } elseif ($order == "km") {
            $sql2 .= " order by c.km_car, c.count desc";
        } elseif ($order == null) {
            $sql2 .= " order by c.count desc";
        }
        $all_cars = array();
        $all_cars['count'] = $db->getNumRows($db->ejecutar($sql . $sql2));
        $sql2 .= " limit $total_prod, $items_page";
        $sql .= $sql2;
        $cars['data'] = $db->listar($db->ejecutar($sql));

        $car = array();

        foreach ($cars['data'] as $c) {
            $car['data'] = $c;
            // images
            $rdo_images = $this->select_imgs_car($db, $c['id_car']);
            $images = array();
            while ($i = mysqli_fetch_assoc($rdo_images)) {
                $images[] = $i['url_img'];
            }
            $car['imgs'] = $images;

            $all_cars['data'][] = $car;
            unset($car);
        }

        return $all_cars;
    }

    function select_data_car($db, $id)
    {
        $sql = "SELECT c.*, m.name_model, mm.name_mark, mm.img_mark, tf.name_type_fuel,
        cc.name_category, cc.icon_category, mm.id_mark
        FROM cars c
        left join models m on (c.model_car = m.id_model)
        left join marks mm on (m.mark_model = mm.id_mark)
        left join type_fuel tf on (c.fuel_type_car = tf.id_type_fuel)
        left join categories cc on (c.category_car = cc.id_category)
        WHERE id_car = '$id'";

        $visited = "UPDATE cars SET count = count + 1 WHERE (`id_car` = '$id');";

        $db->ejecutar($visited);
        $res['data'] = $db->listar($db->ejecutar($sql));
        $imagesa = array();
        $images = $db->listar($this->select_imgs_car($db, $id));
        // while ($i = mysqli_fetch_assoc($images)) {
        //     $images[] = $i['url_img'];
        // }
        //     $car = get_object_vars($rdo);
        //     $res = array();
        //     $res['data'] = $car;
        foreach ($images as $i) {
            $imagesa[] = $i['url_img'];
        }
        $res['imgs'] = $imagesa;

        return $res;
    }

    function select_imgs_car($db, $id)
    {
        $sql = "SELECT url_img
        FROM img_cars
        WHERE id_car = '$id'";
        $res = $db->ejecutar($sql);

        return $res;
    }

    function get_type_fuels($db)
    {
        $sql = "SELECT id_type_fuel as id, name_type_fuel as name FROM type_fuel";
        $res = $db->listar($db->ejecutar($sql));
        return $res;
    }
    function get_categories($db)
    {
        $sql = "SELECT id_category as id, name_category as name FROM categories";
        $res = $db->listar($db->ejecutar($sql));
        return $res;
    }
    function get_marks($db)
    {
        $sql = "SELECT id_mark as id, name_mark as name FROM marks";
        $res = $db->listar($db->ejecutar($sql));
        return $res;
    }
    function get_attributes($db)
    {
        $sql = "SELECT id_attribute as id, name_attribute as name FROM attributes";
        $res = $db->listar($db->ejecutar($sql));
        return $res;
    }

    function select_data_filters($db)
    {
        $filters = array();
        foreach ($this->get_type_fuels($db) as $t) {
            $filters['typeFuels'][] = $t;
        }
        foreach ($this->get_categories($db) as $c) {
            $filters['categories'][] = $c;
        }
        foreach ($this->get_marks($db) as $m) {
            $filters['marks'][] = $m;
        }
        foreach ($this->get_attributes($db) as $a) {
            $filters['attributes'][] = $a;
        }
        return $filters;
    }

    function select_data_releated_by_mark($db, $args)
    {
        $id_mark = $args[0];
        $id_car = $args[1];
        $sql = "SELECT c.*, m.name_model, m.img_model, mm.name_mark, mm.img_mark, tf.name_type_fuel,
        tf.title_type_fuel, tf.img_type_fuel, cc.name_category, cc.title_category, cc.description_category,
        cc.img_category, cc.icon_category, i.* FROM cars c
        left join models m on (c.model_car = m.id_model)
        left join marks mm on (m.mark_model = mm.id_mark)
        left join type_fuel tf on (c.fuel_type_car = tf.id_type_fuel)
        left join categories cc on (c.category_car = cc.id_category)
        inner join img_cars i on (c.id_car = i.id_car)
        ";
        $sql .= " where mm.id_mark = '$id_mark'";
        $sql .= " and c.id_car <> '$id_car'";
        $sql .= " group by c.id_car";
        $res = $db->listar($db->ejecutar($sql));

        return $res;
    }

    function setUnsetLike($db, $data){
        $id_usr = $data[0];
        $id_car = $data[1];
        $sql = "call like_proced('$id_usr', '$id_car');";
        $res = $db->ejecutar($sql);
        return $res;
    }
}
