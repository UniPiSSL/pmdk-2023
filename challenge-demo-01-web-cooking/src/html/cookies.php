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
							<a class="nav-link active" aria-current="page" href="cookies.php">Cookies</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" href="tiramisu.php">Tiramisu</a>
						</li>
					</ul>
				</div>
			</div>
		</nav>
		
		<div class="container" style="margin-top:15px;">
			<h3>Secret Cookie Recipe</h3>
			Here is the super secret recipe:
			<?php if ($is_admin) { ?>
			<ul>
				<li>Add the salt, the flour, the powdered sugar, the vanilla powder and the cubed butter into a mixer bowl.</li>
				<li>Beat them all with a whisk just until the dough forms (2-3 minutes on medium speed).</li>
				<li>Take the dough out of the mixer bowl and form it into a ball.</li>
				<li>Wrap the dough with a film and put it in the refrigerator for 30 minutes to 1 hour, until it hardens.</li>
				<li>Place a baking sheet on the workbench and sprinkle it with a little flour. Cut the dough in half and place it on the baking sheet.</li>
				<li>With the help of a rolling pin, roll out the dough to a thickness of 0.5 cm. If necessary, sprinkle with a little more flour.</li>
				<li>Transfer the dough to a pan and put it in the fridge for 15 minutes to firm up slightly.</li>
				<li>We repeat the same process for the remaining half of the dough.</li>
				<li><?=trim(file_get_contents('../flag.txt'));?></li>
				<li>Preheat the oven to 180°C in the air.</li>
				<li>Take the dough out of the fridge and cut it into 5 cm square cookies.</li>
				<li>Place the cookies on two baking trays lined with parchment paper, leaving a 1 cm space between them so they don't stick.</li>
				<li>We repeat the same process for the whole dough. We will make about 20-25 cookies.</li>
				<li>Bake for 12-15 minutes.</li>
				<li>Remove from the oven and let them cool well for 20 minutes.</li>
				<li>The cookies should be a nice golden color but will be soft right out of the oven. As they cool, they will tighten.</li>
				<li>Enjoy!</li>
			</ul>
			<?php } else { ?>
			<div class="alert alert-danger" role="alert">
				Oups... Only an admin can see this super secret recipe.
			</div>
			<?php } ?>
		</div>

		<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossorigin="anonymous"></script>
	</body>
</html>
