var m = {};
// TODO common m.types should be a dict, array annoying
m.types = [ 
  // type#, type code, english name, c type, var args type, formatter, 
	// has repr, (has cast belongs here XXX)
	[0,  "l", "list", "VP", "VP", "%p",true,"0"],
	[1,  "t", "tag", "int", "int", "%d",true,"INT_MAX"],
	[2,  "c", "char", "char", "int","%c", true,"SCHAR_MAX"],
	[3,  "b", "byte","int8_t", "int", "%d", false,"SCHAR_MAX"],
	[4,  "i", "int", "int", "int","%d",false,"INT_MAX"],
	[5,  "j", "long", "__int64_t", "int", "%ld", false,"LONG_MAX"],
	[6,  "o", "octo", "__int128_t", "int", "%llld", false,"LONG_LONG_MAX"], /* TODO custom printf for octowords */
	[7,  "f", "float", "double", "double", "%0.5f", false,"DBL_MAX"], /* TODO custom printf for octowords */
	[8,  "d", "dict", "VP", "VP", "%p",true,"0"],
	[9,  "1", "f1", "unaryFunc*","unaryFunc*","%p",false,"0"],
	[10,  "2", "f2", "binaryFunc*","binaryFunc*","%p",false,"0"],
	[11, "p", "proj", "Proj","Proj","%p",true,"0"],
	[12, "x", "ctx", "VP","VP","%p",true,"0"]
];
m.dontcast = ["l", "d", "1", "2", "p", "x"];
m.each = function each(a,f) {
	var acc=[];for(var i in a) acc.push(f(a[i])); return acc; 
}
m.eachr = function eachr(f,a) {
	return function(b) { 
		var acc=[];
		for(var i in a) {
			acc.push(f(b,a[i]));
		}
		return acc;
	}
}
m.exhaust = function exhaust(f,a) {
	var last='';
	while(1) {
		a=f(a); if(a==last)return last; last=a;
	}
}
m.prelude = '// Autogenerated file; see corresponding .js\n';
m.projl = function projl(f,a) {
	return function(b) { return f(a,b); }
}
m.projr = function projr(f,a) {
	return function(b) { return f(b,a); }
}
m.repl = function repl(str,v) {
	//console.log('repl',str,v);
	for(var j in v)
		str=str.replace('{{'+j+'}}',v[j]); return str;
}
module.exports=m;
