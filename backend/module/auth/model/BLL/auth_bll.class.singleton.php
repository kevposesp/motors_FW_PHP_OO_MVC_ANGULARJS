<?php
class auth_bll
{
	private $dao;
	private $db;
	static $_instance;

	function __construct()
	{
		$this->dao = auth_dao::getInstance();
		$this->db = db::getInstance();
	}

	public static function getInstance()
	{
		if (!(self::$_instance instanceof self)) {
			self::$_instance = new self();
		}
		return self::$_instance;
	}

	public function get_controluser_BLL($token)
	{
		$rdo = $this->dao->select_usr_id($this->db, $token['id_usr']);
		if ($rdo) {
			if (isset($_SESSION['id_usr']) && ($_SESSION['id_usr']) == $rdo->id_user) {
				$res = true;
			} else {
				$res = false;
			}
		} else {
			$res = false;
		}
		return $res;
	}

	public function get_register_BLL($user)
	{
		$res = $this->dao->register_user_auth($this->db, $user);
		if ($res['status']) {
			$email['type'] = "validate";
			$email['email'] = $user['email'];
			$email['token_email'] = $res['token_email'];
			if (!mail::send_email($email)) {
				$res['status'] = false;
				$res['err_email'] = "error_send";
			}
			return $res['status'];
		} else {
			return $res;
		}
	}

	public function get_login_BLL($data)
	{
		$usr = $this->dao->select_user($this->db, $data['usr']);
		if ($usr) {
			if($usr->verify_email != 0) {
				if (password_verify($data['password'], $usr->password_user)) {
					$res['status'] = true;
					$res['data'] = jwt_process::encode($usr->id_user);
					$_SESSION['id_usr'] = $usr->id_user;
				} else {
					$res['status'] = false;
					$res['msg'] = "err_pass";
				}
			} else {
				$res['status'] = false;
				$res['msg'] = "err_verify";
			}
		} else {
			$res['status'] = false;
			$res['msg'] = "err_usr";
		}
		return $res;
	}

	public function get_verify_BLL($token)
	{
		$res = $this->dao->verify_token_auth($this->db, $token);
		if ($res['status']) {
			// $email['type'] = "validate";
			// $email['email'] = $token['email'];
			// $email['token_email'] = $res['token_email'];
			// if(!mail::send_email($email)) {
			// 	$res['status'] = false;
			// 	$res['err_email'] = "error_send";
			// }
			return $res['status'];
			// return $res;
		} else {
			return $res;
		}
	}

	public function get_recover_BLL($usr)
	{
		$res = $this->dao->select_user($this->db, $usr);

		if ($res) {
			$user['username'] = $res->username_user;
			$user['email'] = $res->email_user;
			$rec = $this->dao->recover_pass($this->db, $res->id_user);
			if ($rec['status']) {
				$email['type'] = "recover";
				$email['email'] = $user['email'];
				$email['token'] = $rec['token'];
				if (!mail::send_email($email)) {
					$res['status'] = false;
					$res['err_email'] = "error_send";
					return $res;
				}
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}
	}

	public function get_setNewPassword_BLL($data)
	{

		$user = $this->dao->select_usr_token($this->db, $data['token_verify']);
		$res = [];
		if ($user) {
			$nP = $this->dao->setNewPassword_user($this->db, $user->id_user, $data['pass']);
			if ($nP['status']) {
				$email['type'] = "validate";
				$email['email'] = $user->email_user;
				$email['token_email'] = $nP['token'];
				if (!mail::send_email($email)) {
					$res['status'] = false;
					$res['err_msg'] = "error_send";
				} else {
					return true;
				}
			}
		} else {
			$res['status'] = false;
			$res['err_msg'] = "err_token_ex";
		}

		return $res;
	}

	public function get_infBut_BLL($id)
	{
		$res = $this->dao->infBut($this->db, $id);
		return $res;
	}

	public function get_signin_BLL($data)
	{
		$usr_ex = $this->dao->select_user_id($this->db, $data['uuid']);
		if ($usr_ex) {
			$res['status'] = false;
			$res['msg'] = "err_exist";

			$res['data'] = jwt_process::encode($data['uuid']);
			$_SESSION['id_usr'] = $data['uuid'];
			return $res;
		} else {
			$user['id'] = $data['uuid'];
			$user['img'] = $data['avatar'];
			$user['email'] = $data['email'];
			$user['name'] = $data['user'];
			$reg_usr = $this->dao->register_user_signin($this->db, $user);
			if ($reg_usr) {
				$res['status'] = true;
				$res['data'] = jwt_process::encode($user['id']);
				$_SESSION['id_usr'] = $user['id'];
				return $res;
			} else {
				$res['status'] = false;
				$res['msg'] = "err_reg";
				return $res;
			}
			// return $user;
		}
	}

	public function get_refreshtoken_BLL($id)
	{
		$res = $this->dao->select_user_id($this->db, $id);
		if ($res) {
			return jwt_process::encode($id);
		} else {
			return false;
		}
	}
}
