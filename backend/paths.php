<?php
$cnfg = parse_ini_file("config/path.ini");

define('PROJECT', $cnfg['path']);

//SITE_ROOT
define('SITE_ROOT', $_SERVER['DOCUMENT_ROOT'] . PROJECT);

//SITE_PATH
define('SITE_PATH', 'http://' . $_SERVER['HTTP_HOST'] . PROJECT);

//PRODUCTION
define('PRODUCTION', true);

//MODEL
define('MODEL_PATH', SITE_ROOT . 'model/');

//MODULES
define('MODULES_PATH', SITE_ROOT . 'module/');

//RESOURCES
define('RESOURCES', SITE_ROOT . 'resources/');

//UTILS
define('UTILS', SITE_ROOT . 'utils/');

// Config Files
define('CONF_PATH', SITE_ROOT . 'config/');

//MODEL_HOME
define('UTILS_HOME', SITE_ROOT . 'module/home/utils/');
define('DAO_HOME', SITE_ROOT . 'module/home/model/DAO/');
define('BLL_HOME', SITE_ROOT . 'module/home/model/BLL/');
define('MODEL_HOME', SITE_ROOT . 'module/home/model/model/');

//MODEL_SHOP
define('UTILS_SHOP', SITE_ROOT . 'module/shop/utils/');
define('DAO_SHOP', SITE_ROOT . 'module/shop/model/DAO/');
define('BLL_SHOP', SITE_ROOT . 'module/shop/model/BLL/');
define('MODEL_SHOP', SITE_ROOT . 'module/shop/model/model/');

//MODEL_SEARCH
define('UTILS_SEARCH', SITE_ROOT . 'module/search/utils/');
define('DAO_SEARCH', SITE_ROOT . 'module/search/model/DAO/');
define('BLL_SEARCH', SITE_ROOT . 'module/search/model/BLL/');
define('MODEL_SEARCH', SITE_ROOT . 'module/search/model/model/');


//MODEL_AUTH
define('UTILS_AUTH', SITE_ROOT . 'module/auth/utils/');
define('DAO_AUTH', SITE_ROOT . 'module/auth/model/DAO/');
define('BLL_AUTH', SITE_ROOT . 'module/auth/model/BLL/');
define('MODEL_AUTH', SITE_ROOT . 'module/auth/model/model/');

// Friendly
define('URL_FRIENDLY', TRUE);
