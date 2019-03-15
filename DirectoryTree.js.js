var fs = require("fs");
var fileSource;
fileSource = fs.readFileSync("c:\\test\\inputcommand.txt", "utf8");

var commandList = fileSource.split("\n");
var DirectoryTree = {};

/* Main function starts here */
for (var i = 0; i < commandList.length; i++) {
  console.log(commandList[i]);
  if (commandList[i].includes("CREATE ")) {
    var dir = commandList[i].substring(7).trim();
    createsubdir(DirectoryTree, dir);
  }
  if (commandList[i].includes("LIST")) {
    list(DirectoryTree, 0);
  }
  if (commandList[i].includes("DELETE")) {
    var dir = commandList[i].substring(7).trim();
    deletedir(DirectoryTree, dir);
  }
  if (commandList[i].includes("MOVE")) {
    var dir = commandList[i].substring(7).trim();
    var dirlist = dir.split(" ");
    movedir(DirectoryTree, dirlist[0], dirlist[1]);
  }
}

function createsubdir(currentbranch, dir) {
  var n = dir.indexOf("/");
  if (n < 0) {
    currentbranch[dir] = {};
  } else {
    var newDir = dir.substring(n + 1);
    var newbranch = dir.substring(0, n);
    var newcurrentbranch = currentbranch[newbranch];
    createsubdir(newcurrentbranch, newDir);
  }
}

function list(object, i) {
  for (var key in object) {
    var string = "";
    for (var j = 0; j < i; j++) string += " ";
    console.log(string + key);
    i += 4;
    list(object[key], i);
  }
}

function deletedir(currentbranch, dir) {
  if (!currentbranch) {
    console.log(dir + " does not exist!");
    return;
  }

  var n = dir.indexOf("/");
  if (n < 0) {
    if (!currentbranch[dir]) {
      console.log(dir + " does not exist!");
      return;
    }
    delete currentbranch.dir;
  } else {
    var newDir = dir.substring(n + 1);
    var newbranch = dir.substring(0, n);
    var newcurrentbranch = currentbranch[newbranch];
    if (!newcurrentbranch) {
      console.log(dir + " does not exist!");
      return;
    }
    deletedir(newcurrentbranch, newDir);
  }
}

function movedir(currentbranch, dir1, dir2) {
  if (!currentbranch[dir2]) {
    console.log(dir2 + " does not exist!");
    return;
  }

  var n = dir1.indexOf("/");
  if (n < 0) {
    if (!currentbranch[dir1]) {
      console.log(dir + " does not exist!");
      return;
    }
    currentbranch[dir2][dir1] = currentbranch[dir1];
    delete currentbranch.dir1;
  } else {
    var newDir = dir1.substring(n + 1);
    var newbranch = dir1.substring(0, n);
    var newcurrentbranch = currentbranch[newbranch];
    if (!newcurrentbranch) {
      console.log(dir + " does not exist!");
      return;
    }
    newcurrentbranch[dir2] = newcurrentbranch[newDir];
    delete newcurrentbranch[newDir];
  }
}
