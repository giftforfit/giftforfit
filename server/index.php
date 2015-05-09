<!DOCTYPE html>
<html>
<head>
	<title>Gift For Fit</title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<link rel="stylesheet" href="style.css" />
</head>
<body>
	<table>
		<tr>
			<td style='width: 30%;'><img class = 'newappIcon' src='images/newapp-icon.png'>
			</td>
			<td>
            <?php
            FITBIT_KEY = 9bd6df46e34a3e23a24d656a6f3c66ad
            FITBIT_SECRET = 8a359ac7e25425e749fd789b9a2eee82

            require 'fitbitphp.php';

            $fitbit = new FitBitPHP(FITBIT_KEY, FITBIT_SECRET);

            $fitbit->initSession('http://gift4fit.mybluemix.net/callback.php');
            $xml = $fitbit->getProfile();

            print_r($xml);

            if($fitbit->sessionStatus() == 2)
            {
              print("Authorized user");
            }
            ?>
			</td>
		</tr>
	</table>
</body>
</html>
