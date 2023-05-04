<?php

include('include/webcookies.php');

?>
<!doctype html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<title>Cooking Recipes</title>
		<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
	</head>
	<body>
		<nav class="navbar navbar-expand-lg bg-light" style="border-bottom: 1px solid rgba(0, 0, 0, 0.175);">
			<div class="container">
				<a class="navbar-brand" href="/">Cooking Recipes</a>
				<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
				<span class="navbar-toggler-icon"></span>
				</button>
				<div class="collapse navbar-collapse" id="navbarNav">
					<ul class="navbar-nav">
						<li class="nav-item">
							<a class="nav-link" href="cheesecake.php">Cheesecake</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" href="cookies.php">Cookies</a>
						</li>
						<li class="nav-item">
							<a class="nav-link active" aria-current="page" href="tiramisu.php">Tiramisu</a>
						</li>
					</ul>
				</div>
			</div>
		</nav>

		<div class="container" style="margin-top:15px;">
			<h3>Tiramisu Recipe</h3>
			Here is the recipe to make a Tiramisu:
			<ul>
				<li>Mix creamy filling. Beat the mascarpone, cream, sugar, and vanilla together until stiff peaks.</li>
				<li>Dip lady fingers. Add the espresso and liqueur (if using) to a shallow bowl and dip the lady fingers on both sides (don’t let them soak–just a quick dip!)</li>
				<li>Layer mascarpone. Smooth a layer of the mascarpone/whipped cream mixture on top of the lady fingers.</li>
				<li>Repeat. Add another layer of lady fingers (dipped in coffee and liqueur) and another layer of cheese mixture. Dust with cocoa powder.</li>
			</ul>
		</div>
		
		<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossorigin="anonymous"></script>
	</body>
</html>
