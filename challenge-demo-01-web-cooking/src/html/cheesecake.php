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
							<a class="nav-link active" aria-current="page" href="cheesecake.php">Cheesecake</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" href="cookies.php">Cookies</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" href="tiramisu.php">Tiramisu</a>
						</li>
					</ul>
				</div>
			</div>
		</nav>

		<div class="container" style="margin-top:15px;">
			<h3>Cheesecake Recipe</h3>
			Here is the recipe to make a Cheesecake:
			<ul>
				<li>Preheat the oven to 180°C air.</li>
				<li>To make the crust: Stir together all of the crust ingredients, mixing until thoroughly combined.</li>
				<li>Press the crumbs into the bottom and up the sides of the pie pan, making a thicker layer on the bottom than on the sides.</li>
				<li>To make the filling: Mix together the room-temperature cream cheese and sugar until smooth. Mix in the eggs and vanilla, again mixing until smooth. To avoid beating too much air into the batter, use a mixer set at low-medium speed. To avoid lumps, make sure the cream cheese is softened, and/or at room temperature.</li>
				<li>Set the pie pan onto a baking sheet, if desired; this makes it easier to transport in and out of the oven, and also protects the bottom of the crust from any potential scorching. Pour the filling into the crust.</li>
				<li>To bake the cheesecake: Place the cheesecake in the oven. Bake it for 20 minutes, then add a crust shield; or shield the crust with strips of aluminum foil. Bake for an additional 10 minutes (for a total of about 30 minutes). A digital thermometer inserted into the filling 1" from the edge should read about 80°C; the filling won't look entirely set in the center.</li>
				<li>Remove the cheesecake from the oven and set it on a rack to cool. Once the cake is cool, refrigerate it, covered, until you're ready to serve it.</li>
				<li>Enjoy!</li>
			</ul>
		</div>

		<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossorigin="anonymous"></script>
	</body>
</html>
