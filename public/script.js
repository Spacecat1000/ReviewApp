function populate() {
	// import data
	fetch("http://api.myjson.com/bins/q45er")
	.then(x=>x.json())
	.then(data=> {
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
		lines = document.querySelectorAll("li");
		yes = document.querySelectorAll("li>div>span:nth-of-type(3)");
		
		//set proper tense on pluralized dog names
		let names3 = (j) => {
			let nameData = data[j].breed;
			if(nameData[(nameData.length-1)] === "y") {
				return nameData.slice(0,nameData.length-1) + "ies";
			} else {
				return nameData + "s";
			}
		}	
		
		// populate profiles
		lines.forEach((x,i) => {
			imgs[i].src = data[i].image_url;
			names[i].innerHTML = data[i].breed;
			weight[i].innerHTML = data[i].size;
			description[i].innerHTML = data[i].description;
			names2[i].innerHTML = `Love ${names3(i)}?`;
			thumb[i].src = "thumbs-up.svg";
		})
		
		// load votes
		fetch("/api/likes/596ae8f969e0bb816dc04773")
		.then(x=>x.json())
		.then(x=>{
			likesO = x;
			likes = x[0].arr;
		})
		.then(()=> {
			
			// create new rating for any new additions to api &
			// fill in any existing votes
			likes.length = lines.length;
			for(i=0;i<likes.length;i++){
				if(likes[i]===undefined || likes[i]===0) {
					likes[i] = 0;
				}else{
					people(i);
				}
			}
			
			//count vote and change display to reflect
			vote.forEach((x,i) => {
				x.addEventListener("click", () => {
					likes[i] += 1;
					people(i);
					names2[i].innerHTML = `Thanks for voting for ${names3(i)}!`;
					x.innerHTML = "";
					// update database
					fetch("/api/likes/596ae8f969e0bb816dc04773", {
						method: 'post',
						body: JSON.stringify({arr: likes}),
						headers: {
						  'Content-Type': 'application/json'
						}	
					})

				})
			})
		})	
	})	
}

populate();

// set tense on people/person
let people = (x) => {
	if(likes[x] === 1) {
		yes[x].innerHTML = `${likes[x]} person said yes!`;
	} else {
		yes[x].innerHTML = `${likes[x]} people said yes!`;			
	}
}

