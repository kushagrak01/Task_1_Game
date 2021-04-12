		var current_action = 0;
		var current_shape = "none";
		var strokeColor = "null";

		var canvas_ele = document.getElementById("Canvas");
		canvas_ele.width  = window.innerWidth/2;
		canvas_ele.height = window.innerHeight/1.5;
		var currentEleWidth = 0;
		var currentEleHeight = 0;
		var distanceTOMove = 20
		var points = 0;

		var canvas_ctx = canvas_ele.getContext("2d");
		 var coins_pos = [[18,18,1], [18,463,1], [750,463,1],[750,18,1]];



		function show_inputbox(action_type)
		{ 
			document.getElementById("task").style.display="block";
			document.getElementById("submit").style.display="block";
			current_action = action_type;
        }

        function hide_inputbox()
		{ 
			document.getElementById("task").style.display="none";
			document.getElementById("submit").style.display="none";
        }

        function get_task()
        {
        	switch(current_action)
        	{
        		case 1: 
        			handle_shape();
        			break;

        		case 2:
        			handle_color();
        			break;

        		default: window.alert("No command defined")
        	}
        }

		function handle_shape()
		{
			hide_inputbox();
			var tsk = document.getElementById("task").value;

			if (tsk.localeCompare("circle") == 0)
			{
				x = 366;
        		y = 225;
        		currentEleHeight = 34
        		currentEleWidth = 34
				strokeColor = "black";
				
				current_shape = "circle";
				draw();
			}
			else if (tsk.localeCompare("rectangle") == 0)
			{
				x=366;
				y=225;
				currentEleWidth = 50
				currentEleHeight = 30
				strokeColor = "black";
				current_shape = "rectangle";
				draw();
			}
			else
			{
				window.alert("Invalid input!");
			}
        }

        function handle_color()
		{
			hide_inputbox();
			var tsk2 = document.getElementById("task").value;
			if (current_shape == "circle")
			{
				if (tsk2.localeCompare("red") == 0)
				{
					strokeColor = "red";
					circle_create();
				}
				else if (tsk2.localeCompare("blue") == 0)
				{
					strokeColor = "blue";
					circle_create();
				}
				else if (tsk2.localeCompare("green") == 0)
				{
					strokeColor = "green";
					circle_create();
				}
				else
				{
					window.alert("Invalid input!");
				}
			}

			else if (current_shape == "rectangle")
			{
				if (tsk2.localeCompare("red") == 0)
				{
					strokeColor = "red";
					rectangle_create();
				}
				else if (tsk2.localeCompare("blue") == 0)
				{
					strokeColor = "blue";
					rectangle_create();
				}
				else if (tsk2.localeCompare("green") == 0)
				{
					strokeColor = "green";
					rectangle_create();
				}
				else
				{
					window.alert("Invalid input!");
				}
			}
			else
			{
				window.alert("Create a shape first!");
			}
        }

        function circle_create()
		{
			var circl = canvas_ele.getContext("2d");
			circl.beginPath();
			circl.strokeStyle = strokeColor;
			circl.arc(x,y,currentEleWidth/2,0,2*Math.PI);
			circl.stroke();
			circl.closePath();
        }
        
        var x=346;
		var y=222;

        function rectangle_create()
		{
			var rect = canvas_ele.getContext("2d");
			rect.beginPath();
			rect.lineWidth = "1";
			rect.strokeStyle = strokeColor;
			rect.rect(x - currentEleWidth / 2, y - currentEleHeight / 2, currentEleWidth, currentEleHeight);
			rect.stroke();
			rect.closePath();
        }

        function draw()
        {
        	if(points == coins_pos.length)
        		return;

        	canvas_ctx.clearRect(0,0,canvas_ele.width, canvas_ele.height);
        	if(current_shape == "rectangle")
        	{
        		rectangle_create();
        	}
        	else if(current_shape == "circle")
        	{
        		circle_create();
        	}
        	coins_display();
        	addText();
        }


		var ctx2 = canvas_ele.getContext("2d");
        function move_right()
        {
        	if (current_shape == "none")
        	{
        		window.alert("Create a shape first!")
        	}
        	else
        	{
        		let diff = distanceTOMove;
        		if(x + 20 + currentEleWidth / 2 > canvas_ele.width)
        		{
        			diff = canvas_ele.width - (x + currentEleWidth / 2);
        		}
        		x+=diff;
        		draw();
        		detect_collison();
        	}
        }

        function move_left()
        {
        	if (current_shape == "none")
        	{
        		window.alert("Create a shape first!")
        	}
        	else
        	{
        		let diff = distanceTOMove;
        		if(x - diff - currentEleWidth / 2 < 0)
        		{
        			diff =  (x - currentEleWidth / 2);
	        	}
    	    	x-=diff;
    	    	draw();
    	    	detect_collison();
        	}
        }

        function move_up()
        {
        	if (current_shape == "none")
        	{
        		window.alert("Create a shape first!")
        	}
        	else
        	{
        		let diff = distanceTOMove
        		if(y - diff - currentEleHeight / 2 < 0)
        		{
        			diff =  (y - currentEleHeight / 2);
        		}
        		y-=diff;
        		draw();
        		detect_collison();
        	}
        }

        function move_down()
        {
        	if (current_shape == "none")
        	{
        		window.alert("Create a shape first!")
        	}
        	else
        	{
        		let diff = distanceTOMove
        		if(y + 20 + currentEleHeight / 2 > canvas_ele.height)
        		{
        			diff = canvas_ele.height - (y + currentEleHeight / 2);
        		}
        		y+=diff;
        		draw();
        		detect_collison();
        	}
        }

        function detect_collison()
        {
        	for(let i =0; i< coins_pos.length;i++)
        	{
        		if(coins_pos[i][2] && x > coins_pos[i][0] - 17 && x < coins_pos[i][0] + 17 && y > coins_pos[i][1] - 17 && y < coins_pos[i][1] + 17)
        		{
        			coins_pos[i][2] = 0;
        			draw();
        			points++;
        			if(points == coins_pos.length)
        			{
        				canvas_ctx.clearRect(0,0,canvas_ele.width, canvas_ele.height)
        				addText2()
        			}
        		}
        	}
        }

       
        function coins_display()
        {
        	canvas_ctx.strokeStyle = "yellow";
        	canvas_ctx.fillStyle = "yellow";


        	for(let i =0; i< coins_pos.length; i++)
        	{
        		if(coins_pos[i][2])
        		{
        			canvas_ctx.beginPath();
        			canvas_ctx.arc(coins_pos[i][0], coins_pos[i][1],17,0,2*Math.PI);
        			canvas_ctx.fill();
        			canvas_ctx.closePath();
				}
			}
        }

        function addText()
        {
        	canvas_ctx.fillStyle = "red"
        	canvas_ctx.font = "30px Arial";
			canvas_ctx.fillText("Score : " + points, canvas_ele.width/2 - 30, 30);
        }

         function addText2()
         {
        	canvas_ctx.fillStyle = "red"
        	canvas_ctx.font = "30px Arial";
			canvas_ctx.fillText("YOU WON!!!", canvas_ele.width/2 - 30, canvas_ele.height / 2 - 30);
        }

        draw();