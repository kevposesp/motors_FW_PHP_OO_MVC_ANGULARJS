<?php
// include($path . "view/vendor/jwt/JWT.php");
class MiddlewareAuth {
    public static function middlewareAuth() {
        $headers = apache_request_headers();
        // echo json_encode($headers['token']);

        // return $headers;
        if($headers['token'] != "false") {
            // return true;
            $token = jwt_process::decode($headers['token']);
            // $token = jwt_process::decode('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.I8yDlnYcB2P3qPrfJxE5Ky2zNJpPj8T1LdhVfuz5SeA');
            // $token = json_decode($token, true);
            return $token;
            // return $headers;
        } else {
            return false;
        }
        // return $headers;
    }
}
