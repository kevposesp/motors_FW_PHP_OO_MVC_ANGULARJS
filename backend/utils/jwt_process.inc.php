<?php
class jwt_process
{
    public static function encode($data)
    {
        $jwt = parse_ini_file(UTILS . "jwt.ini");
        $header = $jwt['header'];
        $secret = $jwt['secret'];
        $payload = json_encode(['iat' => time(), 'exp' => time() + (60 * 60), 'data_id' => $data]);
        $JWT = new jwt();
        return $JWT->encode($header, $payload, $secret);
    }

    public static function decode($token)
    {
        $jwt_var = parse_ini_file(UTILS . "jwt.ini");
        $JWT = new jwt();
        $token = $JWT->decode($token, $jwt_var['secret']);
        $token = json_decode($token, true);
        return $token;
    }
}
