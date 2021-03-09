function upper() {
  var text = document.getElementById('text').value;
  document.getElementById('result').value = text.toUpperCase();
}

function lower() {
  var text = document.getElementById('text').value;
  document.getElementById('result').value = text.toLowerCase();
}

function first() {
  var text = document.getElementById('text').value;
  var par = text.split(/\n/);
  var html = ''
  for (i = 0; i < par.length; i++) {
    var strs = par[i].split(' ');
    for (j = 0; j < strs.length; j++) {
      if (strs[j].length == 1) {
        html += strs[j].toUpperCase() + ' ';
      } else {
        html += strs[j].substr(0,1).toUpperCase() + strs[j].substr(-(strs[j].length - 1)) + ' ';
      }
    }
    if (par.length > 1) {
      html += '\n';
    }
  }
  document.getElementById('result').value = html;
}

function imode() {
  var text = document.getElementById('text').value;
  text = text.toLowerCase();
  var par = text.split(/\n/);
  console.log(par);
  var html = '';
  for (i = 0; i < par.length; i++) {
    par[i] = par[i].substr(0,1).toUpperCase() + par[i].substr(-(par[i].length - 1));
    var strs = par[i].split(' ');
    for (j = 0; j < strs.length; j++) {
      if (strs[j].search(/(\w[.]$)/) != -1) {
        if (j < strs.length-1) {
          strs[j+1] = strs[j+1].substr(0,1).toUpperCase() + strs[j+1].substr(-(strs[j+1].length - 1));
        }
      }
      if (strs[j].search(/(\w[,]\w)/) != -1) {
        var mth = strs[j].match(/(\w[,]\w)/);
        for (m = 0; m < mth.length; m++) {
          strs[j] = strs[j].replace(/(\w[,]\w)/g, mth[m][0] + ', ' + mth[m][2]);
        }
      }
      if (strs[j].search(/([#][#])\w+/) != -1) {
        strs[j] = strs[j].substr(2, strs[j].length-1).toUpperCase();
      }
      if (strs[j].search(/([#])\w+/) != -1) {
        strs[j] = strs[j].substr(0,2).toUpperCase()[1] + strs[j].substr(-(strs[j].length - 2));
      }
      if (strs[j] == ',') {
        strs.splice(j,1)
        strs[j-1] = strs[j-1] + ','
      }
    }
    html += strs.join(' ');
    if (par.length > 1) {
      console.log('after if:'+html);
      html += '\n';
      console.log('after n:'+html);
    }
  }
  document.getElementById('result').value = html;
}

function clearContents(element) {
  if (element.value == 'Write the text here...') {
    element.value = '';
  }
}

function copy() {
  var copyText = document.getElementById("result");
  copyText.select();
  document.execCommand("copy");
  toast("Copied!")
}

function toast(text) {
  visible(true, "toast");
  document.getElementById("toast").innerHTML = text;
  setTimeout(function(){visible(false, "toast")}, 2000);
}

function visible(on, id) {
  if (on == true) {
    document.getElementById(id).style.display = 'block';
  } else {
    document.getElementById(id).style.display = 'none';
  }
}

function val() {
  var mode = 'null';
  var e = document.getElementById("mode");
  mode = e.options[e.selectedIndex].value;
  if (mode == 'm1') {
    visible(true, "copy");
    lower();
  } else if (mode == 'm2') {
    visible(true, "copy");
    upper();
  } else if (mode == 'm3') {
    visible(true, "copy");
    first();
  } else if (mode == 'm4') {
    visible(true, "copy");
    imode();
  } else {
    visible(false, "copy");
    document.getElementById('result').value = '';
  }
}
