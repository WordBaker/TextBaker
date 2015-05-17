//变量初始化
var wl = document.querySelector('#preword.paginate.left');
var wr = document.querySelector('#nxtword.paginate.right');
var pr = document.querySelector('#prepage');
var pl = document.querySelector('#nxtpage');
wl.onclick = slide.bind(this, -1);
wr.onclick = slide.bind(this, 1);
Pages = Array();
var index = -1, total = $(".reveal").length;
var pindex = 0, ptotal = Pages.length;
pr.onclick = slidep.bind(this, -1);
pl.onclick = slidep.bind(this, 1);
$.getJSON('sendtext.php', function(data) {
	Pages = data;
	$('#dynamicarea')[0].innerHTML = data[0];
	total = $(".reveal").length;
	ptotal = Pages.length;
	reset();
	slidep(0);
	setclicks();
	// slide(0);
});

// ////////////////////////////basic paging logic to demo the buttons

function slide(offset) {
	if (index == total - 1 && offset == 1) {
		index = 0;
		$('#nxtpage').click();
	}
	if ((index == -1) && (offset == -1)) {

		$('#prepage').click();
	}

	index = Math.min(Math.max(index + offset, -1), total - 1);

	document.querySelector('#wordsta').innerHTML = (index + 1) + ' / ' + total;
	// if (index==-1&&pindex==0){wl.setAttribute('data-state', 'disabled');}
	wl.setAttribute('data-state', index === -1 && pindex === 0 ? 'disabled'
			: '');
	wr.setAttribute('data-state',
			index === total - 1 && pindex === ptotal - 1 ? 'disabled' : '');
	if (slide != 0) {
		gunping();
	}
	// if (index==total-1){$("#nxtpage").click();}
}

// /////////////////////////////
// ////////////////////////////basic paging logic to demo the buttons

function slidep(offset) {
	pindex = Math.min(Math.max(pindex + offset, 0), ptotal - 1);

	document.querySelector('#pagination').innerHTML = "Page" + (pindex + 1)
			+ ' / ' + ptotal;

	pr.setAttribute('data-state', pindex === 0 ? 'disabled' : '');
	pl.setAttribute('data-state', pindex === total - 1 ? 'disabled' : '');
}

// /////////////////////////////

$("#nxtword").click(function() {
	$($(".reveal")[index]).fadeTo(200, 1);

});

$("#preword").click(function() {
	$($(".reveal")[index + 1]).fadeTo(200, 0)
});
$("#nxtpage").click(function() {
	$("#dynamicarea").fadeTo(200, 0, function() {
		document.querySelector('#dynamicarea').innerHTML = '';
		document.querySelector('#dynamicarea').innerHTML = Pages[pindex];
		$("#dynamicarea").fadeTo(200, 1);
		reset();
	});

});
$("#prepage").click(function() {
	$("#dynamicarea").fadeTo(200, 0, function() {
		document.querySelector('#dynamicarea').innerHTML = '';
		document.querySelector('#dynamicarea').innerHTML = Pages[pindex];
		$("#dynamicarea").fadeTo(200, 1);
		reset();
	});

});
$("#showall").click(function() {
	slide(total - index);
	$(".reveal").each(function() {
		$(this).fadeTo(300, 1);
	})
});
$("#resetall").click(function() {
	reset();
});
function setclicks() {
	$('.reveal').click(function() {
		length = $(this).prevAll('.reveal').length;
		$(this).parents('p').prevAll('p').each(function() {
			length += $(this).children('.reveal').length
		});
		for (i = 0; i < length + 1; i++) {
			$($(".reveal")[i]).fadeTo(200, 1)
		}
		for (i = length + 1; i < total; i++) {
			$($(".reveal")[i]).fadeTo(200, 0)
		}
		index = length;
		slide(0);
	});
}
function reset() {
	index = -1;
	total = $(".reveal").length;
	document.querySelector('#wordsta').innerHTML = (index + 1) + ' / ' + total;
	$(".reveal").each(function() {
		$(this).fadeTo(0, 0);
	})
	setclicks();
	$("html,body").animate(
			{
				scrollTop : ($($(".reveal")[0]).offset().top) - 1 / 4
						* $(window).height()
			}, 450);
}
function gunping() {
	$("html,body").clearQueue();
	$("html,body").animate(
			{
				scrollTop : ($($(".reveal")[index]).offset().top) - 1 / 4
						* $(window).height()
			}, 450);

}
// //////////////////////////////
$('#open').click(function() {
	$("body").load("index.php", {
		'Teaser' : $('#teaser')[0].value,
		'title' : $('#title')[0].value,
		'passage' : $('#passage')[0].value
	})
});
