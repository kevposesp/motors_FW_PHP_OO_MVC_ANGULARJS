<?php
class auth_dao
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

    function select_usr_id($db, $id)
    {
        $sql = "SELECT id_user FROM users WHERE id_user = '$id'";
        // $conn = connect::con();
        // $res = mysqli_query($conn, $sql)->fetch_object();
        $res = $db->listar($db->ejecutar($sql));
        // connect::close($conn);
        return $res;
    }

    function register_user_auth($db, $user)
    {
        $username = $user['username'];
        $email = $user['email'];
        $pass = $user['password'];
        $img = $user['img'];
        $token_email = common::generate_token_secure(20);

        $hashed_pass = password_hash($pass, PASSWORD_DEFAULT, ['cost' => 12]);
        // $hashavatar = md5(strtolower(trim($username)));
        // $avatar = "https://robohash.org/$hashavatar";

        $switch = false;
        $id = null;
        while (!$switch) { // Genera id random
            $id = "motors|" . common::generate_token_secure(12);
            $search = $db->ejecutarFOBJ("SELECT * FROM users WHERE id_user = '$id'");
            if ($search == null) {
                $switch = true;
            } else {
                $switch = false;
            }
        }
        $sql_exist_user = $db->ejecutarFOBJ("SELECT * FROM users WHERE username_user = '$username' and id_user like 'motors|%'");
        $sql_exist_email = $db->ejecutarFOBJ("SELECT * FROM users WHERE email_user = '$email' and id_user like 'motors|%'");

        if ($sql_exist_user == null && $sql_exist_email == null) {
            $sql = "INSERT INTO `users`(`id_user`, `username_user`, `email_user`, `password_user`, `type_user`, `avatar_user`, `verify_email`, `token_verify`)
            VALUES ('$id', '$username','$email','$hashed_pass','client', '$img', false, '$token_email')";
            $res['status'] = $db->ejecutar($sql);
            $res['token_email'] = $token_email;
        } elseif ($sql_exist_user != null && $sql_exist_email != null) {
            $res['status'] = false;
            $res['msg'] = "exs_username";
            $res['msg2'] = "exs_email";
        } elseif ($sql_exist_user != null) {
            $res['status'] = false;
            $res['msg'] = "exs_username";
        } elseif ($sql_exist_email != null) {
            $res['status'] = false;
            $res['msg'] = "exs_email";
        }

        return $res;
    }

    function register_user_signin($db, $user)
    {
        $id = $user['id'];
        $img = $user['img'];
        $email = $user['email'];
        $name = $user['name'];

        $sql = "INSERT INTO `users` (`id_user`, `username_user`, `email_user`, `type_user`, `avatar_user`, `verify_email`)
        VALUES ('$id', '$name', '$email', 'client', '$img', 1)";
        // return $sql;
        $res = $db->ejecutar($sql);

        return $res;
    }

    function select_user($db, $username)
    {
        $sql = "SELECT * FROM users WHERE username_user = '$username' or email_user = '$username'";
        $res = $db->ejecutarFOBJ($sql);
        return $res;
    }

    function select_user_id($db, $id)
    {
        $sql = "SELECT * FROM users WHERE id_user = '$id'";
        $res = $db->ejecutarFOBJ($sql);
        return $res;
    }

    function verify_token_auth($db, $token)
    {
        $sql_verify_email = $db->ejecutarFOBJ("SELECT verify_email FROM users WHERE token_verify = '$token'");
        if ($sql_verify_email == null) {
            $res['status'] = false;
            $res['msg'] = "err_exist";
        } elseif ($sql_verify_email != null && $sql_verify_email->verify_email != 0) {
            $res['status'] = false;
            $res['msg'] = "err_verified";
        } elseif ($sql_verify_email != null && $sql_verify_email->verify_email == 0) {
            $sql_update_vemail = $db->ejecutar("update users set verify_email = '1' where token_verify = '$token'");
            if ($sql_update_vemail) {
                $res['status'] = true;
            } else {
                $res['status'] = false;
                $res['msg'] = "err_updating";
            }
            // $res['status'] = true;
        }
        // return $sql_verify_email;
        return $res;
    }

    function recover_pass($db, $id)
    {
        $token = common::generate_token_secure(20);
        $set_disable_user_new_token = $db->ejecutar("update users set verify_email = '0', token_verify = '$token' where id_user = '$id'");
        if ($set_disable_user_new_token) {
            $res['status'] = true;
        } else {
            $res['status'] = false;
        }

        $res['token'] = $token;
        return $res;
    }

    function setNewPassword_user($db, $id, $pass)
    {
        $token = common::generate_token_secure(20);

        $hashed_pass = password_hash($pass, PASSWORD_DEFAULT, ['cost' => 12]);
        $set_disable_user_new_token = $db->ejecutar("update users set token_verify = '$token', password_user = '$hashed_pass' where id_user = '$id'");
        if ($set_disable_user_new_token) {
            $res['status'] = true;
        } else {
            $res['status'] = false;
        }

        $res['token'] = $token;
        return $res;
    }

    function select_usr_token($db, $token)
    {
        $sql = "SELECT * FROM users WHERE token_verify = '$token'";
        $res = $db->ejecutarFOBJ($sql);
        return $res;
    }

    function infBut($db, $id)
    {
        $sql = "SELECT avatar_user as img_user, username_user as username FROM users WHERE id_user = '$id'";
        $res = $db->ejecutarFOBJ($sql);
        return $res;
    }
}
