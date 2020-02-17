let axions = require('axios');
let cheerio = require('cheerio');
let fs = require('fs');

axions.get('https://news.detik.com/indeks')
	.then((response) => {
		if(response.status === 200){
			const html = response.data;
				const $ = cheerio.load(html);
				let detiklist = [];
				$('#indeks-container article').each(function(i, elem){
					detiklist[i]={
						judul: $(this).find('h3').text().trim(),
						url : $(this).find('a').attr('href'),
						published: $(this).find('.media__date').text().trim()
					}
				});
				const detiklistTrim = detiklist.filter(n => n != undefined)
				fs.writeFile('data/scraplist.json',
					JSON.stringify(detiklistTrim, null, 4), (err)=>{
						console.log('succes menulis scrapping')
					});
		}
	}), (error) => console.log(err);