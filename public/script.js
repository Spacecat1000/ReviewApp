
fetch("https://api.myjson.com/bins/q45er")
.then(x=>x.json())
.then(x=>data = x)
.then(()=> {
	let list = document.querySelector("ul");
	list.innerHTML += Array(parseInt(data.length+1)).join("<li><img><div><h2></h2><h3></h3><p></p><br>Love <span></span>?<span><img>Yes!</span><br><span>15</span> people said yes!</div></li>");
	let imgs = document.querySelectorAll("li>img");
	names = document.querySelectorAll("h2");
	let weight = document.querySelectorAll("h3");
	let description = document.querySelectorAll("p");
	let lines = document.querySelectorAll("li");
	names2 = document.querySelectorAll("li>div>span:nth-of-type(1)");
	lines.forEach((x,y) => {
		imgs[y].src = data[y].image_url;
		nameData = data[y].breed;
		names[y].innerHTML = nameData;
		weight[y].innerHTML = data[y].size;
		description[y].innerHTML = data[y].description;
		if(nameData[(nameData.length-1)] === "y") {
			names2[y].innerHTML = nameData.slice(0,nameData.length-1) + "ies";
		} else {
			names2[y].innerHTML =  nameData + "s";
		}

	})
})









