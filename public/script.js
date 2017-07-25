// import data
fetch("http://api.myjson.com/bins/q45er")
.then(x=>x.json())
.then(data=> {
	// load votes
	fetch("/api/likes/596ae8f969e0bb816dc04773")
	.then(x=>x.json())
	.then(x=>{
		likesO = x;
		likes = x[0].arr;
	})
	.then(()=> {
		
		// set # of reviews based on data & establish variables
		let list = document.querySelector("ul");
		list.innerHTML += Array(data.length+1).join("<li><img><div><h2></h2><h3></h3><p></p><br><span></span><span><img>Yes!</span><br><span></span></div></li>");
		let imgs = document.querySelectorAll("li>img");
		let names = document.querySelectorAll("h2");
		let weight = document.querySelectorAll("h3");
		let description = document.querySelectorAll("p");
		let names2 = document.querySelectorAll("li>div>span:nth-of-type(1)");
		let vote = document.querySelectorAll("li>div>span:nth-of-type(2)");
		let thumb = document.querySelectorAll("li>div>span:nth-of-type(2)>img");
		let lines = document.querySelectorAll("li");
		yes = document.querySelectorAll("li>div>span:nth-of-type(3)");
		
		//set proper tense on pluralized dog names
		let names3 = (j) => {
			let nameData = data[j].breed;
			return nameData[(nameData.length-1)] === "y" ? 
			nameData.slice(0,nameData.length-1) + "ies" :
			nameData + "s";
		}	
				
		// Check for existence of/ set up local storage
		if(localStorage['voted']) {
			voted = JSON.parse(localStorage['voted'])
		} else { 
			localStorage.setItem("voted", JSON.stringify([]))
			voted = JSON.parse(localStorage['voted']);
		}
	
		// create new rating for any new additions to api &
		// fill in any existing votes		
		voted.length = data.length
		likes.length = lines.length;
		for(i=0;i<voted.length;i++){
			if(voted[i]===undefined || voted[i]===false) {
				voted[i] = false;
			}
			// Format local storage variable
			likes[i]===undefined || likes[i]===0 ? likes[i] = 0 : people(i);
		}
	
		// populate profiles
		lines.forEach((x,i) => {
			imgs[i].src = data[i].image_url;
			names[i].innerHTML = data[i].breed;
			weight[i].innerHTML = data[i].size;
			description[i].innerHTML = data[i].description;
			names2[i].innerHTML = `Love ${names3(i)}?`;
			thumb[i].src = "thumbs-up.svg";
			
			// Use local storage to check if user has already voted.
			if(voted[i]===false) {
				names2[i].innerHTML = `Love ${names3(i)}?`;
			} else {
				names2[i].innerHTML = `Thanks for voting for ${names3(i)}!`;
				vote[i].innerHTML = "";
			}
			
			//count vote and change display to reflect
			vote[i].addEventListener("click", () => {
				likes[i] += 1;
				people(i);
				names2[i].innerHTML = `Thanks for voting for ${names3(i)}!`;
				vote[i].innerHTML = "";
				
				// update database
				fetch("/api/likes/596ae8f969e0bb816dc04773", {
					method: 'post',
					body: JSON.stringify({arr: likes}),
					headers: {
					  'Content-Type': 'application/json'
					}	
				})

				// update local storage		
				voted[i] = true;
				localStorage.setItem("voted", JSON.stringify(voted));
			})
		})
	})	
})	

// set tense on people/person
let people = (x) => {
	likes[x] === 1 ? yes[x].innerHTML = `${likes[x]} person said yes!` :
	yes[x].innerHTML = `${likes[x]} people said yes!`;			
}


