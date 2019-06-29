
var attach_files = [];
var count = 0;
var textFile = null;
function isSupportedFileAPI() {
	return window.File && window.FileReader && window.FileList && window.Blob;
}
makeTextFile = function (text) {
	var data = new Blob([text], {type: 'text/plain'});

	// If we are replacing a previously generated file we need to
	// manually revoke the object URL to avoid memory leaks.
	if (textFile !== null) {
	  window.URL.revokeObjectURL(textFile);
	}

	textFile = window.URL.createObjectURL(data);

	return textFile;
};
var create = document.getElementById('create');

create.addEventListener('click', function () {
	$('#file_table tbody tr').remove();
	
	load_attacheFiles();
	openMSG();
}, false);
function openMSG() {
	var recipient = "robsisneros@yahoo.com";
	var recipient2 = "rsisneros@speakeasy.net";
	var combine = ";"
	var comrecip = recipient + combine + recipient2
	var subject = "Gavilan Totals"
	var msg = "Gavilan report is attached"
	var attach = "c:/Users/KDFWOW/Pictures/Stable.PNG";

	document.location = "mailto:"+comrecip+"?subject="+subject+"&body="+msg+"&attachment="+attach;
}
$(function () {
	if (isSupportedFileAPI()) {
	  	$('.attach_files').change(function(){
		    var selectedFile = this.files[0];
		    // read file...
		    var fileReader = new FileReader();
		    fileReader.onload = function (evt) {
		      	var buffer = evt.target.result;
		      	attach_files[count++]=buffer;
		      	console.log(buffer);
		      	var download_id = "download"+$('#file_table tbody tr').length;
		      	$('#file_table tbody').append('<tr><td><a download="'+ selectedFile.name +'" id="'+download_id+'" >' + selectedFile.name + '</a></td></tr>');
		      	link = document.getElementById(download_id);
		      	link.href = makeTextFile(buffer);
		    };
		    fileReader.readAsArrayBuffer(selectedFile);
	  	});
	} else {
	  alert("Libraries are not loaded");
	}
});



var xhr1 = new XMLHttpRequest();
var xhr2 = new XMLHttpRequest();
function process1()
{
  if (xhr1.readyState == 4) {
  	file_name = xhr1.responseURL.split('/')[xhr1.responseURL.split('/').length - 1];
  	
  	var buffer = xhr1.response;
  	var download_id = "download"+$('#file_table tbody tr').length;
	$('#file_table tbody').append('<tr><td><a target="_blank" href="'+xhr1.responseURL+'">' + xhr1.responseURL + '</a></td></tr>');
  	attach_files[0] = buffer;
  }
}

function process2()
{
  if (xhr2.readyState == 4) {
  	file_name = xhr2.responseURL.split('/')[xhr2.responseURL.split('/').length - 1];
  	
  	var buffer = xhr2.response;
  	var download_id = "download"+$('#file_table tbody tr').length;
	$('#file_table tbody').append('<tr><td><a target="_blank" href="'+xhr2.responseURL+'">' + xhr2.responseURL + '</a></td></tr>');
  	attach_files[1] = buffer;
  }
}
function load_attacheFiles() {
	xhr1.onreadystatechange = process1;
	xhr1.open("GET", $('#attachment1').val(), true);
	xhr1.responseType = 'arraybuffer';
	xhr1.send();

	xhr2.onreadystatechange = process2;
	xhr2.open("GET", $('#attachment2').val(), true);
	xhr2.responseType = 'arraybuffer';
	xhr2.send();
}