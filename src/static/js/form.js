function assingP1(p1) {
	const P1 = document.getElementById("p1Input");

	const player = p1.split('-')

	P1.value = player[0].trim();
	$('#findP1').hide();
	
}

function assingP2(p2) {
	const P2 = document.getElementById("p2Input");

	const player = p2.split('-')

	P2.value = player[0].trim();
	$('#findP2').hide();
}

var searchRequest = null;

$(function () {
    var minlength = 3;
	var tag = document.createElement('P');

	$("#p1Input").click(function () {
		const P1 = document.getElementById("p1Input");
		P1.value="";
		$('#stdButton').show();
		$('#findP1').hide();
		$('#findP2').hide();
		$('#errorAlert').hide();
		$('#successAlert').hide();
		$('#loadingIcon').hide();
		$('#p1Stats').hide();
		$('#p2Stats').hide();
		$('#searchIcon').hide();
	});

	$("#p2Input").click(function () {
		const P2 = document.getElementById("p2Input");
		P2.value="";
		$('#stdButton').show();
		$('#findP1').hide();
		$('#findP2').hide();
		$('#errorAlert').hide();
		$('#successAlert').hide();
		$('#loadingIcon').hide();
		$('#p1Stats').hide();
		$('#p2Stats').hide();
		$('#searchIcon').hide();
	});

    $("#p1Input").keyup(function () {
        var that = this,
        value = $(this).val();
		$('#searchIcon').show();
        if (value.length >= minlength ) {
            if (searchRequest != null) 
                searchRequest.abort();
            searchRequest = $.ajax({
                type: "POST",
                url: "/searchP1",
                data: {
                    p1 : $('#p1Input').val()
                },

                success: function(msg){
                    //we need to check if the value is the same
                    if (value==$(that).val()) {
                    //Receiving the result of search here
					const myNode = document.getElementById("findP1");
  					myNode.textContent = '';
					$('#searchIcon').hide();
					nicks = [];
					
					nicks = msg.result["Name"];
					
					nicks2 = nicks.slice(0, 60);
					nicks2.sort();
					
					
					nicks2.forEach(item => 
						{
							const flagP1 = document.getElementById("flagP1");
							flagP1.classList.add("leaderboard-flag-icon");
							flagP1.classList.add("flag-icon");
							flagP1.classList.add("flag-icon-br");
							flagP1.style.display="true";
							console.log(flagP1.outerHTML)

							const newDiv = document.createElement("div");
							const newLink = document.createElement("a");
							newLink.setAttribute('class', 'alert');
							newLink.setAttribute('href', 'javascript:assingP1("' + item + '")');

	
							// and give it some content
							const newContent = document.createTextNode(item);
	
							// add the text node to the newly created div
							newLink.appendChild(newContent);
							newDiv.appendChild(newLink);
	
							// add the newly created element and its content into the DOM
							const currentDiv = document.getElementById("findP1");
							currentDiv.appendChild(newDiv);
	
						}
					)										
					
					$('#findP1').show();
					$('#findP2').hide();
                    }
                }
            });
        }
    });

	$("#p2Input").keyup(function () {
        var that = this,
        value = $(this).val();
		$('#searchIcon').show();
        if (value.length >= minlength ) {
            if (searchRequest != null) 
                searchRequest.abort();
            searchRequest = $.ajax({
                type: "POST",
                url: "/searchP2",
                data: {
                    p2 : $('#p2Input').val()
                },

                success: function(msg){
                    //we need to check if the value is the same
                    if (value==$(that).val()) {
                    //Receiving the result of search here
					const myNode = document.getElementById("findP2");
  					myNode.textContent = '';
					$('#searchIcon').hide();
					nicks = [];
					
					nicks = msg.result["Name"];
					
					nicks2 = nicks.slice(0, 60);
					nicks2.sort();
					
					
					nicks2.forEach(item => 
						{
							const newDiv = document.createElement("div");
							const newLink = document.createElement("a");
							newLink.setAttribute('class', 'alert');
							newLink.setAttribute('href', 'javascript:assingP2("' + item + '")');

	
							// and give it some content
							const newContent = document.createTextNode(item);
	
							// add the text node to the newly created div
							newLink.appendChild(newContent);
							newDiv.appendChild(newLink);
	
							// add the newly created element and its content into the DOM
							const currentDiv = document.getElementById("findP2");
							currentDiv.appendChild(newDiv);
	
						}
					)
										
					
					$('#findP2').show();
					$('#findP1').hide();
                    }
                }
            });
        }
    });
});

$(document).ready(function() {

	$('form').on('submit', function(event) {
		$('#loadingIcon').show();
		$('#stdButton').hide();
		$('#findP1').hide();
		$('#findP2').hide();
		$.ajax({
			
			data : {
				p1 : $('#p1Input').val(),
				p2 : $('#p2Input').val()
			},
			type : 'POST',
			url : '/process'
			
		})
		.done(function(data) {

			if (data.error) {
				$('#errorAlert').text(data.error).show();
				$('#successAlert').hide();
				$('#loadingIcon').hide();
				$('#stdButton').show();
			}
			else {
				
				$('#successAlert').text(data.result["Matches"] + " matches found!").show();
				$('#p1Stats').text(data.result["Player1"] + " " + data.result["Wins1"] + " wins.").show();
				$('#p2Stats').text(data.result["Player2"] + " " + data.result["Wins2"] + " wins.").show();
				$('#errorAlert').hide();
				$('#loadingIcon').hide();
				$('#stdButton').show();
			}

		});

		event.preventDefault();

	});

});