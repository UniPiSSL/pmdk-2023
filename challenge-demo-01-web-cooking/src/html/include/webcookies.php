<?php

// Check if user is admin
$is_admin = false;
if (isset($_COOKIE['is-admin'])) {
	if (strtolower($_COOKIE['is-admin']) == 'true') {
		$is_admin = true;
	}
}
else {
	setcookie('is-admin', 'false', time() + (86400 * 30 * 5), "/");
}
